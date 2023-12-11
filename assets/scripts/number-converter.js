const persianNumbers = "۰۱۲۳۴۵۶۷۸۹".split("");
function toPersianNumber(number) {
    if (isNaN(number)) {
        return number;
    } else {
        number = String(number);
        number = number.split("");
        for (let char of number) {
            number[number.indexOf(char)] = persianNumbers[char];
        }

        return number.join("");
    }
}

function toEnglishNumber(number) {
    if (isNaN(number)) {
        const temp = number.split("");

        let englishNumber = temp.reduce((init, value) => {
            init.push(persianNumbers.findIndex(x => x === value));

            return init;
        }, []);

        englishNumber = englishNumber.join("");

        return englishNumber;
    }
}

export { toPersianNumber, toEnglishNumber };
