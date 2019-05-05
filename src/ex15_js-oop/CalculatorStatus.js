function CalculatorStatus(name) {
    this.__state = 0;
    this.__name = name;
}

CalculatorStatus.prototype.__isNumeric = function(number) {
    return !Number.isNaN(parseFloat(number)) && Number.isFinite(number);
};

CalculatorStatus.prototype.reset = function() {
    this.__state = 0;
    return this;
};

CalculatorStatus.prototype.getResult = function() {
    return this.__state;
};

CalculatorStatus.prototype.setState = function(variable) {
    
    if(this.__isNumeric(variable)) this.__state = variable;

    return this;
};