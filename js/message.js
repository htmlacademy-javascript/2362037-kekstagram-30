import { isEscapeKey } from './utils.js';

const ERROR_TIMEOUT = 5000;

const successMessage = document.querySelector('#success').content.querySelector('.success');
const successButton = successMessage.querySelector('.success__button');
const getDataError = document.querySelector('#data-error').content.querySelector('.data-error');
const sendDataError = document.querySelector('#error').content.querySelector('.error');
const errorButton = sendDataError.querySelector('.error__button');

// Ошибка получения данных
export const getErrorMessage = () => {
  document.body.append(getDataError);
  setTimeout (() => getDataError.remove(), ERROR_TIMEOUT);
};

// Закрытие сообщения с ошибкой
const closeMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.removeEventListener('click', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

const onCloseButtonClick = () => closeMessage();

function onBodyClick (evt) {
  if (evt.target.closest('.success__inner') || (evt.target.closest('.error__inner'))) {
    return;
  }
  closeMessage();
}

// Показ сообщения с ошибкой
const showMessage = (message, messageButton) => {
  document.body.append(message);
  messageButton.addEventListener ('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.addEventListener('click', onBodyClick);
};

export const showSuccessMessage = () => {
  showMessage(successMessage, successButton);
};

export const showErrorMessage = () => {
  showMessage(sendDataError, errorButton);
};


