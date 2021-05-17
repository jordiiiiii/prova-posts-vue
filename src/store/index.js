import Vue from "vue";
import Vuex from "vuex";
import Api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    tags: [],
    readPosts: []
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_TAGS(state, tags) {
      state.tags = tags;
    },
    SET_READ_POSTS(state, readPosts) {
      state.readPosts = readPosts;
    },
    MARK_POST_READ(state, postId) {
      let readPosts = state.readPosts.concat(postId);
      state.readPosts = readPosts;
      window.localStorage.readPosts = JSON.stringify(readPosts);
    },
    ADD_POST(state, post) {
      // let posts = state.posts.concat(post);
      // state.posts = posts;
      state.posts = state.posts.concat(post);
    },
    ADD_TAG(state, tag) {
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

      let readPosts = JSON.parse(window.localStorage.readPosts);
      commit("SET_READ_POSTS", readPosts);
    },
    markRead({ commit }, postId) {
      commit("MARK_POST_READ", postId);
    },
    async createPost({ commit }, { postPayload, imagePayload }) {
      try {
        let formData = new FormData();
        formData.append("title", postPayload.title);
        formData.append("snippet", postPayload.snippet);
        formData.append("body", postPayload.body);
        formData.append("creator", postPayload.creator);
        formData.append("imageUrl", imagePayload, imagePayload.name);
        // let response = await Api().post("posts", formData);
        let response = await Api().post("posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        console.log(response);
        let savedPost = response.data.data.attributes;
        commit("ADD_POST", savedPost);
        // return savedPost;
      } catch (err) {
        console.log("YoYoPostError");
        console.log(err.response.data.error);
      }
    },
    async createTag({ commit }, tag) {
      try {
        console.log("YoYoTag");
        console.log(tag);
        let response = await Api().post("tags", tag);
        console.log(response);
        commit("ADD_TAG", tag);
      } catch (err) {
        console.log(err.response.data.error);
      }
    },
    async deletePost({ commit }, post) {
      // const regex = /^[2]\d{2}$/;
      try {
        console.log(post.id);
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
    }
  },
  getters: {
    getTag: state => id => {
      return state.tags.find(t => t.id === id);
    }
  },
  modules: {}
});
