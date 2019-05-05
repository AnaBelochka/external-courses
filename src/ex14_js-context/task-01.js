function Calculator () {

    this.state = 0;

    function isNumeric(number) {
        return !isNaN(parseFloat(number)) && isFinite(number);
    }  

    this.add = function (variable) {

        if (isNumeric(variable)) this.state += variable;
         
        return this; 

    };

    this.subtract = function (variable) {

        if (isNumeric(variable)) this.state -= variable; ; 
        
        return this; 

    };

    this.divide = function (variable) {

        if (isNumeric(variable)) this.state /= variable;  
        
        return this;  

    };

    this.multiply = function (variable) {

        if (isNumeric(variable)) this.state *= variable; 
        
        return this; 

    };

    this.reset = function () {

        this.state = 0; 
        return this;

    };

    this.getResult = function () {

        return this.state; 

    };

    this.setState = function (variable) {

        if (typeof(variable) === 'number') this.state = variable;
        
        return this;

    };

    this.fetchData = function (callback) {

        var cb = callback.bind(this);

        setTimeout(function(){
            var serverState = 500;
            cb(serverState);
        }, 1000);

        return this;

    };

}

var calculator = new Calculator();

module.exports = calculator;