import { getData } from './server.js';
import { renderGallery } from './gallery.js';
import { getErrorMessage } from './message.js';

import './thumbnails.js';
import './big-picture-modal.js';

import './picture-upload-modal.js';
import './form-validation.js';
import './scale-picture.js';
import './picture-effects.js';

getData()
  .then((pictures) => {
    renderGallery(pictures);
  })
  .catch(() => {
    getErrorMessage();
  });

