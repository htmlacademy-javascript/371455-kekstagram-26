import { getData } from './api.js';
import { createPictureElement } from './pictures.js';
import { activateFilters } from './filters.js';
import { showAlertMessage } from './alert.js';
import './validation.js';
import './upload-image.js';
import './scale-picture.js';
import './effects.js';
import { setPosts } from './data.js';
import { setUserFormSubmit } from './form.js';


getData((posts) => {
  createPictureElement(posts);
  setPosts(posts);
  activateFilters(posts);
}, showAlertMessage);

setUserFormSubmit();
