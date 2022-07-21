import { openBigPicture } from './big-picture.js';

const removeAllPictures = () => {
  const pictures = document.querySelectorAll('.picture');
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].remove();
  }
};

removeAllPictures();

const createPictureElement = (posts) => {
  const userPictures = document.querySelector('.pictures');

  const userPicturesTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const userPicturesFragment = document.createDocumentFragment();

  posts.forEach(({url, likes, comments}, index) => {
    const pictureElement = userPicturesTemplate.cloneNode(true);
    pictureElement.addEventListener('click', () => openBigPicture(posts[index]));
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    userPicturesFragment.append(pictureElement);

    // pictureElement.addEventListener('click', () => {
    //   openBigPicture(index);
    // });
  });

  removeAllPictures();

  userPictures.append(userPicturesFragment);
};

export { createPictureElement };
