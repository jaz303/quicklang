exports.attach = attach;

var T = require('./things');

function attach(ctx) {
	object(ctx);
	io(ctx);
	random(ctx);
	number(ctx);
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

function random(ctx) {

    var random = T.make();
    T.addParent(random, 'random', ctx.$object);

    T.setSlot(random, 'intBetween:and:', function(ctx, self, args) {
        // assume args are integers
        return args[0] + Math.floor(Math.random() * (args[1] - args[0]));
    });

    T.setSlot(ctx.rootEnv, 'random', random);

}

function number(ctx) {

    var number = T.make();
    T.addParent(number, 'object', ctx.$object);

    T.setSlot(number, 'times:', function(ctx, self, args) {
        for (var i = 0; i < self; ++i) {
            ctx.evalBlock(args[0]);
        }
    });

    T.setSlot(number, 'lessThan:', function(ctx, self, args) {
        return self < args[0];
    });

    T.setSlot(number, 'greaterThan:', function(ctx, self, args) {
        return self > args[0];
    });

    T.setSlot(number, 'equalTo:', function(ctx, self, args) {
        return self == args[0];
    });

    T.setSlot(number, 'inc', function(ctx, self) {
        return self + 1;
    });

    ctx.$number = number;

}