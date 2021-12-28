const BASES =
    {
        1:"I",
        5:"V",
        10:"X",
        50:"L",
        100:"C",
        500:"D",
        1000:"M"
    }
;
function fillBases () {

    const keys = Object.keys(BASES);// 1,5,10...

    for(let i = 1; i< keys.length;i ++){//omit the first element
        let currentElement = keys[i];
        let previousElement = keys[i-1];

        if(previousElement * 2 !== currentElement ){
            let keyNumber =currentElement-previousElement;
            BASES[keyNumber]=BASES[previousElement.toString().concat(currentElement)];
        }else{
            let previousPreviousElement = keys[i-2];
            BASES[currentElement-previousPreviousElement]=BASES[previousPreviousElement]+BASES[currentElement];
        }

    }

}

function getRomanArray(num){//return an array with [ romanString,romanNumber ] e.g [ I, 1 ]

    const keys = Object.keys(BASES);// 1,4,5...
    let romanString = '';
    let romanNumber  = num;
    let totalKeys = keys.length;
    let lastKey =  keys[totalKeys - 1];
    let isGreaterThanLastKey = num > lastKey;

    if(isGreaterThanLastKey){
        romanNumber = num - lastKey;
        romanString = BASES[lastKey];
    }else{
        for(let i = 0; i < totalKeys;i++){
            if(num < keys[i] ){
                romanNumber = num - keys[i-1];
                romanString = BASES[keys[i-1]];
                break;
            }

        }

    }

    return [ romanString,romanNumber]
}

function convertToRoman(num) {


    if(BASES[num]!==undefined)return BASES[num];

    const romanArray = getRomanArray(num);
    let romanString = romanArray[0];
    let romanNumber  = romanArray[1];





    return romanString + convertToRoman(romanNumber);


}
fillBases();
console.log(convertToRoman(5),"FINAL");