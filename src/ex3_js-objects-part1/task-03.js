function findProperty (string, object){
    if (string in object) return true;
    return false;
}

module.exports = findProperty;