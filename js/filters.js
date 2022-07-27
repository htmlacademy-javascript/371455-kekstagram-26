import { getRandomArrayElement, debounce, TIME_OUT_DELAY } from './utils.js';
import { createPictureElement } from './pictures.js';

const RANDOM_PHOTO_NUMBER = 10;
const imgFilters = document.querySelector('.img-filters');
const randomFilter = imgFilters.querySelector('#filter-random');
const discussedFilter = imgFilters.querySelector('#filter-discussed');
const defaultFilter = imgFilters.querySelector('#filter-default');
const imgFiltersForm = document.querySelector('.img-filters__form');

// Удаляем фото
const removePosts = () => {
  const picture = document.querySelectorAll('.picture');
  picture.forEach((post) => post.remove());
};

// для случайных фото
const getRandomPosts = (posts) => {
  const randomPosts = [];

  for (let i = 0; i < RANDOM_PHOTO_NUMBER; i++) {
    const random = getRandomArrayElement(posts);
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
  const randomPost = getRandomPosts(posts);
  const discussedPosts = getDiscussedPosts(posts);

  imgFiltersForm.addEventListener('click', debounce((evt) => {
    switch (evt.target.id){
      case 'filter-random':
        removePosts();
        removeActiveClass();
        randomFilter.classList.add('img-filters__button--active');
        createPictureElement(randomPost);
        break;
      case 'filter-discussed':
        removePosts();
        removeActiveClass();
        discussedFilter.classList.add('img-filters__button--active');
        createPictureElement(discussedPosts);
        break;
      case 'filter-default':
        removePosts();
        removeActiveClass();
        defaultFilter.classList.add('img-filters__button--active');
        createPictureElement(posts);
        break;
    }
  }, TIME_OUT_DELAY));
};

export { activateFilters, removeActiveClass };

