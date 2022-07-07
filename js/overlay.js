import {isEscapeKey} from './util.js';

const cancelButton= document.querySelector('#upload-cancel');
const overlay = document.querySelector('.img-upload__overlay');

const overlayOpen = () => {
  overlay.classList.remove('hidden');
};

const overlayClose = () => {
  overlay.classList.add('hidden');
};

cancelButton.addEventListener('click', () => {
  overlayClose();
});

const onOverlayEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    overlayClose();
  }
};

document.addEventListener('keydown', onOverlayEscKeydown);

export {overlayClose,
  overlayOpen};
