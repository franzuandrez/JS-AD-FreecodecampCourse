function telephoneCheck(str) {

    const withOneOptional = '(1 ?)';
    const threeNumbers = '\\d{3}';
    const openParenthesis = '(\\()';
    const closeParenthesis = '(\\))';
    const fourNumbers = '\\d{4}';
    const slashSpaceOptional = '(\\-| )?'
    const threeNumberBetweenParenthesis = `${openParenthesis}${threeNumbers}${closeParenthesis}`;

    const regexString = `^(${withOneOptional}((${threeNumberBetweenParenthesis})|(${threeNumbers}))|((${threeNumberBetweenParenthesis})|(${threeNumbers})))${slashSpaceOptional}(${threeNumbers})${slashSpaceOptional}(${fourNumbers})$`
    const regex = new RegExp(regexString,'g');

    return regex.test(str);

}

console.log(telephoneCheck("555-555-5555"));