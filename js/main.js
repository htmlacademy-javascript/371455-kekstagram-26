
import { getData } from './api.js';
import { createPictureElement } from './pictures.js';
import { activateFilters } from './filters.js';
import { showAlertMessage } from './alert.js';
import './validation.js';
import './upload-image.js';
import './overlay.js';
import './scale-picture.js';
import './effects.js';
import { setPosts } from './data.js';
// import './form.js';


getData((posts) => {
  createPictureElement(posts);
  setPosts(posts);
  setTimeout(() => activateFilters(posts), 500);
}, showAlertMessage);
