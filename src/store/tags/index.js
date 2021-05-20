import Api from "@/services/api";

export default {
  state: {
    tags: []
  },
  mutations: {
    SET_TAGS(state, tags) {
      state.tags = tags;
    },
    ADD_TAG(state, { tag }) {
      state.tags = state.tags.concat(tag);
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
  },
  getters: {
    getTag: state => id => {
      return state.tags.find(t => t.id === id);
    }
  }
};
