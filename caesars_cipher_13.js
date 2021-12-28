
function decode(str){
    const BASE=13;
    const MIN_CHAR ="A";
    const MAX_CHAR = String.fromCharCode(MIN_CHAR.charCodeAt(0)+25);
    const MIDDLE = MIN_CHAR.charCodeAt(0) +12;
    const currentCharCode = str.charCodeAt(0);
    const isNotAAlphabeticCharacter=currentCharCode < MIN_CHAR.charCodeAt(0) || currentCharCode > MAX_CHAR.charCodeAt(0);
    if( isNotAAlphabeticCharacter ) return str;

    const factor =  (currentCharCode > MIDDLE ? -1:1);//Should +13 or -13

    return  String.fromCharCode( currentCharCode + (BASE*factor))
}

function rot13(str) {

    return str.
    toUpperCase().
    split("")
        .map(decode)
        .join("") ;
}

console.log(rot13("SERR PBQR PNZC"));