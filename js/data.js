// модуль, который создаёт данные
import {
  getRandomPositiveInteger,
  getRandomArrayElement } from './util.js';

import {
  MESSAGES,
  NAMES,
  DESCRIPTIONS,
  POST_COUNT,
  COMMENTS_LIMIT} from './constants.js';

//создаем пост пользователя

// создаем комментарий к посту - фотографии пользователя
const createComment = () => ({
  id: getRandomPositiveInteger(0, 10000),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

//создаем обьект - фотографию - пост пользователя
const createPost =  (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from({ length: getRandomPositiveInteger(1, COMMENTS_LIMIT) }, (_, i) =>
    createComment(i))
});

//создаем массив из 25 постов пользователя
const createPostGroup = () => Array.from({length: POST_COUNT}, (_, i) => createPost(i));

const postGroup = createPostGroup();

export {
  postGroup,
  createPost,
  createComment
};
