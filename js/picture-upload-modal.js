import { isEscapeKey } from './utils.js';
import { onScaleControlSmallerClick, onScaleControlBiggerClick } from './scale-picture.js';
import { onEffectChromeButtonClick, onEffectNoneButtonClick, onEffectSepiaButtonClick, onEffectMarvinButtonClick, onEffectPhobosButtonClick, onEffectHeatButtonClick } from './picture-effects.js';
import { onImgUploadFormSubmit } from './form-validation.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadModal = document.querySelector('.img-upload__overlay');
const imgUploadModalClose = document.querySelector('.img-upload__cancel');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const effectNoneButton = document.querySelector('#effect-none');
const effectChromeButton = document.querySelector('#effect-chrome');
const effectSepiaButton = document.querySelector('#effect-sepia');
const effectMarvinButton = document.querySelector('#effect-marvin');
const effectPhobosButton = document.querySelector('#effect-phobos');
const effectHeatButton = document.querySelector('#effect-heat');
const imgUploadForm = document.querySelector('.img-upload__form');

// Открытие окна редактирования изображения
export const openImgUploadModal = () => {
  imgUploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  document.querySelector('#effect-none').checked = true;
  scaleControlSmaller.addEventListener ('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener ('click', onScaleControlBiggerClick);
  effectChromeButton.addEventListener('change', onEffectChromeButtonClick);
  effectNoneButton.addEventListener('change', onEffectNoneButtonClick);
  effectSepiaButton.addEventListener('change', onEffectSepiaButtonClick);
  effectMarvinButton.addEventListener('change', onEffectMarvinButtonClick);
  effectPhobosButton.addEventListener('change', onEffectPhobosButtonClick);
  effectHeatButton.addEventListener('change', onEffectHeatButtonClick);
  imgUploadForm.addEventListener('submit', onImgUploadFormSubmit);
};

// Закрытие окна редактирования изображения
export const closeImgUploadModal = () => {
  imgUploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadInput.value = '';
  document.querySelector('.text__hashtags').value = '';
  document.querySelector('.text__description').value = '';
  document.querySelector('.scale__control--value').value = '100%';
  document.querySelector('.img-upload__preview img').style.transform = '';
  document.querySelector('.img-upload__preview img').style.filter = '';
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.querySelector('.img-upload__overlay').removeEventListener('keydown', onDocumentKeydown);
  document.querySelector('.img-upload__cancel').removeEventListener('keydown', onDocumentKeydown);
  scaleControlSmaller.removeEventListener ('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener ('click', onScaleControlBiggerClick);
  effectChromeButton.removeEventListener('change', onEffectChromeButtonClick);
  effectNoneButton.removeEventListener('change', onEffectNoneButtonClick);
  effectSepiaButton.removeEventListener('change', onEffectSepiaButtonClick);
  effectMarvinButton.removeEventListener('change', onEffectMarvinButtonClick);
  effectPhobosButton.removeEventListener('change', onEffectPhobosButtonClick);
  effectHeatButton.removeEventListener('change', onEffectHeatButtonClick);
  imgUploadForm.removeEventListener('submit', onImgUploadFormSubmit);
};

const onImgUploadModalCloseClick = () => {
  closeImgUploadModal();
};

imgUploadModalClose.addEventListener('click', onImgUploadModalCloseClick);

// Закрытие по Esc
export function onDocumentKeydown (evt) {
  const isErrorMessageOpen = Boolean(document.querySelector('.error'));

  if (isEscapeKey(evt) && !isErrorMessageOpen) {
    evt.preventDefault();
    closeImgUploadModal();
  }
}

