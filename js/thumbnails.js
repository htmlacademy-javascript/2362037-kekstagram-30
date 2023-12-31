const thumbnailTemplate = document.querySelector('#picture').content;
const fragment = document.createDocumentFragment();

export const renderThumbnails = (pictures, container) => {
  pictures.forEach(({url, description, comments, likes, id}) => {
    const thumbnail = thumbnailTemplate.querySelector('.picture').cloneNode(true);
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__img').alt = description;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.dataset.thumbnailId = id;
    fragment.append(thumbnail);
  });
  container.append(fragment);
};
