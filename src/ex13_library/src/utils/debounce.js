function debounce(func, wait) {
    var timeout = null;
    return function(event) {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            func.call(null, event)
        }, wait);
    }
}