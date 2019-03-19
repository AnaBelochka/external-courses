function findProperty (string, object){
    for (const key in object) {
        if (key === string) {
            return true;    
        }
    }
    return false;
}

module.exports = findProperty;