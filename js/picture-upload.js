import { openImgUploadModal } from './picture-upload-modal.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imgUploadInput = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const onUploadInputChange = () => {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((value) => fileName.endsWith(value));

  if (matches) {
    const pictureURL = URL.createObjectURL(file);
    preview.src = pictureURL;

    for (let i = 0; i <= effectsPreviews.length - 1; i++) {
      effectsPreviews[i].style.backgroundImage = `url(${pictureURL})`;
    }
  } else {
    preview.src = '';
  }

  openImgUploadModal();
};

imgUploadInput.addEventListener('change', onUploadInputChange);
