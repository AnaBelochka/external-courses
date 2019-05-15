function Calculator(name) {
    this.__state = 0;
    this.__name = name;
}

Calculator.prototype.__isNumeric = function(number) {
    return !Number.isNaN(parseFloat(number)) && Number.isFinite(number);
};

Calculator.prototype.reset = function() {
    this.__state = 0;
    return this;
};

Calculator.prototype.getResult = function() {
    return this.__state;
};

Calculator.prototype.setState = function(variable) {
    
    if(this.__isNumeric(variable)) this.__state = variable;

    return this;
};