
<<<<<<< Updated upstream
import './util.js';
import './data.js';
import {postGroup} from './data.js';
import {createPictureElement} from './pictures.js';
=======
import { getData } from './api.js';
import { createPictureElement } from './pictures.js';
import { activateFilters } from './filters.js';
import { showAlertMessage } from './alert.js';
>>>>>>> Stashed changes
import './validation.js';
import './upload-image.js';
import './overlay.js';
import './scale-picture.js';
<<<<<<< Updated upstream
import './filter.js';
// import './api.js';

=======
import './effects.js';
// import './form.js';


getData((posts) => {
  createPictureElement(posts);
  setTimeout(() => activateFilters(posts), 500);
}, showAlertMessage);
>>>>>>> Stashed changes

