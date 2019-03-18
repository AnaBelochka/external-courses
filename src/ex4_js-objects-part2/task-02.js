function createObjectWithoutPrototype () {
    var object = Object.create(null);
    return object;
}

module.exports = createObjectWithoutPrototype;