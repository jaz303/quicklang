var T = require('./things');

module.exports = function(ast) {

	var ctx, env;

	function evalBlock(stmts) {
	    var lastVal = null;
	    stmts.forEach(function(stmt) {
	    	
	    });
	    return lastVal;
	}

	ctx = {
		rootEnv: T.make()
	};

	env = T.beget(ctx.rootEnv);

	return evalBlock(ast);

}