
import './util.js';
import './data.js';
import {createPostGroup} from './data.js';
import { userPosts } from './picture.js';


const postGroup = createPostGroup();
userPosts(postGroup);
