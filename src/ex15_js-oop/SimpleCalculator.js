function SimpleCalculator(name) {
    Calculator.apply(this, arguments);
}

SimpleCalculator.prototype = Object.create(Calculator.prototype);
SimpleCalculator.prototype.constructor = SimpleCalculator;

SimpleCalculator.prototype.add = function(variable) {

    if (this.__isNumeric(variable)) this.__state += variable;

    return this;
}; 

SimpleCalculator.prototype.subtract = function(variable) {

    if (this.__isNumeric(variable)) this.__state -= variable;

    return this;
}; 

SimpleCalculator.prototype.multiply = function(variable) {

    if (this.__isNumeric(variable)) this.__state *= variable;

    return this;
}; 

SimpleCalculator.prototype.divide = function(variable) {

    if (this.__isNumeric(variable)) this.__state /= variable;

    return this;
}; 

SimpleCalculator.prototype.sqrt = function(variable) {

    if(this.__isNumeric(variable)) this.__state = Math.sqrt(variable);

    return this;
};

SimpleCalculator.prototype.square = function(variable) {

    if(this.__isNumeric(variable)) this.__state = Math.pow(variable, 2);

    return this;
};

SimpleCalculator.prototype.abs = function(variable) {

    if(this.__isNumeric(variable)) this.__state = Math.abs(variable);

    return this;
};

SimpleCalculator.prototype.exp = function(variable) {

    if(this.__isNumeric(variable)) this.__state = Math.exp(variable);

    return this;
};

SimpleCalculator.prototype.cbrt = function(variable) {

    if(this.__isNumeric(variable)) this.__state = Math.cbrt(variable);

    return this;
};

SimpleCalculator.prototype.log = function(variable) {

    if(this.__isNumeric(variable)) this.__state = Math.log(variable);

    return this;
};

SimpleCalculator.prototype.log10 = function(variable) {

    if(this.__isNumeric(variable)) this.__state = Math.log10(variable);

    return this;
};

var simpleCalculator = new SimpleCalculator("Калькулятор");

var res = simpleCalculator.add(100)
    .multiply(2)
    .divide(20)
    .reset()
    .subtract(1)
    .getResult();
	
console.log(res);

simpleCalculator.setState(1);
console.log(simpleCalculator.getResult()); 

console.log(simpleCalculator.sqrt(4));
console.log(simpleCalculator.getResult());
console.log(simpleCalculator.square(2));
console.log(simpleCalculator.getResult());