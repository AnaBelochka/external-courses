function createObjectWithoutPrototype () {    
    return Object.create(null);;
}

module.exports = createObjectWithoutPrototype;