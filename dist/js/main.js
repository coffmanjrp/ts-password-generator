"use strict";
var resultEl = document.getElementById('result');
var lengthEl = document.getElementById('length');
var uppercaseEl = document.getElementById('uppercase');
var lowercaseEl = document.getElementById('lowercase');
var numbersEl = document.getElementById('numbers');
var symbolsEl = document.getElementById('symbols');
var generateEl = document.getElementById('generate');
var clipboardEl = document.getElementById('clipboard');
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
    var symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
var randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};
clipboardEl.addEventListener('click', function () {
    var textarea = document.createElement('textarea');
    var password = resultEl.innerText;
    if (!password) {
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
});
function generatePassword(lower, upper, number, symbol, length) {
    var generatedPassword = '';
    var countLower = lower ? 1 : 0;
    var countUpper = upper ? 1 : 0;
    var countNumber = number ? 1 : 0;
    var countSymbol = symbol ? 1 : 0;
    var typesCount = countLower + countUpper + countNumber + countSymbol;
    var typesArr = [{ lower: lower }, { upper: upper }, { number: number }, { symbol: symbol }].filter(function (item) { return Object.values(item)[0]; });
    if (typesCount === 0) {
        return '';
    }
    for (var i = 0; i < length; i += +typesCount) {
        typesArr.forEach(function (type) {
            var funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }
    var finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}
generateEl.addEventListener('click', function () {
    var length = +lengthEl.value;
    var hasLower = lowercaseEl.checked;
    var hasUpper = uppercaseEl.checked;
    var hasNumber = numbersEl.checked;
    var hasSymbol = symbolsEl.checked;
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});
