function stringOrNumber (variable){
    var typeOfVariable = typeof variable;
    if (typeOfVariable === 'number' && !isNaN(variable) || typeOfVariable === 'string') return typeOfVariable;
    return undefined;
}

module.exports = stringOrNumber;