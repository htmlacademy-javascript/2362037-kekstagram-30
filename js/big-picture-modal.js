import {isEscapeKey} from './util.js';

const SHOWN_COMMENTS_STEP = 5;
const bigPictureModal = document.querySelector('.big-picture');
const bigPictureModalClose = document.querySelector('.big-picture__cancel');
const commentList = bigPictureModal.querySelector('.social__comments');
const commentsLoaderButton = bigPictureModal.querySelector('.social__comments-loader');
let commentsShownCount = 0;
let comments = [];

// Закрытие модельного окна
const closeBigPictureModal = () => {
  bigPictureModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  commentsShownCount = 0;
  bigPictureModal.querySelector('.comments-loader').classList.remove('hidden');

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
};

// Создание комметариев
const createComments = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i <= commentsShownCount - 1; i++) {
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

// Отрисовка комментариев
const renderComments = () => {
  commentList.innerHTML = '';

  commentsShownCount += SHOWN_COMMENTS_STEP;

  if (commentsShownCount >= comments.length) {
    bigPictureModal.querySelector('.comments-loader').classList.add('hidden');
    commentsShownCount = comments.length;
  }

  bigPictureModal.querySelector('.social__comment-shown-count').textContent = commentsShownCount;
  bigPictureModal.querySelector('.social__comment-total-count').textContent = comments.length;

  createComments();
};

// Загрузка новых комментариев после нажатия кнопки
const onCommentsLoaderButtonClick = () => {
  renderComments();
};

commentsLoaderButton.addEventListener ('click', onCommentsLoaderButtonClick);

// Открытие модального окна
export const openBigPictureModal = (imageData) => {
  document.querySelector('body').classList.add('modal-open');
  bigPictureModal.classList.remove('hidden');
  commentList.innerHTML = '';
  document.addEventListener('keydown', onDocumentKeydown);

  renderBigPicture(imageData);

  comments = imageData.comments;
  renderComments();
};

// Обработчик на кнопку закрытия
bigPictureModalClose.addEventListener('click', onBigPictureModalCloseClick);
