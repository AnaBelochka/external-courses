function deleteStartAndEndSpaces (string) {    
    return string.substring(1, string.length - 1);
}

module.exports = deleteStartAndEndSpaces;