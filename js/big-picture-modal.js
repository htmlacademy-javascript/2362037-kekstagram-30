import {isEscapeKey} from './util.js';

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureModalClose = document.querySelector('.big-picture__cancel');
const commentList = bigPictureModal.querySelector('.social__comments');

// Закрытие модельного окна
const closeBigPictureModal = () => {
  bigPictureModal.classList.add('hidden');
  commentList.innerHTML = '';
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

const onBigPictureModalCloseClick = () => {
  closeBigPictureModal();
};

// Закрытие по Esc
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureModal();
  }
}

// Отрисовка картинки
const renderBigPicture = (imageData) => {
  bigPictureModal.querySelector('.big-picture__img img').src = imageData.url;
  bigPictureModal.querySelector('.big-picture__img img').alt = imageData.description;
  bigPictureModal.querySelector('.social__caption').textContent = imageData.description;
  bigPictureModal.querySelector('.likes-count').textContent = imageData.likes;
  bigPictureModal.querySelector('.social__comment-total-count').textContent = imageData.comments.length;
};

// Отрисовка комментариев
const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  bigPictureModal.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureModal.querySelector('.comments-loader').classList.add('hidden');

  for (let i = 0; i <= comments.length - 1; i++) {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');

    const commentAvatar = document.createElement('img');
    commentAvatar.classList.add('social__picture');
    commentAvatar.src = comments[i].avatar;
    commentAvatar.alt = comments[i].name;
    commentAvatar.width = '35';
    commentAvatar.height = '35';
    newComment.append(commentAvatar);

    const commentText = document.createElement('p');
    commentText.textContent = comments[i].message;
    newComment.append(commentText);

    fragment.append(newComment);
  }

  commentList.append(fragment);
};

// Открытие модельного окна
export const openBigPictureModal = (imageData) => {
  document.querySelector('body').classList.add('modal-open');
  bigPictureModal.classList.remove('hidden');
  commentList.innerHTML = '';
  document.addEventListener('keydown', onDocumentKeydown);

  renderBigPicture(imageData);
  renderComments(imageData.comments);
};

// Обработчик на кнопку закрытия
bigPictureModalClose.addEventListener('click', onBigPictureModalCloseClick);
