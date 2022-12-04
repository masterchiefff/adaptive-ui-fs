export default function strArr ( str ) {
    if( str.includes('-') ) {
        return str;
    }else{
        return `${str}-element`
    }
};