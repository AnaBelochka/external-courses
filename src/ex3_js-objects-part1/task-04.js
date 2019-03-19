function findAndCreateProperty (string, object) {
    if (!(string in object)) {
        object[string] = "new";    
    }
    return object;
}

module.exports = findAndCreateProperty;