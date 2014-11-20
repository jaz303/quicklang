exports.attach = attach;

var T = require('./things');

function attach(ctx) {
	object(ctx);
	io(ctx);
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

var sget = require('sget');

function io(ctx) {

    var io = T.make();
    T.addParent(io, 'object', ctx.$object);

    T.setSlot(io, 'print:', function(ctx, self, args) {
        process.stdout.write(args[0]);
    });

    T.setSlot(io, 'println', function(ctx, self, args) {
        process.stdout.write("\n");
    });

    T.setSlot(io, 'println:', function(ctx, self, args) {
        process.stdout.write(args[0] + "\n");
    });

    T.setSlot(io, 'readlnWithPrompt:', function(ctx, self, args) {
        return sget(args[0]);
    });

    T.setSlot(ctx.rootEnv, 'io', io);

}