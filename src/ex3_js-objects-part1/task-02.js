function returnObjectInfo (object) {
    for (const key in object) {
        console.log(key+object.key);
    }
}

module.exports = returnObjectInfo;