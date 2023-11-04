import { renderThumbnails } from './thumbnails';
import { openBigPictureModal } from './big-picture-modal';

const thumbnailsContainer = document.querySelector('.pictures');

export const renderGallery = (images) => {
  renderThumbnails(thumbnailsContainer);

  thumbnailsContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const thumbnailId = +thumbnail.dataset.thumbnailId;
    const imageData = images.find(({ id }) => id === thumbnailId);

    openBigPictureModal(imageData);
  });
};
