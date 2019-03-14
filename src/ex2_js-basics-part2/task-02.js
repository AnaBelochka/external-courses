function arrayInfo (array) {
    var countElements = 0;
    array.forEach(element => {
        console.log(element);
        countElements++;
    });
    console.log(countElements);
}

module.exports = arrayInfo;