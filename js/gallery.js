import { renderThumbnails } from './thumbnails';
import { openBigPictureModal } from './big-picture-modal';

export const renderGallery = (pictures) => {
  const thumbnailsContainer = document.querySelector('.pictures');

  thumbnailsContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const thumbnailId = +thumbnail.dataset.thumbnailId;
    const pictureData = pictures.find(({ id }) => id === thumbnailId);

    openBigPictureModal(pictureData);
  });
  renderThumbnails(pictures, thumbnailsContainer);
};
