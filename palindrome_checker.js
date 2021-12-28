

function removeNonAlphanumericCharacters( str){
    return str.replace(/\W|_|\s/g,"");
}
function palindrome(str) {

    let newWord = removeNonAlphanumericCharacters(str.toLowerCase());
    let length = newWord.length;

    if(length===1)return true;// e.g  1
    let startsPalindrome = newWord[0] === newWord[length -1];
    if(length===2)return startsPalindrome;//e.g hh

    return startsPalindrome && palindrome(newWord.slice(1,length-1))
}
palindrome("eye");