import './pictures.js';
import { isEscapeKey } from './util.js';
import { commentsModel } from './comments-model.js';

const body = document.querySelector('body');
const bigPictureContainer = document.querySelector('.big-picture');
const closeElementButton = bigPictureContainer.querySelector('.big-picture__cancel');
const imgElement = bigPictureContainer.querySelector('.big-picture__img img');
const likesCountElement = bigPictureContainer.querySelector('.likes-count');
const descriptionElement = bigPictureContainer.querySelector('.social__caption');
const commentsListElement = bigPictureContainer.querySelector('.social__comments');
const commentElement = commentsListElement.querySelector('.social__comment');
const commentCountDivElement = bigPictureContainer.querySelector('.social__comment-count');
const commentCountElement = bigPictureContainer.querySelector('.comments-count');
const newCommentLoaderElement = bigPictureContainer.querySelector('.comments-loader');

// кнопка загрузки дополнительных комментариев открыта
const showCommentsMoreButton = () => {
  newCommentLoaderElement.classList.remove('hidden');
};

// кнопка загрузки дополнительных комментариев закрывается
const hideCommentsMoreButton = () => {
  newCommentLoaderElement.classList.add('hidden');
};

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Добавляем комментарии
const renderCommentList = (comments) => {
  const commentFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const newCommentElement = commentElement.cloneNode(true);
    const photoElement = newCommentElement.querySelector('.social__picture');
    const textElement = newCommentElement.querySelector('.social__text');

    photoElement.src = comment.avatar;
    photoElement.alt = comment.name;
    textElement.textContent = comment.message;

    commentFragment.append(newCommentElement);
  });
  commentsListElement.append(commentFragment);
};

const clearCommentsList = () => {
  commentsListElement.innerHTML = '';
};

const renderStats = (visible, total) => {
  commentCountDivElement.classList.remove('hidden');
  commentCountDivElement.textContent = `${visible} из ${total} комментариев`;
};

const renderLoadButton = (visible, total) => {
  if (visible === total) {
    hideCommentsMoreButton();
  } else {
    showCommentsMoreButton();
  }
};

// Заполняем данными большую картинку
const updateBigPicture = (post) => {
  imgElement.src = post.url;
  descriptionElement.textContent = post.description;
  likesCountElement.textContent = post.likes;
  commentCountElement.textContent = post.comments.length;
};

const onLoadButtonClickHandler = () => {
  commentsModel.setNextDose();
  renderStats(commentsModel.getVisible(), commentsModel.getTotal());
  renderCommentList(commentsModel.getCommentDose());
  renderLoadButton(commentsModel.getVisible(), commentsModel.getTotal());
};

//Открываем полноразмерную картинку
const openBigPicture = (post) => {
  commentsModel.setStart(post.comments);
  renderStats(commentsModel.getVisible(), commentsModel.getTotal());
  clearCommentsList();
  renderCommentList(commentsModel.getCommentDose());
  renderLoadButton(commentsModel.getVisible(), commentsModel.getTotal());
  newCommentLoaderElement.addEventListener('click', onLoadButtonClickHandler);

  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPictureEscKeydown);
  updateBigPicture(post);
};

function closeBigPicture () {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');
  newCommentLoaderElement.removeEventListener('click', onLoadButtonClickHandler);
  document.addEventListener('keydown', onBigPictureEscKeydown);
}

closeElementButton.addEventListener('click', () => {
  closeBigPicture ();
});

export { body, openBigPicture, closeBigPicture };
