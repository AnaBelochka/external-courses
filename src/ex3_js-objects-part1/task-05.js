function cloneObject (object) {
    var newObject = {};
    for (const key in object) {
        newObject[key] = object.key;
    }
    return newObject;
}

module.exports = cloneObject;