import { images } from './data.js';

const thumbnailTemplate = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();

images.forEach(({url, description, comments, likes, id}) => {
  const thumbnail = thumbnailTemplate.querySelector('.picture').cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;
  fragment.append(thumbnail);
});

export const renderThumbnails = (container) => {
  container.append(fragment);
};
