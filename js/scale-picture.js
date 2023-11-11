const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlInput = document.querySelector('.scale__control--value');
let scaleControlValue = parseFloat(scaleControlInput.value);
const picturePreview = document.querySelector('.img-upload__preview img');

const onscaleControlSmallerClick = () => {
  if (scaleControlValue > 25) {
    scaleControlValue -= 25;
  }
  scaleControlInput.value = `${scaleControlValue}%`;
  picturePreview.style.transform = `scale(0.${scaleControlValue})`;
};

scaleControlSmaller.addEventListener ('click', onscaleControlSmallerClick);

const onscaleControlBiggerClick = () => {
  if (scaleControlValue < 75) {
    scaleControlValue += 25;
    picturePreview.style.transform = `scale(0.${scaleControlValue})`;
  } else {
    picturePreview.style.transform = 'scale(1)';
  }
  scaleControlInput.value = `${scaleControlValue}%`;
};

scaleControlBigger.addEventListener ('click', onscaleControlBiggerClick);
