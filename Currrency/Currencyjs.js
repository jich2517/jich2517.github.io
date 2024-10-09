let input = "";

function display(digit) {
    if (digit === '.' && input.includes('.')) return;
    input += digit;
    document.getElementById('user_input').value = input;
}

function clearDisplay() {
    input = "";
    document.getElementById('user_input').value = "";
    document.getElementById('word_display').innerHTML = "";
}

function translateToWords() {
    const [dollars, cents] = input.split('.').map(num => parseInt(num, 10));
    let result = "";

    if (!isNaN(dollars)) {
        result += `${convertToWords(dollars)} dollar${dollars !== 1 ? 's' : ''}`;
    }

    if (!isNaN(cents)) {
        result += ` and ${convertToWords(cents)} cent${cents !== 1 ? 's' : ''}`;
    }

    document.getElementById('word_display').innerHTML = result;
}

function convertToWords(num) {
    const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const thousands = ["", "thousand"];

    if (num === 0) return "zero";

    let words = "";

    if (num > 999) {
        words += `${convertToWords(Math.floor(num / 1000))} thousand `;
        num %= 1000;
    }

    if (num > 99) {
        words += `${units[Math.floor(num / 100)]} hundred `;
        num %= 100;
    }

    if (num > 10 && num < 20) {
        words += teens[num - 10];
    } else {
        words += tens[Math.floor(num / 10)];
        if (num % 10) words += `${units[num % 10]}`;
    }

    return words.trim();
}
