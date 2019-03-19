function arrayInfo (array) {
    array.forEach(element => {
        console.log(element);
    });
    console.log(array.length);
}

module.exports = arrayInfo;