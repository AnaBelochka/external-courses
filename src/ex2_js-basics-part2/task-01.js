function stringOrNumber (variable){
    var typeOfVariable = typeof variable;
    if (isNaN(variable)) return undefined;
    if (typeOfVariable === 'number' || typeOfVariable === 'string') return typeOfVariable;
    return undefined;
}

module.exports = stringOrNumber;