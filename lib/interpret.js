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
	    }
	}

	ctx = {
		rootEnv: T.make()
	};

	env = T.beget(ctx.rootEnv);

	return evalBlock(ast);

}