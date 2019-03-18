function searchSubstring (string, substring) {
    var numberOfDymbol = string.search(substring);
    if (numberOfDymbol > 0) {
        return true;   
    }
    return false;
}

module.exports = searchSubstring;