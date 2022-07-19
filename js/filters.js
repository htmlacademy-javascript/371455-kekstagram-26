import { getRandomPositiveInteger, debounce } from './util.js';
import { createPictureElement } from './pictures.js';
import { RANDOM_PHOTO_NUMBER,
  DEBOUNCE_DELAY } from './constants.js';


const imgFilters = document.querySelector('.img-filters');
const filterButtons = imgFilters.querySelectorAll('.img-filters__button');
const activeButton = imgFilters.querySelector('.img-filters__button--active');


// Удаляем фото

const removePosts = () => {
  const picture = document.querySelectorAll('.picture');
  picture.forEach((post) => post.remove());
};

// для случайных фото

const shufflePosts = (post) => {
  const newPostsArray = [];

  while (newPostsArray.length <= RANDOM_PHOTO_NUMBER) {
    const temp = post.slice().splice(getRandomPositiveInteger(0, post.slice().length - 1), 1);
    newPostsArray.push(temp[0]);
  }
  return newPostsArray;
};

const getRandomPosts = (posts) => shufflePosts(posts).slice(0, RANDOM_PHOTO_NUMBER);


// для фильтра обсуждаемых

const compareByLenght = (firstPost, secondPost) =>
  secondPost.comments.length - firstPost.comments.length;

const sortByComments = (posts) => posts.slice().sort(compareByLenght);


// Кнопки фильтров

const addingFilterButtons = (posts) => {
  imgFilters.classList.remove('img-filters--inactive');

  const onFilterButtonClick = (evt) => {
    activeButton.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');

    switch(evt.target.id) {
      // По умолчанию
      case 'filter-default':
        debounce(() => {
          removePosts();
          createPictureElement(posts);
        }, DEBOUNCE_DELAY)();
        break;

      // Случайные
      case 'filter-random':
        debounce(() => {
          removePosts();
          createPictureElement(getRandomPosts(posts));
        }, DEBOUNCE_DELAY)();
        break;

      // Обсуждаемые
      case 'filter-discussed':
        debounce(() => {
          removePosts();
          createPictureElement(sortByComments(posts));
        }, DEBOUNCE_DELAY)();
        break;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', onFilterButtonClick);
  });
};

export { addingFilterButtons };
