function sliceMethodAnalog (array, begin, end) {

    var arrayResult = [], positiveBegin, positiveEnd;
    
    if (typeof arguments[1] === "undefined") {
        arrayResult = array;
        return arrayResult;
    }
    
    if (typeof arguments[2] === "undefined" ) {
    
        if (begin < 0) {
            positiveBegin = array.length - Math.abs(begin);
        }
        else {
            positiveBegin = begin;
        }
        
        for (let index = positiveBegin; index < array.length; index++) {
            arrayResult.push ( array[index] ); 
        }
        return arrayResult;
    }
    
    if (begin < 0 && end < 0) {
        positiveBegin = array.length - Math.abs(begin);
        positiveEnd = Math.abs(end) + 1;
    }
    else if (begin < 0) {
        positiveBegin = array.length - Math.abs(begin);
        positiveEnd = end;
    }
    else if (end < 0) {
        positiveBegin = begin;
        positiveEnd = Math.abs(end);
    }
    else {
        positiveBegin = begin;
        positiveEnd = end;
    }
    
    for (let index = positiveBegin; index < positiveBegin + positiveEnd - 1; index++) {
        arrayResult.push ( array[index] );       
    }
    
    return arrayResult;
}

module.exports = sliceMethodAnalog;