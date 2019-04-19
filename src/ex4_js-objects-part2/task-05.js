function searchSubstring (string, substring) {
    if (string.search(substring) !== -1) {
        return true;   
    }
    return false;
}

module.exports = searchSubstring;