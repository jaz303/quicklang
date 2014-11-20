var T = require('./things');

module.exports = function(ast) {

	var ctx, env;

	ctx = {
		rootEnv: T.make()
	};

	env = T.beget(ctx.rootEnv);

}