var obj = Object.create({a: 1});
obj.b = 2;

function findPropertyInPrototype (property, object) {
    for (const key in object) {
        if (object.hasOwnProperty(property)) {
            return undefined;
        }
    }
    return 1;
}

module.exports = findPropertyInPrototype;