import {createPost} from './data.js';
import './pictures.js';
import { isEscapeKey } from './util.js';
// import {postGroup} from './main.js';


const body = document.querySelector('body');
// const smallPicture = document.querySelector('.picture');
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


const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Добавляем комментарии

const createCommentList = (comments) => {
  const commentFragment = document.createDocumentFragment();

  comments.forEach(({comment}) => {
    const newCommentElement = commentElement.cloneNode(true);
    const photoElement = newCommentElement.querySelector('.social__picture');
    const textElement = newCommentElement.querySelector('.social__text');

    photoElement.src = comment.avatar;
    photoElement.alt = comment.name;
    textElement.textContent = comment.message;

    commentFragment.append(newCommentElement);
  });

  commentsListElement.innerHTML = '';
  commentsListElement.append(commentFragment);
};

// createCommentList(createComment);

// Заполняем данными большую картинку
const updateBigPicture = (post) => {
  imgElement.src = post.url;
  descriptionElement.textContent = post.description;
  likesCountElement.textContent = post.likes;
  commentCountElement.textContent = post.comments.length;

  createCommentList(post.comments);
};


//Открываем полноразмерную картинку
function openBigPicture (index, post) {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  commentCountDivElement.classList.add('hidden');
  newCommentLoaderElement.classList.add('hidden');

  document.addEventListener('keydown', onBigPictureEscKeydown);
  updateBigPicture(post);
}

function closeBigPicture () {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');

  document.addEventListener('keydown', onBigPictureEscKeydown);
}

closeElementButton.addEventListener('click', () => {
  closeBigPicture ();
});

export {createCommentList,
  updateBigPicture,
  openBigPicture,
  closeBigPicture
};
