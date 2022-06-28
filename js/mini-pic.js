const createUserPostsMini = (posts) => {
  const userPictures = document.querySelector('.pictures');

  const userPicturesTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const userPicturesFragment = document.createDocumentFragment();

  posts.forEach(({url, likes, comments}) => {
    const pictureElement = userPicturesTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    userPicturesFragment.append(pictureElement);
  });

  userPictures.append(userPicturesFragment);
};

export {createUserPostsMini};
