import { getData } from './server.js';
import { renderGallery } from './gallery.js';
import { getErrorMessage } from './message.js';
import { showFilters } from './filters.js';
import { renderFilterPictures } from './filters.js';

import './picture-upload-modal.js';
import './form-validation.js';
import './scale-picture.js';
import './picture-effects.js';
import './picture-upload.js';

getData()
  .then((pictures) => {
    renderGallery(pictures);
    showFilters();
    renderFilterPictures(pictures);
  })
  .catch(() => {
    getErrorMessage();
  });

