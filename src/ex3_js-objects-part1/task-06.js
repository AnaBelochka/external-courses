function deepClone (object) { 
    if (typeof object !== "object" || !object) {
        return object;
    }

    var newObject = Array.isArray(object) ? [] : {} ;

    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            newObject[key] = deepClone(object[key]);
        }
    }

    return newObject;

} 

module.exports = deepClone;