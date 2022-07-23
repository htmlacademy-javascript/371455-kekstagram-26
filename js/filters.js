import { getRandomArrayElement, debounce } from './util.js';
import { createPictureElement } from './pictures.js';
import { TIME_OUT_DELAY } from './util.js';

const RANDOM_PHOTO_NUMBER = 10;
const imgFilters = document.querySelector('.img-filters');
const randomFilter = imgFilters.querySelector('#filter-random');
const discussedFilter = imgFilters.querySelector('#filter-discussed');
const defaultFilter = imgFilters.querySelector('#filter-default');

// Удаляем фото
const removePosts = () => {
  const picture = document.querySelectorAll('.picture');
  picture.forEach((post) => post.remove());
};

// для случайных фото
const getRandomPosts = (posts) => {
  const randomPosts = [];

  for (let i = 0; i < RANDOM_PHOTO_NUMBER; i++) {
    let random = getRandomArrayElement(posts);

    if (randomPosts.includes(random)) {
      random = getRandomArrayElement(posts);
    }

    randomPosts.push(random);
  }
  return randomPosts;
};

// для фильтра обсуждаемых
const getDiscussedPosts = (posts) => {
  const compareCommentLengths = (firstPost, secondPost) => (secondPost.comments.length - firstPost.comments.length);
  const popularPosts = posts.slice().sort(compareCommentLengths);

  return popularPosts;
};

const removeActiveClass = () => {
  randomFilter.classList.remove('img-filters__button--active');
  discussedFilter.classList.remove('img-filters__button--active');
  defaultFilter.classList.remove('img-filters__button--active');
};

const activateFilters = (posts) => {
  imgFilters.classList.remove('img-filters--inactive');

  randomFilter.addEventListener('click', debounce(() => {
    removePosts();
    removeActiveClass();
    randomFilter.classList.add('img-filters__button--active');
    const randomPost = getRandomPosts(posts);
    createPictureElement(randomPost);
  }, TIME_OUT_DELAY));

  discussedFilter.addEventListener('click', debounce(() => {
    removePosts();
    removeActiveClass();
    discussedFilter.classList.add('img-filters__button--active');

    const discussedPosts = getDiscussedPosts(posts);

    createPictureElement(discussedPosts);
  }, TIME_OUT_DELAY));

  defaultFilter.addEventListener('click', debounce(() => {
    removePosts();
    removeActiveClass();
    defaultFilter.classList.add('img-filters__button--active');

    createPictureElement(posts);
  }, TIME_OUT_DELAY));
};

export { activateFilters, removeActiveClass };
