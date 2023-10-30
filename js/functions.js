//Проверка длины строки

const checkStringLength = function(string, maxLength) {
  const check = string.length <= maxLength;
  console.log(check); // eslint-disable-line
  return check;
};

checkStringLength('осень', 11);

//Является ли строка палиндромом

const checkPalindrome = function(string) {
  const normalString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';

  for (let i = normalString.length - 1; i >= 0; i--) {
    newString += normalString[i];
  }

  let result = newString === normalString; // eslint-disable-line
  result ? console.log(string + ' – это палиндром!') : console.log(string + ' – это не палиндром!'); // eslint-disable-line

  return result;
};

checkPalindrome ('нажал кабан на баклажан');
