exports.make            = mkthing;
exports.addParent       = addParent;
exports.lookupSlot      = lookupSlot;
exports.lookupSlotValue = lookupSlotValue;
exports.setSlot         = setSlot;
exports.beget           = beget;
exports.defineOrSet     = defineOrSet;

function Thing() {
    this.parents = {};
    this.data = {};
    this.slots = {};
}

function mkthing() {
    return new Thing();
}

function addParent(thing, parentName, parent) {
    thing.parents[parentName] = parent;
}

function setSlot(thing, slotName, value) {
    thing.slots[slotName] = value;
}

function lookupSlot(thing, slotName) {
    if (slotName in thing.slots) {
        return thing;
    }
    // FIXME: in reality you might want to iterate in reverse
    // so the most recently added parent wins. This is good
    // enough for now.
    for (var k in thing.parents) {
        var val = lookupSlot(thing.parents[k], slotName);
        if (val !== void 0) {
            return val;
        }
    }
    return void 0;
}

function lookupSlotValue(thing, slotName) {
    var source = lookupSlot(thing, slotName);
    if (!source) {
        throw new Error("no such slot: " + slotName);
    }
    return source.slots[slotName];
}

function beget(env) {
    var child = mkthing();
    addParent(child, 'parentEnv', env);
    return child;
}

function defineOrSet(env, symbol, value) {
    var target = lookupSlot(env, symbol);
    if (target) {
        setSlot(target, symbol, value);
    } else {
        setSlot(env, symbol, value);
    }
}