function cloneObject (object) {
    var newObject = {};
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            newObject[key] = object.key;            
        }
    }
    return newObject;
}

module.exports = cloneObject;