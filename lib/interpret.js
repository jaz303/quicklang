var T = require('./things');

module.exports = function(ast) {

	var ctx, env;

	function evalBlock(stmts) {
	    var lastVal = null;
	    stmts.forEach(function(stmt) {
	    	if (stmt.type === 'assign') {
	            lastVal = evalExpression(stmt.value);
	            T.defineOrSet(env, stmt.target, lastVal);
	        } else {
	            lastVal = evalExpression(stmt);
	        }
	    });
	    return lastVal;
	}

	function evalExpression(exp) {
	    if (typeof exp === 'string'
	        || typeof exp === 'number'
	        || typeof exp === 'boolean'
	        || exp.type === 'block') {
	        return exp;
	    } else if (exp.type === 'ident') {
	        return T.lookupSlotValue(env, exp.name);
	    } else if (exp.type === 'send') {
	        return send(
	            evalExpression(exp.receiver),
	            exp.selector,
	            exp.args.map(evalExpression)
	        );
	    } else {
	        throw new Error("unhandled expression: " + exp.type);
	    }
	}

	function send(receiver, selector, args) {
        var source = receiver;
        if (typeof receiver === 'number') {
            source = ctx.$number;
        } else if (typeof receiver === 'string') {
            source = ctx.$string;
        } else if (typeof receiver === 'boolean') {
            source = ctx.$boolean;
        }
        var impl = T.lookupSlotValue(source, selector);
        if (typeof impl === 'function') {
            return impl(ctx, receiver, args || []);
        } else if (impl.type === 'block') {
            // exercise for reader... :)
            throw new Error("user-defined methods not implemented");
        }
	}

	ctx = {
		rootEnv: T.make()
	};

	stdlib.attach(ctx);

	env = T.beget(ctx.rootEnv);

	return evalBlock(ast);

}