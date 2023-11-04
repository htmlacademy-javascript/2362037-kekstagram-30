import {userImagesArray} from './data.js';

export const thumbnailsContainer = document.querySelector('.pictures');
const newthumbnailTemplate = document.querySelector('#picture').content;

userImagesArray.forEach(({url, description, comments, likes}) => {
  const newthumbnail = newthumbnailTemplate.querySelector('.picture').cloneNode(true);
  newthumbnail.querySelector('.picture__img').src = url;
  newthumbnail.querySelector('.picture__img').alt = description;
  newthumbnail.querySelector('.picture__comments').textContent = comments.length;
  newthumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnailsContainer.append(newthumbnail);
});
