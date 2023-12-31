const filters = [
  {effect: 'chrome',
    filter: 'grayscale',
    unit: ''
  },

  {effect: 'sepia',
    filter: 'sepia',
    unit: ''
  },

  {effect: 'marvin',
    filter: 'invert',
    unit: '%'
  },

  {effect: 'phobos',
    filter: 'blur',
    unit: 'px'
  },

  {effect: 'heat',
    filter: 'brightness',
    unit: ''
  },
];

const effectSlider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectSliderInput = document.querySelector('.effect-level__value');
const radioButtons = document.querySelectorAll('.effects__radio');
const picturePreview = document.querySelector('.img-upload__preview img');
let effectSliderValue;

sliderContainer.classList.add('hidden');

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

//Поиск выбранной радио-кнопки и эффекта

const getFilter = () => {
  let radioInputvalue;

  for (let i = 0; i <= radioButtons.length - 1; i++) {
    if (radioButtons[i].checked) {
      radioInputvalue = radioButtons[i].value;
    }
  }

  for (let i = 0; i <= filters.length - 1; i++) {
    if (radioInputvalue === filters[i].effect) {
      picturePreview.style.filter = `${filters[i].filter}(${effectSliderValue}${filters[i].unit})`;
    }
  }
};

//Обработчик слайдера

effectSlider.noUiSlider.on('update', () => {
  effectSliderValue = effectSlider.noUiSlider.get();
  effectSliderInput.value = effectSlider.noUiSlider.get();
  getFilter();
});

//Обработчики кликов по эффектам
export const onEffectNoneButtonClick = () => {
  sliderContainer.classList.add('hidden');
  picturePreview.style.filter = '';
};

const onEffectClick = () => {
  sliderContainer.classList.remove('hidden');
  effectSlider.noUiSlider.set(effectSliderValue);
  getFilter();
};

export const onEffectChromeButtonClick = () => {
  effectSlider.noUiSlider.updateOptions ({
    range: {
      min: 0,
      max: 1
    },
    start: 1
  });
  onEffectClick();
};

export const onEffectSepiaButtonClick = () => {
  effectSlider.noUiSlider.updateOptions ({
    range: {
      min: 0,
      max: 1
    },
    start: 1
  });
  onEffectClick();
};

export const onEffectMarvinButtonClick = () => {
  effectSlider.noUiSlider.updateOptions ({
    range: {
      min: 1,
      max: 100
    },
    start: 100,
    step: 1
  });
  onEffectClick();
};

export const onEffectPhobosButtonClick = () => {
  effectSlider.noUiSlider.updateOptions ({
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  });
  onEffectClick();
};

export const onEffectHeatButtonClick = () => {
  effectSlider.noUiSlider.updateOptions ({
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1
  });
  onEffectClick();
};
