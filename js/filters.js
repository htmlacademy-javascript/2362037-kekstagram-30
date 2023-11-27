import { getRandomInt } from './utils.js';
import { renderGallery } from './gallery.js';
import { debounce } from './utils.js';

const RANDOM_PICTURE_MAX = 10;
const FILTER_DELAY = 500;

const filters = document.querySelector('.img-filters');
const filterDefault = filters.querySelector('#filter-default');
const filterRandom = filters.querySelector('#filter-random');
const filterDiscussed = filters.querySelector('#filter-discussed');
const newPictures = [];

export const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

// Общая функция
export const renderFilterPictures = (filter, callback) => {
  filter.addEventListener('click', callback);
};

//Обработник клика на фильтр
const onfilterClick = (filter) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');

  if (!filter.matches('.img-filters__button--active')) {
    filter.classList.add('img-filters__button--active');
  }

  const elements = document.querySelectorAll('.picture');
  for (let i = 0; i <= elements.length - 1; i++) {
    document.querySelector('.pictures').removeChild(elements[i]);
  }
};

// Геренрация случайных фото (callback)
export const getRandomPictures = (pictures) => {
  onfilterClick(filterRandom);

  while (newPictures.length < RANDOM_PICTURE_MAX) {
    const element = pictures[getRandomInt(0, 24)];

    if (!newPictures.includes(element)) {
      newPictures.push(element);
    }
  }

  debounce(renderGallery(newPictures), FILTER_DELAY);
};

// Сортировка по популярности
const compareCommentsLength = (pictureA, pictureB) => {
  const commentsLengthA = pictureA.comments.length;
  const commentsLengthB = pictureB.comments.length;

  return commentsLengthB - commentsLengthA;
};

// callback
export const getDiscussedPictures = (pictures) => {
  onfilterClick(filterDiscussed);

  pictures.sort(compareCommentsLength);

  debounce(renderGallery(pictures), FILTER_DELAY);
};

// По умолчанию (callback)

export const getDefaultPictures = (pictures) => {
  onfilterClick(filterDefault);
  debounce(renderGallery(pictures), FILTER_DELAY);
};
