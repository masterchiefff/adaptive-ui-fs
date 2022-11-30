async function strArr(str){
    if(str.includes('-')){0
        const strArr = str.split('-');
        return await strArr.map(item => item.charAt(0).toUpperCase() + item.substr(1))
    }else{
        const strCapitalized = str.charAt(0).toUpperCase() + str.slice(1);
        return await [strCapitalized, "Element"];
    }
}

export const toCamelCase = (str) => {
    let arrToStr = strArr(str).toString();
    return arrToStr.replace(/\,/g, '');
}