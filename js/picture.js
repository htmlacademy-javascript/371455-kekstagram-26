const userPosts = (posts) => {
  const userPictures = document.querySelector('.pictures');

  const picturesFragment = document.querySelector('#picture').content; // Находим фрагмент с содержимым темплейта

  const userPicturesTemplate = picturesFragment.querySelector('.picture'); // В фрагменте находим нужный элемент

  const userPicturesFragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const pictureElement = userPicturesTemplate.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');
    imgElement.src = post.url;
    const likesElement = pictureElement.querySelector('.picture__likes');
    likesElement.textContent = post.likes;
    const commentElement = pictureElement.querySelector('.picture__comments');
    commentElement.textContent = post.comments.length;
    userPicturesFragment.append(pictureElement);
  });

  userPictures.append(userPicturesFragment);
};

export {userPosts};
