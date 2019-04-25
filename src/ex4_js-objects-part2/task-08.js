function lowerCamleCase (string) {
    var newString = "";
    for (let index = 0; index < string.length; index++) {
        if (index === 0) {
            newString += string.substring(0, 1).toLowerCase();    
        } 
        else if (string.substring(index, index + 1) === " ") {
            index++;
            newString += string.substring(index, index + 1).toUpperCase();   
        } else {
            newString += string.substring(index, index + 1).toLowerCase();
        }        
    }
    return newString;
}

module.exports = lowerCamleCase;