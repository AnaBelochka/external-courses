function searchSubstring (string, substring) {
    if (substring === string.search(substring)) {
        return true;   
    }
    return false;
}

module.exports = searchSubstring;