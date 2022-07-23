const COMMENTS_LIMIT = 5;

const Model = {
  comments: [],
  commentsVisible: 0,
  commentsTotal: 0,
  lastCommentVisible: 0,
};

const setStart = (comments) => {
  Model.comments = comments;
  Model.commentsVisible = (comments.length - COMMENTS_LIMIT >= 0) ? COMMENTS_LIMIT : comments.length;
  Model.commentsTotal = comments.length;
  Model.lastCommentVisible = 0;
};

const setNextDose = () => {
  if (Model.commentsVisible + COMMENTS_LIMIT < Model.commentsTotal) {
    Model.lastCommentVisible = Model.commentsVisible;
    Model.commentsVisible += COMMENTS_LIMIT;
  } else {
    Model.lastCommentVisible = Model.commentsVisible;
    Model.commentsVisible = Model.commentsTotal;
  }
};

const getCommentDose = () => Model.comments.slice(Model.lastCommentVisible, Model.commentsVisible);

const getModel = () => Model;

const getVisible = () => Model.commentsVisible;

const getTotal = () => Model.commentsTotal;

const commentsModel = {
  setStart,
  getModel,
  getVisible,
  getTotal,
  getCommentDose,
  setNextDose
};

export { commentsModel };
