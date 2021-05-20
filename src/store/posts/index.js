import Api from "@/services/api";

export default {
  state: {
    posts: []
    // readPosts: [],
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    ADD_POST(state, post) {
      // let posts = state.posts.concat(post);
      // state.posts = posts;
      state.posts = state.posts.concat(post);
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
    }
  }
};
