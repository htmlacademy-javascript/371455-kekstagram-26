import {isEscapeKey} from './util.js';

const cancelButton= document.querySelector('#upload-cancel');

const overlay = function (cls) {
  const ovrl = document.querySelector(cls);

  return {
    open() {
      ovrl.classList.remove('hidden');
    },
    close() {
      ovrl.classList.add('hidden');
    },
  };
}('.img-upload__overlay'); //не работает как стрелочная


cancelButton.addEventListener('click', () => {
  overlay.close();
});

const onOverlayEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    overlay.close();
  }
};

document.addEventListener('keydown', (onOverlayEscKeydown) => {
  overlay.close();
});

export {overlay};
