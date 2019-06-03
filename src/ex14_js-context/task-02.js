function Hangman (word) {

    var result, errList, countErrors, returnVar, endResult, inputWord=word.toLowerCase();

    function encodedWord (uncodedWord) {
        var res = "";
        for (let index = 0; index < uncodedWord.length; index++) {
            res += '_';        
        };
        return res;
    }  

    this.startAgain = function (newWord) {
        errList = [];
        countErrors = 6;
        inputWord = newWord.toLowerCase();
        result = encodedWord(inputWord);
    };

    this.startAgain(word);

    this.guess = function (symbol) {

        var flag = false;

        for (let index = 0; index < inputWord.length; index++) {
            
            if (symbol.toLowerCase() === inputWord[index]) {
                result = result.substr(0, index) + symbol.toLowerCase() + result.substr(index+1, inputWord.length-index+1);
                flag = true;
            }
            
        }

        if (inputWord.indexOf(symbol.toLowerCase()) === -1) {
            countErrors--;
            errList.push(symbol.toLowerCase());             
        }

        if (flag) {

            console.log(result);

        } else {

            if (errList.length === 1) {
                endResult = " | " + symbol.toLowerCase();
            } else {
                endResult += ", " + symbol.toLowerCase();
            }
            returnVar = "wrong letter, errors left "+ countErrors + endResult;
            console.log(returnVar);

        }

        if (countErrors === 0) {
            console.log("You died");    
        } else if (result.indexOf("_") === -1) {
            console.log("You survived");
        }
        
        return this;

    };

    this.getGuessedString = function () {
        console.log(result);
        return result;
    };

    this.getErrorsLeft = function () {
        console.log(countErrors);
        return countErrors;
    };

    this.getWrongSymbols = function () {
        console.log(errList);
        return errList;
    };

    this.getStatus = function () {
        var status = result + " | errors left " + countErrors;
        console.log(status);
        return status;  
    };
}

var hangman = new Hangman('webpurple');

module.exports = hangman;  