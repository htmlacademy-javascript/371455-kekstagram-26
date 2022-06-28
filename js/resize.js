import './mini-pic.js';
import { isEscapeKey } from './util.js';


const body = document.querySelector('body');
const smallPicture = document.querySelector('.picture');
const bigPictureContainer = document.querySelector('.big-picture');
const pictureCloseElement = bigPictureContainer.querySelector('.big-picture__cancel');

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture () {
  bigPictureContainer.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPictureEscKeydown);
}

function closeBigPicture () {
  bigPictureContainer.classList.add('hidden');
  body.classList.remove('modal-open');

  document.addEventListener('keydown', onBigPictureEscKeydown);
}

smallPicture.addEventListener('click', () => {
  openBigPicture();
});

pictureCloseElement.addEventListener('click', () => {
  closeBigPicture ();
});

