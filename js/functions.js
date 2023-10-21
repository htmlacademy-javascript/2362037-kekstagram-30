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


/* Дополнительное задание

Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах
и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.

Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна.
Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.

Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.
*/
