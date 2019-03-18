function countSymbol (string) {
    var nonRepeatingSymbol = [], symbol = "", countSymbol = 0;
    for (let index = 0; index < string.length; index++) {
        var flag = false;
        symbol = string.substring(index, index + 1);
        for (let index1 = 0; index1 < nonRepeatingSymbol.length + 1; index1++) {
            if (nonRepeatingSymbol[index1] === symbol) {
                flag = true;   
            }               
        }
        if (!flag) {
            nonRepeatingSymbol[countSymbol] = symbol;  
            countSymbol++;  
        }                    
    }
    for (let index = 0; index < nonRepeatingSymbol.length; index++) {
        console.log(string.split(nonRepeatingSymbol[index]).length - 1)
        
    }
}

module.exports = countSymbol;