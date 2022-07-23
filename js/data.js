// модуль, который создаёт данные

const state = {
  posts: [],
};

const setPosts = (posts) => {
  state.posts = posts;
};

export { state, setPosts };
