import Api from "@/services/api";

export default {
  state: {
    users: [],
    currentUser: {}
    // currentUser: null
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    MARK_POST_READ(state, postId) {
      state.currentUser.readPostIds = state.currentUser.readPostIds.concat(
        postId
      );
      // let readPosts = state.readPosts.concat(postId);
      // state.readPosts = readPosts;
      // window.localStorage.readPosts = JSON.stringify(readPosts);
    },
    SET_READ_POSTS(state, readPosts) {
      state.currentUser.readPostIds = readPosts;
      // state.readPosts = readPosts;
    },
    LOGOUT_USER(state) {
      state.currentUser = {};
      window.localStorage.currentUser = JSON.stringify({});
      // state.currentUser = null;
      // localStorage.removeItem("currentUser");
      //// or
      // localStorage.removeItem("currentUser");
      // location.reload;
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
      window.localStorage.currentUser = JSON.stringify(user);
      // state.currentUser = user;
      // localStorage.setItem("currentUser", JSON.stringify(user));
    }
  },
  actions: {
    async markRead({ commit, state }, postId) {
      if (this.state.currentUser.id) {
        try {
          await Api().patch(`users/addReadPost/${state.currentUser.id}`, {
            readPostIds: postId
          });
          commit("MARK_POST_READ", postId);
        } catch (err) {
          console.log(err.response.data.error);
        }
      }
    },
    async loadUsers({ commit }) {
      let response = await Api().get("users");
      console.log(response);
      let users = response.data.data;
      commit(
        "SET_USERS",
        users.map(u => u.attributes)
      );
    },
    async loadCurrentUser({ commit }) {
      let user = JSON.parse(window.localStorage.currentUser);
      commit("SET_CURRENT_USER", user);

      const response = await Api().get(`users/${user.id}`);
      user = response.data.data.attributes;
      commit("SET_READ_POSTS", user.readPostIds);
    },
    logoutUser({ commit }) {
      commit("LOGOUT_USER");
    },
    async loginUser({ commit }, { email, password }) {
      commit("CLEAR_ERROR");
      try {
        let response = await Api().post("login", {
          email,
          password
        });
        let user = response.data.data.attributes;
        commit("SET_CURRENT_USER", user);
        return user;
      } catch (err) {
        let error = err.response.data.errors;
        error = error.email ? error.email : error.password;
        commit("SET_ERROR", error);
        return { error: error };
      }
    },
    async registerUser({ commit }, { userName, email, password }) {
      try {
        let response = await Api().post("signup", {
          userName,
          email,
          password
        });
        let user = response.data.data.attributes;
        commit("SET_CURRENT_USER", user);
        return user;
      } catch (err) {
        let error = err.response.data.errors;
        error = error.email
          ? error.email
          : error.password
          ? error.password
          : error.userName;
        commit("SET_ERROR", error);
        return { error: error };
      }
    }
    // loginUser({ commit }, user) {
    //   commit("SET_CURRENT_USER", user);
    // }
  },
  getters: {
    // loggedIn(state) {
    //   return !!state.user;
    // }
  }
};
