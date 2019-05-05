function Calculator(name) {
    CalculatorStatus.apply(this, arguments);
}

Calculator.prototype = Object.create(CalculatorStatus.prototype);
Calculator.prototype.constructor = Calculator;

Calculator.prototype.add = function(variable) {

    if (this.__isNumeric(variable)) this.__state += variable;

    return this;
}; 

Calculator.prototype.subtract = function(variable) {

    if (this.__isNumeric(variable)) this.__state -= variable;

    return this;
}; 

Calculator.prototype.multiply = function(variable) {

    if (this.__isNumeric(variable)) this.__state *= variable;

    return this;
}; 

Calculator.prototype.divide = function(variable) {

    if (this.__isNumeric(variable)) this.__state /= variable;

    return this;
}; 

Calculator.prototype.sqrt = function(variable) {

    if(this.__isNumeric(variable)) this.__state = Math.sqrt(variable);

    return this;
};

Calculator.prototype.square = function(variable) {

    if(this.__isNumeric(variable)) this.__state = Math.pow(variable, 2);

    return this;
};

Calculator.prototype.abs = function(variable) {

    if(this.__isNumeric(variable)) this.__state = Math.abs(variable);

    return this;
};

Calculator.prototype.exp = function(variable) {

    if(this.__isNumeric(variable)) this.__state = Math.exp(variable);

    return this;
};

Calculator.prototype.cbrt = function(variable) {

    if(this.__isNumeric(variable)) this.__state = Math.cbrt(variable);

    return this;
};

Calculator.prototype.log = function(variable) {

    if(this.__isNumeric(variable)) this.__state = Math.log(variable);

    return this;
};

Calculator.prototype.log10 = function(variable) {

    if(this.__isNumeric(variable)) this.__state = Math.log10(variable);

    return this;
};

var calculator = new Calculator("Калькулятор");

var res = calculator.add(100)
    .multiply(2)
    .divide(20)
    .reset()
    .subtract(1)
    .getResult();
	
console.log(res);

calculator.setState(1);
console.log(calculator.getResult()); 

console.log(calculator.sqrt(4));
console.log(calculator.getResult());

console.log(calculator.square(2));
console.log(calculator.getResult());