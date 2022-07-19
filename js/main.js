
import { getData } from './api.js';
import { createPictureElement } from './pictures.js';
import { addingFilterButtons } from './filters.js';

import './util.js';
import {postGroup} from './data.js';

import './validation.js';
import './upload-image.js';
import './constants.js';
import './overlay.js';
import './scale-picture.js';
import './effects.js';

getData((posts) => {
  createPictureElement(posts);
  setTimeout(() => addingFilterButtons(posts), 500);
});

createPictureElement(postGroup);
