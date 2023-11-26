const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imgUploadInput = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');

const onUploadInputChange = () => {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((value) => fileName.endsWith(value));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  } else {
    preview.src = '';
  }
};

imgUploadInput.addEventListener('change', onUploadInputChange);
