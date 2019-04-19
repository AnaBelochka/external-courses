function searchSubstring (string, substring) {
    if (numberOfDymbol === string.search(substring)) {
        return true;   
    }
    return false;
}

module.exports = searchSubstring;