import Vue from "vue";
import Vuex from "vuex";
import Api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  state: {
    posts: [],
    tags: [],
    // readPosts: [],
    users: [],
    currentUser: {},
    // currentUser: null
    error: null,
    snackbars: []
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_TAGS(state, tags) {
      state.tags = tags;
    },
    SET_READ_POSTS(state, readPosts) {
      state.currentUser.readPostIds = readPosts;
      // state.readPosts = readPosts;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
    MARK_POST_READ(state, postId) {
      state.currentUser.readPostIds = state.currentUser.readPostIds.concat(
        postId
      );
      // let readPosts = state.readPosts.concat(postId);
      // state.readPosts = readPosts;
      // window.localStorage.readPosts = JSON.stringify(readPosts);
    },
    ADD_POST(state, post) {
      // let posts = state.posts.concat(post);
      // state.posts = posts;
      state.posts = state.posts.concat(post);
    },
    ADD_TAG(state, { tag }) {
      state.tags = state.tags.concat(tag);
    },
    DELETE_POST(state, postId) {
      state.posts = state.posts.filter(p => p.id !== postId);
    },
    UPDATE_POST(state, post) {
      state.posts.forEach(p => {
        if (p.id === post.id) {
          p = post;
        }
      });
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
    },
    SET_SNACKBAR(state, snackbar) {
      state.snackbars = state.snackbars.concat(snackbar);
    },
    ADD_TAG_FROM_POST(state, { post, tag }) {
      post.tag_ids = post.tag_ids.concat(tag.id);
      tag.post_ids = tag.post_ids.concat(post.id);
    },
    REMOVE_TAG_FROM_POST(state, { post, tag }) {
      post.tag_ids = post.tag_ids.filter(t_id => t_id !== tag.id);
      tag.post_ids = tag.post_ids.filter(p_id => p_id !== post.id);
    },
    UPDATE_TAG_NAME(state, { tag }) {
      let tagToUpdate = state.tags.find(t => t.id === tag.id);
      tagToUpdate.name = tag.name;
    },
    DELETE_TAG(state, { tag }) {
      state.tags = state.tags.filter(t => t.id !== tag.id);
    }
  },
  actions: {
    async loadPosts({ commit }) {
      let response = await Api().get("posts");

      let posts = response.data.data;
      let tags = response.data.included.filter(i => i.type === "tag");

      posts.forEach(p => {
        p.attributes.tag_ids = p.relationships.tags.data.map(t => t.id);
      });
      tags.forEach(t => {
        t.attributes.id = t.id;
        t.attributes.post_ids = t.relationships.posts.data.map(p => p.id);
      });

      commit(
        "SET_POSTS",
        posts.map(p => p.attributes)
      );
      commit(
        "SET_TAGS",
        tags.map(t => t.attributes)
      );
    },
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
    async createPost({ commit }, { postPayload, imagePayload }) {
      try {
        let formData = new FormData();
        formData.append("title", postPayload.title);
        formData.append("snippet", postPayload.snippet);
        formData.append("body", postPayload.body);
        formData.append("creator", postPayload.creator);
        formData.append("imageUrl", imagePayload, imagePayload.name);
        // const response = await Api().post("posts", formData);
        const response = await Api().post("posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        let savedPost = response.data.data.attributes;
        commit("ADD_POST", savedPost);
        // return savedPost;
      } catch (err) {
        console.log(err.response.data.error);
      }
    },
    async createTag({ commit }, tag) {
      try {
        const response = await Api().post("tags", tag);
        let newTag = response.data.data.attributes;
        newTag["post_ids"] = [];
        commit("ADD_TAG", { tag: newTag });
        return newTag;
      } catch (err) {
        console.log(err.response.data.error);
      }
    },
    async deletePost({ commit }, post) {
      // const regex = /^[2]\d{2}$/;
      try {
        let response = await Api().delete(`posts/${post.id}`);
        // if (response.status === 200 || response.status === 204) {
        if (response.status >= 200 && response.status <= 299) {
          commit("DELETE_POST", post.id);
        }
      } catch (err) {
        console.log(err.response.data.error);
      }
    },
    async updatePost({ commit }, { postPayload, imagePayload }) {
      try {
        let formData = new FormData();
        formData.append("snippet", postPayload.snippet);
        formData.append("title", postPayload.title);
        formData.append("body", postPayload.body);
        if (imagePayload) {
          formData.append("imageUrl", imagePayload, imagePayload.name);
        }
        let response = await Api().patch(`posts/${postPayload.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        let newPost = response.data.data.attributes;
        commit("UPDATE_POST", newPost);
        return newPost;
      } catch (err) {
        console.log(err.response.data.error);
      }
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
    },
    clearError({ commit }) {
      commit("CLEAR_ERROR");
    },
    setSnackbar({ commit }, snackbar) {
      snackbar.showing = true;
      snackbar.timeout = -1;
      // snackbar.timeout = 4000;
      snackbar.color = snackbar.color || "success lighten-1";
      commit("SET_SNACKBAR", snackbar);
    },
    async addTagFromPost({ commit }, { post, tag }) {
      try {
        let response = await Api().patch(`posts/addTags/${post.id}`, {
          tag: tag.id
        });
        let newPost = response.data.data.attributes;
        console.log(newPost);
        commit("ADD_TAG_FROM_POST", { post, tag });
      } catch (err) {
        console.log(err.response.data.error);
      }
    },
    async removeTagFromPost({ commit }, { post, tag }) {
      try {
        let response = await Api().patch(`posts/removeTags/${post.id}`, {
          tag: tag.id
        });
        let newPost = response.data.data.attributes;
        console.log(newPost);
        commit("REMOVE_TAG_FROM_POST", { post, tag });
      } catch (err) {
        console.log(err.response.data.error);
      }
    },
    async updateTagName({ commit }, { tag }) {
      try {
        const response = await Api().patch(`tags/${tag.id}`, {
          name: tag.name
        });
        console.log(response);
        commit("UPDATE_TAG_NAME", { tag });
      } catch (err) {
        console.log(err.response.data.error);
      }
    },
    async deleteTag({ commit }, { tag }) {
      try {
        const response = await Api().delete(`tags/${tag.id}`);
        console.log(response);
        commit("DELETE_TAG", { tag });
      } catch (err) {
        console.log(err.response.data.error);
      }
    }
    // loginUser({ commit }, user) {
    //   commit("SET_CURRENT_USER", user);
    // }
  },
  getters: {
    getTag: state => id => {
      return state.tags.find(t => t.id === id);
    },
    error(state) {
      return state.error;
    }
    // loggedIn(state) {
    //   return !!state.user;
    // }
  }
});
