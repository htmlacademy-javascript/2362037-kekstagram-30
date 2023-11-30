import { getRandomInt } from './utils.js';
import { renderThumbnails } from './thumbnails.js';
import { debounce } from './utils.js';

const RANDOM_PICTURE_MAX = 10;
const FILTER_DELAY = 500;

const filters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const thumbnailsContainer = document.querySelector('.pictures');

export const showFilters = () => {
  filters.classList.remove('img-filters--inactive');
};

//Обработник клика на фильтр
const onfilterClick = (filter) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  filter.classList.add('img-filters__button--active');

  const elements = document.querySelectorAll('.picture');
  for (let i = 0; i <= elements.length - 1; i++) {
    document.querySelector('.pictures').removeChild(elements[i]);
  }
};

// Геренрация случайных фото (callback)
export const getRandomPictures = (pictures) => {
  onfilterClick(filterRandom);
  const newPictures = [];

  while (newPictures.length < RANDOM_PICTURE_MAX) {
    const element = pictures[getRandomInt(0, 24)];

    if (!newPictures.includes(element)) {
      newPictures.push(element);
    }
  }

  debounce(renderThumbnails(newPictures, thumbnailsContainer), FILTER_DELAY);
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

  debounce(renderThumbnails(pictures, thumbnailsContainer), FILTER_DELAY);
};

// По умолчанию (callback)

export const getDefaultPictures = (pictures) => {
  onfilterClick(filterDefault);
  debounce(renderThumbnails(pictures, thumbnailsContainer), FILTER_DELAY);
};

// Общая функция
export const renderFilterPictures = (pictures) => {
  filterDefault.addEventListener('click', () => getDefaultPictures(pictures));
  filterRandom.addEventListener('click', () => getRandomPictures(pictures.slice()));
  filterDiscussed.addEventListener('click', () => getDiscussedPictures(pictures.slice()));
};
