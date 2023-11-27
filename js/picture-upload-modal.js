import { isEscapeKey } from './utils.js';
import { pristine } from './form-validation.js';
import { onscaleControlSmallerClick, onscaleControlBiggerClick } from './scale-picture.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadModal = document.querySelector('.img-upload__overlay');
const imgUploadModalClose = document.querySelector('.img-upload__cancel');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');

// Открытие окна редактирования изображения
const openImgUploadModal = () => {
  imgUploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  scaleControlSmaller.addEventListener ('click', onscaleControlSmallerClick);
  scaleControlBigger.addEventListener ('click', onscaleControlBiggerClick);
};

const onimgUploadInputChange = () => {
  openImgUploadModal();
};

imgUploadInput.addEventListener('change', onimgUploadInputChange);

// Закрытие окна редактирования изображения
export const closeImgUploadModal = () => {
  imgUploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.value = '';
  document.querySelector('.text__hashtags').value = '';
  document.querySelector('.text__description').value = '';
  document.querySelector('.img-upload__preview img').style.transform = 'none';
  document.removeEventListener('keydown', onDocumentKeydown);
  pristine.destroy();
  document.querySelector('.img-upload__overlay').removeEventListener('keydown', onDocumentKeydown);
  document.querySelector('.img-upload__cancel').removeEventListener('keydown', onDocumentKeydown);
};

const onimgUploadModalCloseClick = () => {
  closeImgUploadModal();
};

imgUploadModalClose.addEventListener('click', onimgUploadModalCloseClick);

// Закрытие по Esc
export function onDocumentKeydown (evt) {
  const isErrorMessageOpen = Boolean(document.querySelector('.error'));

  if (isEscapeKey(evt) && !isErrorMessageOpen) {
    evt.preventDefault();
    closeImgUploadModal();
  }
}

