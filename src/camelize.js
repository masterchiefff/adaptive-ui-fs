function toCamelCase(str) {
    let arrToStr = strArr(str).toString();
    return arrToStr.replace(/\,/g, '');
}