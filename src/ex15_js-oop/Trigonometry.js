function TrigonometryCalculator(name) {
    CalculatorStatus.apply(this, arguments);
}

TrigonometryCalculator.prototype = Object.create(CalculatorStatus.prototype);
TrigonometryCalculator.prototype.constructor = TrigonometryCalculator;

TrigonometryCalculator.prototype.sin = function(variable) {
    
    if(this.__isNumeric(variable)) this.__state = Math.sin(variable);

    return this;
};

TrigonometryCalculator.prototype.cos = function(variable) {
    
    if(this.__isNumeric(variable)) this.__state = Math.cos(variable);

    return this;
};

TrigonometryCalculator.prototype.tan = function(variable) {
    
    if(this.__isNumeric(variable)) this.__state = Math.tan(variable);

    return this;
};

TrigonometryCalculator.prototype.ctan = function(variable) {
    
    if(this.__isNumeric(variable)) this.__state = 1/Math.tan(variable);

    return this;
};

TrigonometryCalculator.prototype.sinh = function(variable) {
    
    if(this.__isNumeric(variable)) this.__state = Math.sinh(variable);

    return this;
};

TrigonometryCalculator.prototype.cosh = function(variable) {
    
    if(this.__isNumeric(variable)) this.__state = Math.cosh(variable);

    return this;
};

TrigonometryCalculator.prototype.tanh = function(variable) {
    
    if(this.__isNumeric(variable)) this.__state = Math.tanh(variable);

    return this;
};

TrigonometryCalculator.prototype.сtanh = function(variable) {
    
    if(this.__isNumeric(variable)) this.__state = 1/Math.tanh(variable);

    return this;
};

var trig = new TrigonometryCalculator("Тригонометрический калькулятор");

console.log(trig.sin(1).cos(0));

trig.setState(1);
console.log(trig.getResult()); 

console.log(trig.сtanh(1));
console.log(trig.getResult()); 