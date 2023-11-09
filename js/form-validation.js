import { onDocumentKeydown } from './picture-upload-modal';

const HASHTAGS_MAX = 5;

const imgUploadform = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;

export const pristine = new Pristine(imgUploadform, {
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

imgUploadform.addEventListener('submit', (evt) =>{
  evt.preventDefault();
  pristine.validate();
});

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
