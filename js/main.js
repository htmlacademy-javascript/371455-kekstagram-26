
import './util.js';
import './data.js';
import {createPostGroup, createComment} from './data.js';
import {createPictureElement} from './pictures.js';
import {createCommentList, openBigPicture} from './big-picture.js';


const postGroup = createPostGroup();
// console.log(postGroup);
createPictureElement(postGroup);
createCommentList(createComment);
openBigPicture(postGroup);
