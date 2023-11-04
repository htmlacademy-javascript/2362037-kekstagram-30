import {isEscapeKey} from './util.js';
import {userImagesArray} from './data.js';

const thumbnails = document.querySelectorAll('.picture__img');
const bigPictureModal = document.querySelector('.big-picture');
const bigPictureModalClose = document.querySelector('.big-picture__cancel');
const bigPictureImgContainer = document.querySelector('.big-picture__img');
const bigPictureImg = bigPictureImgContainer.querySelector('img');
const likesCount = bigPictureModal.querySelector('.likes-count');
const imgDescription = bigPictureModal.querySelector('.social__caption');
const commentsTotal = bigPictureModal.querySelector('.social__comment-total-count');
const commentsCount = bigPictureModal.querySelector('.social__comment-count');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');
const commentList = bigPictureModal.querySelector('.social__comments');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureModal();
  }
};

function openBigPictureModal (thumbnail, userImage) {
  thumbnail.addEventListener('click', function () { //eslint-disable-line
    document.querySelector('body').classList.add('modal-open');
    bigPictureModal.classList.remove('hidden');
    commentList.innerHTML = '';

    bigPictureImg.src = userImage.url;
    imgDescription.textContent = userImage.description;
    likesCount.textContent = userImage.likes;
    commentsTotal.textContent = userImage.comments.length;
    commentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    document.addEventListener('keydown', onDocumentKeydown);

    for (let i = 0; i <= userImage.comments.length - 1; i++) {
      const newComment = document.createElement('li');
      newComment.classList.add('social__comment');

      const commentAvatar = document.createElement('img');
      commentAvatar.classList.add('social__picture');
      commentAvatar.src = userImage.comments[i].avatar;
      commentAvatar.alt = userImage.comments[i].name;
      commentAvatar.width = '35';
      commentAvatar.height = '35';
      newComment.append(commentAvatar);

      const commentText = document.createElement('p');
      commentText.textContent = userImage.comments[i].message;
      newComment.append(commentText);

      commentList.append(newComment);
    }
  });
}

function closeBigPictureModal () {
  bigPictureModal.classList.add('hidden');
  commentList.innerHTML = '';
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureModalClose.addEventListener('click', closeBigPictureModal);

for (let i = 0; i <= thumbnails.length; i++) {
  openBigPictureModal(thumbnails[i], userImagesArray[i]);
}
