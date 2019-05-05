function countSymbol (string) {
    var nonRepeatingSymbols = [], symbol = "", countSymbol = 0;
    for (let index = 0; index < string.length; index++) {
        var flag = false;
        symbol = string.substring(index, index + 1);
        for (let index1 = 0; index1 < nonRepeatingSymbols.length + 1; index1++) {
            if (nonRepeatingSymbols[index1] === symbol) {
                flag = true;   
            }               
        }
        if (!flag) {
            nonRepeatingSymbols[countSymbol] = symbol;  
            countSymbol++;  
        }                    
    }
    for (let index = 0; index < nonRepeatingSymbols.length; index++) {
        console.log(string.split(nonRepeatingSymbols[index]).length - 1)
        
    }
}

module.exports = countSymbol;