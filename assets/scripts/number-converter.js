function changeNumberFormat(number) {
    const persianNumbers = "۰۱۲۳۴۵۶۷۸۹".split("");

    number = String(number);
    number = number.split("");
    for (let char of number) {
        number[number.indexOf(char)] = persianNumbers[char];
    }

    return number.join("");
}

export { changeNumberFormat };
