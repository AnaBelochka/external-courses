var Calculator = {
    state: 0,
    
    add: function add(variable) { 
        if (typeof(variable) !== 'number') return state; 
        state += variable; 
        return this.add; 
    },

    substract: function substract(variable) { 
        if (typeof(variable) !== 'number') return state; 
        state -= variable; 
        return this.substract; 
    },
    
    divide: function divide(variable) { 
        if (typeof(variable) !== 'number') return state; 
        state /= variable; 
        return this.divide; 
    },

    multiply: function multiply(variable) { 
        if (typeof(variable) !== 'number') return state; 
        state *= variable; 
        return this.multiply; 
    },

    reset: function reset() { 
        state = 0; 
        return state;
    },

    getResult: function getResult() { 
        return state; 
    } 

}

moduk.exports = Calculator;