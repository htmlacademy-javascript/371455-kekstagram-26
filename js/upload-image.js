import  {Picture,
  FILE_TYPES } from './constants.js';
import { overlayOpen } from './overlay.js';

const uploadButton = document.querySelector('#upload-file');
const previewImg = document.querySelector('.img-upload__preview img');

uploadButton.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewImg.src = reader.result;
      previewImg.width = Picture.WIDTH;
      previewImg.height = Picture.HEIGHT;

      overlayOpen();
    });

    reader.readAsDataURL(file);
  }
});
