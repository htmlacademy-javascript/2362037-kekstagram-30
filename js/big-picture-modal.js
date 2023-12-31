import {isEscapeKey} from './utils.js';

const SHOWN_COMMENTS_STEP = 5;

const bigPictureModal = document.querySelector('.big-picture');
const bigPictureModalClose = document.querySelector('.big-picture__cancel');
const commentList = bigPictureModal.querySelector('.social__comments');
const commentsLoaderButton = bigPictureModal.querySelector('.social__comments-loader');
let commentsShownCount = 0;
let comments = [];

// Закрытие модального окна
const closeBigPictureModal = () => {
  bigPictureModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  commentsShownCount = 0;
  bigPictureModal.querySelector('.comments-loader').classList.remove('hidden');
  bigPictureModalClose.removeEventListener('click', onBigPictureModalCloseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onBigPictureModalCloseClick () {
  closeBigPictureModal();
}

// Закрытие по Esc
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureModal();
  }
}

// Отрисовка картинки
const renderBigPicture = (pictureData) => {
  bigPictureModal.querySelector('.big-picture__img img').src = pictureData.url;
  bigPictureModal.querySelector('.big-picture__img img').alt = pictureData.description;
  bigPictureModal.querySelector('.social__caption').textContent = pictureData.description;
  bigPictureModal.querySelector('.likes-count').textContent = pictureData.likes;
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
    commentsLoaderButton.removeEventListener('click', onCommentsLoaderButtonClick);
    commentsShownCount = comments.length;
  }

  bigPictureModal.querySelector('.social__comment-shown-count').textContent = commentsShownCount;
  bigPictureModal.querySelector('.social__comment-total-count').textContent = comments.length;

  createComments();
};

// Загрузка новых комментариев после нажатия кнопки
function onCommentsLoaderButtonClick () {
  renderComments();
}

// Открытие модального окна
export const openBigPictureModal = (pictureData) => {
  document.querySelector('body').classList.add('modal-open');
  bigPictureModal.classList.remove('hidden');
  commentList.innerHTML = '';
  document.addEventListener('keydown', onDocumentKeydown);

  renderBigPicture(pictureData);

  comments = pictureData.comments;

  renderComments();

  commentsLoaderButton.addEventListener ('click', onCommentsLoaderButtonClick);

  // Обработчик на кнопку закрытия
  bigPictureModalClose.addEventListener('click', onBigPictureModalCloseClick);
};

