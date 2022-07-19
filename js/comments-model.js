import { COMMENTS_LIMIT } from './constants.js';

const model = {
  comments: [],
  commentsVisible: 0,
  commentsTotal: 0,
  lastCommentVisible: 0,
};

const setStart = (comments) => {
  model.comments = comments;
  model.commentsVisible = (comments.length - COMMENTS_LIMIT >= 0) ? COMMENTS_LIMIT : comments.length;
  model.commentsTotal = comments.length;
  model.lastCommentVisible = 0;
};

const setNextDose = () => {
  if (model.commentsVisible + COMMENTS_LIMIT < model.commentsTotal) {
    model.lastCommentVisible = model.commentsVisible;
    model.commentsVisible += COMMENTS_LIMIT;
  } else {
    model.lastCommentVisible = model.commentsVisible;
    model.commentsVisible = model.commentsTotal;
  }
};

const getCommentDose = () => model.comments.slice(model.lastCommentVisible, model.commentsVisible);

const getModel = () => model;

const getVisible = () => model.commentsVisible;

const getTotal = () => model.commentsTotal;

const commentsModel = {
  setStart,
  getModel,
  getVisible,
  getTotal,
  getCommentDose,
  setNextDose
};

export { commentsModel };
