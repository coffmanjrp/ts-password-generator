const resultEl = document.getElementById('result') as HTMLSpanElement;
const lengthEl = document.getElementById('length') as HTMLInputElement;
const uppercaseEl = document.getElementById('uppercase') as HTMLInputElement;
const lowercaseEl = document.getElementById('lowercase') as HTMLInputElement;
const numbersEl = document.getElementById('numbers') as HTMLInputElement;
const symbolsEl = document.getElementById('symbols') as HTMLInputElement;
const generateEl = document.getElementById('generate') as HTMLButtonElement;
const clipboardEl = document.getElementById('clipboard') as HTMLButtonElement;

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
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

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

function generatePassword(
  lower: boolean,
  upper: boolean,
  number: boolean,
  symbol: boolean,
  length: number
) {
  let generatedPassword = '';
  const countLower = lower ? 1 : 0;
  const countUpper = upper ? 1 : 0;
  const countNumber = number ? 1 : 0;
  const countSymbol = symbol ? 1 : 0;
  const typesCount = countLower + countUpper + countNumber + countSymbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i += +typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});
