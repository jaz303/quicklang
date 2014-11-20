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