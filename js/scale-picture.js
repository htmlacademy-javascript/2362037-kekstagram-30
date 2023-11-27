
const scaleControlInput = document.querySelector('.scale__control--value');
const picturePreview = document.querySelector('.img-upload__preview img');

export const onscaleControlSmallerClick = () => {
  let scaleControlValue = parseFloat(scaleControlInput.value);
  if (scaleControlValue > 25) {
    scaleControlValue -= 25;
    scaleControlInput.value = `${scaleControlValue}%`;
  }
  picturePreview.style.transform = `scale(0.${scaleControlValue})`;
};

export const onscaleControlBiggerClick = () => {
  let scaleControlValue = parseFloat(scaleControlInput.value);
  if (scaleControlValue < 75) {
    scaleControlValue += 25;
    picturePreview.style.transform = `scale(0.${scaleControlValue})`;
  } else if (scaleControlValue === 75) {
    scaleControlValue += 25;
    picturePreview.style.transform = 'scale(1)';
  }
  scaleControlInput.value = `${scaleControlValue}%`;
};

