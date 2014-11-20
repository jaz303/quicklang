exports.attach = attach;

var T = require('./things');

function attach(ctx) {
	object(ctx);
}

function object(ctx) {
    
    var object = T.make();

    T.setSlot(object, 'isTrue', function(ctx, self) {
        return !!ctx.send(self, 'asBoolean');
    });

    T.setSlot(object, 'ifTrue:', function(ctx, self, args) {
        if (ctx.send(self, 'isTrue')) {
            ctx.evalBlock(args[0]);
        }
    });

    T.setSlot(object, 'whileTrue:', function(ctx, self, args) {
        while (ctx.send(self, 'isTrue')) {
            ctx.evalBlock(args[0]);
        }
    });

    ctx.$object = object;
    T.setSlot(ctx.rootEnv, 'object', object);

}