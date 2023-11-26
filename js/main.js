import { getData } from './server.js';
import { renderGallery } from './gallery.js';
import { getErrorMessage } from './message.js';
import { showFilters } from './filters.js';
import { renderFilterPictures, getRandomPictures, getDiscussedPictures, getDefaultPictures } from './filters.js';
import { debounce } from './utils.js';

import './thumbnails.js';
import './big-picture-modal.js';

import './picture-upload-modal.js';
import './form-validation.js';
import './scale-picture.js';
import './picture-effects.js';
import './picture-upload.js';

const FILTER_DELAY = 500;

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

getData()
  .then((pictures) => {
    renderGallery(pictures);
    showFilters();
    renderFilterPictures(
      filterRandom,
      debounce(() => getRandomPictures(pictures.slice()), FILTER_DELAY)
    );
    renderFilterPictures(
      filterDiscussed,
      debounce(() => getDiscussedPictures(pictures.slice()), FILTER_DELAY)
    );
    renderFilterPictures(
      filterDefault,
      debounce(() => getDefaultPictures(pictures), FILTER_DELAY)
    );
  })
  .catch(() => {
    getErrorMessage();
  });

