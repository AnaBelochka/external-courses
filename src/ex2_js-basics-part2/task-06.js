function complexOrSimpleNummer (variable) {
    if (variable > 1000) {
        return "Данные неверны";
    }
    if (variable === 1 || variable === 0) {
        return "Введено число 1 или 0";
    }
    if (variable < 1000 && variable >= 2) {
        for (var index = 2; index < variable; index++) {
            if (variable%index === 0 && variable !== 2) {
                return "Число " + variable + " - составное число";    
            }
        }
    }
    return "Число " + variable + " - простое число";
}

module.exports = complexOrSimpleNummer;