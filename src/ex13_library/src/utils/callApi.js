function callApi (requestURL, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);

    request.responseType = 'json';
    request.send();

    request.onload = function() {
        var json = request.response;
        callback(json);
    }
}