
import './util.js';
import './data.js';
import {createPostGroup} from './data.js';
import {createUserPostsMini} from './mini-pic.js';
import './resize.js';


const postGroup = createPostGroup();
// console.log(postGroup);
createUserPostsMini(postGroup);
