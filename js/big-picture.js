import './pictures.js';
import { isEscapeKey } from './util.js';
import {postGroup} from './data.js';

/* Каждый объект с описанием фотографии содержит массив с комментариями.
Данные из этого массива мы вывели в соответствующую область окна полноразмерного просмотра.
Все бы хорошо, но для популярных фотографий комментариев может быть много.
Если вывести их разом, то пользователю будет неудобно взаимодействовать с окном просмотра.
Улучшить пользовательский интерфейс поможет кнопка «Загрузить ещё».

Покажите блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader,
убрав у них класс hidden.

В модуле, который отвечает за отрисовку окна с полноразмерным изображением, доработайте код по выводу списка
комментариев таким образом, чтобы список показывался не полностью, а по 5 элементов, и следующие 5 элементов добавлялись
бы по нажатию на кнопку «Загрузить ещё». Не забудьте реализовать обновление числа показанных комментариев в блоке .social__comment-count.

Обратите внимание, хотя кнопка называется «Загрузить ещё», никакой загрузки с сервера не происходит.
Просто показываются следующие 5 комментариев из списка. */


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


const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Добавляем комментарии

const createCommentList = (comments) => {
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

  commentsListElement.innerHTML = '';
  commentsListElement.append(commentFragment);
};

// Заполняем данными большую картинку
const updateBigPicture = (post) => {
  imgElement.src = post.url;
  descriptionElement.textContent = post.description;
  likesCountElement.textContent = post.likes;
  commentCountElement.textContent = post.comments.length;

  createCommentList(post.comments);
};


//Открываем полноразмерную картинку
function openBigPicture (index) {
  const currentPost = postGroup[index];

  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');
  commentCountDivElement.classList.add('hidden');
  newCommentLoaderElement.classList.add('hidden');

  document.addEventListener('keydown', onBigPictureEscKeydown);
  updateBigPicture(currentPost);
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
