import { onDocumentKeydown } from './picture-upload-modal';
import { sendData } from './server.js';
import { closeImgUploadModal } from './picture-upload-modal.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const HASHTAGS_MAX = 5;

const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

const submitButtonText = {
  ACTION: 'Отправляю...',
  INACTION: 'Опубликовать',
};

const toggleStateSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  if (isDisabled) {
    submitButton.textContent = submitButtonText.ACTION;
  } else {
    submitButton.textContent = submitButtonText.INACTION;
  }
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
}, false);

const getHashtags = (hashtagsInputValue) =>
  hashtagsInputValue
    .trim()
    .toLowerCase()
    .split(' ')
    .filter((hashtag) => hashtag.length > 0);

const validateHashtagsPattern = (value) => getHashtags(value).every((hashtag) => hashtagPattern.test(hashtag));

pristine.addValidator(
  hashtagsInput,
  validateHashtagsPattern,
  'Хэштег должен начинаться с # и содержать только символы a-z, а-я и 0-9',
  1
);

const validateHashtagsAmount = (value) => getHashtags(value).length <= HASHTAGS_MAX;

pristine.addValidator(
  hashtagsInput,
  validateHashtagsAmount,
  'Не более пяти хэштегов',
  2
);

const validateHashtagsRepeat = (value) => {
  const hashtags = getHashtags(value);

  const isHashtagsRepeat = hashtags.every((hashtag, i, array) => array.indexOf(hashtag) === i);

  return isHashtagsRepeat;
};

pristine.addValidator(
  hashtagsInput,
  validateHashtagsRepeat,
  'Хэштеги не должны повторяться',
  3
);

// Валидация комментария
const validateDescription = (value) => value.length < 140;

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Не более 140 символов'
);

// Отмена Esc при фокусе
hashtagsInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

hashtagsInput.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

descriptionInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onDocumentKeydown);
});

descriptionInput.addEventListener('blur', () => {
  document.addEventListener('keydown', onDocumentKeydown);
});

// Отправка формы
const sendForm = (form) => {
  if (!pristine.validate()) {
    return;
  }
  toggleStateSubmitButton(true);
  sendData(new FormData(form))
    .then(() => {
      closeImgUploadModal();
      showSuccessMessage();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      toggleStateSubmitButton(false);
    });
};

export const onImgUploadFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};

