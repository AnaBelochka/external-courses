function complexOrSimpleNummer (variable) {
    var flag = 0;
    var tempVariable = "";
    if (variable > 1000) {
        tempVariable = "Данные неверны";
        flag = 1;
    }
    else if (variable === 2) {
        tempVariable = "Число 2 - простое число";
        flag = 1;
    }
    else {
        for (var index = 2; index < variable; index++) {
            if (variable%index === 0) {
                tempVariable = "Число " + variable + " - составное число";    
                flag = 1;
            }
        }
    }
    if (flag) return tempVariable;
    return "Число " + variable + " - простое число";
}

module.exports = complexOrSimpleNummer;