// create a list of persian numbers
const persianNumbers = "۰۱۲۳۴۵۶۷۸۹".split("");

// this function convert english numbers to persian numbers
function toPersianNumber(number) {
    // this condition checks that if the given number is persian then returns number
    if (isNaN(number)) {
        return number;
    } else {
        // convert type of number from 'number' to 'string'
        number = String(number);

        // then change string to list of it's characters
        number = number.split("");
        
        // then change each character to persian digit number
        for (let char of number) {
            number[number.indexOf(char)] = persianNumbers[char];
        }

        // change new list to string and return it
        return number.join("");
    }
}

// this function convert persian numbers to english numbers
function toEnglishNumber(number) {
    // this condition checks that the given number is persian or not
    if (isNaN(number)) {
        // convert string to list of characters
        const numbers = number.split("");

        // convert each character to english number and add it to an empty array
        let englishNumber = numbers.reduce((init, value) => {
            init.push(persianNumbers.findIndex(x => x === value));

            return init;
        }, []);

        // convert list to string
        englishNumber = englishNumber.join("");

        return englishNumber;
    } else {
        return number;
    }
}

export { toPersianNumber, toEnglishNumber };
