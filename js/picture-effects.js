const effectSlider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectSliderInput = document.querySelector('.effect-level__value');
const radioButtons = document.querySelectorAll('.effects__radio');
const effectNoneButton = document.querySelector('#effect-none');
const effectChromeButton = document.querySelector('#effect-chrome');
const effectSepiaButton = document.querySelector('#effect-sepia');
const effectMarvinButton = document.querySelector('#effect-marvin');
const effectPhobosButton = document.querySelector('#effect-phobos');
const effectHeatButton = document.querySelector('#effect-heat');
const picturePreview = document.querySelector('.img-upload__preview');
let effectSliderValue;

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

effectNoneButton.addEventListener('change', () => {
  sliderContainer.classList.add('hidden');
  picturePreview.style.filter = '';
});

effectChromeButton.addEventListener('change', () => {
  sliderContainer.classList.remove('hidden');
  effectSlider.noUiSlider.updateOptions ({
    range: {
      min: 0,
      max: 1
    },
    start: 1
  });
  effectSlider.noUiSlider.set(effectSliderValue);
  getFilter();
});

effectSepiaButton.addEventListener('change', () => {
  sliderContainer.classList.remove('hidden');
  effectSlider.noUiSlider.updateOptions ({
    range: {
      min: 0,
      max: 1
    },
    start: 1
  });
  effectSlider.noUiSlider.set(effectSliderValue);
  getFilter();
});

effectMarvinButton.addEventListener('change', () => {
  sliderContainer.classList.remove('hidden');
  effectSlider.noUiSlider.updateOptions ({
    range: {
      min: 1,
      max: 100
    },
    start: 100,
    step: 1
  });
  effectSlider.noUiSlider.set(effectSliderValue);
  getFilter();
});

effectPhobosButton.addEventListener('change', () => {
  sliderContainer.classList.remove('hidden');
  effectSlider.noUiSlider.updateOptions ({
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1
  });
  effectSlider.noUiSlider.set(effectSliderValue);
  getFilter();
});

effectHeatButton.addEventListener('change', () => {
  sliderContainer.classList.remove('hidden');
  effectSlider.noUiSlider.updateOptions ({
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1
  });
  effectSlider.noUiSlider.set(effectSliderValue);
  getFilter();
});
