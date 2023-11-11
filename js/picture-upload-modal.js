import { isEscapeKey } from './utils.js';
import { pristine } from './form-validation.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadModal = document.querySelector('.img-upload__overlay');
const imgUploadModalClose = document.querySelector('.img-upload__cancel');

// Открытие окна редактирования изображения
const openImgUploadModal = () => {
  imgUploadModal.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onimgUploadInputChange = () => {
  openImgUploadModal();
};

imgUploadInput.addEventListener('change', onimgUploadInputChange);

// Закрытие окна редактирования изображения
const closeImgUploadModal = () => {
  imgUploadModal.classList.add('hidden');
  document.querySelector('body').classList.remove('.modal-open');
  imgUploadInput.value = '';
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
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgUploadModal();
  }
}
