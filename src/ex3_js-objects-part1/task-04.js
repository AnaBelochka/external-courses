function findAndCreateProperty (string, object) {
    var newObject = object;
    if (!(string in newObject)) {
        newObject[string] = "new";    
    }
    return newObject;
}

module.exports = findAndCreateProperty;