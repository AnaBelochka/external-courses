function stringOrNumber (variable){
    var undefinedVariable;
    var typeOfVariable = typeof(variable);
    if (typeOfVariable === 'number' || typeOfVariable === 'string') return typeOfVariable;
    return undefinedVariable;
}

module.exports = stringOrNumber;