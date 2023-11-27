import { getData } from './server.js';
import { renderGallery } from './gallery.js';
import { getErrorMessage } from './message.js';
import { showFilters } from './filters.js';
import { renderFilterPictures, getRandomPictures, getDiscussedPictures, getDefaultPictures } from './filters.js';

import './thumbnails.js';
import './big-picture-modal.js';

import './picture-upload-modal.js';
import './form-validation.js';
import './scale-picture.js';
import './picture-effects.js';
import './picture-upload.js';

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

getData()
  .then((pictures) => {
    renderGallery(pictures);
    showFilters();
    renderFilterPictures(filterRandom, () => getRandomPictures(pictures.slice()));
    renderFilterPictures(filterDiscussed, () => getDiscussedPictures(pictures.slice()));
    renderFilterPictures(filterDefault, () => getDefaultPictures(pictures));
  })
  .catch(() => {
    getErrorMessage();
  });

