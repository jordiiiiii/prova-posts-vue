<template>
  <v-container class="AdminPostList">
    <h1>Admin Blog List</h1>
    <v-btn text :to="{ name: 'admin-post-create' }">
      Add Post
    </v-btn>
    <div class="flex-table">
      <div>Title</div>
      <div>Snippet</div>
      <div>Actions</div>
    </div>

    <div v-for="post in posts" :key="post.id" class="flex-table">
      <div>{{ post.title | abbreviate }}</div>
      <div>{{ post.snippet | abbreviate }}</div>
      <div class="actions">
        <router-link :to="{ name: 'post-view', params: { id: post.id } }">
          Watch
        </router-link>
        <router-link :to="{ name: 'admin-post-show', params: { id: post.id } }">
          Show
        </router-link>
        <router-link :to="{ name: 'admin-post-edit', params: { id: post.id } }">
          Edit
        </router-link>
        <v-btn x-small @click="deletePost(post)">Delete</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AdminBlogList",
  computed: {
    ...mapState(["posts"])
  },
  filters: {
    abbreviate(text) {
      if (text.length > 50) {
        if (text) {
          text = text.replace("<p>", "");
          return text.slice(0, 50) + "...";
        }
      }
      return text;
    }
  },
  methods: {
    deletePost(post) {
      let response = confirm(`Are you sure you want to delete ${post.title}?`);
      if (response) {
        this.$store.dispatch("deletePost", post);
        this.$store.dispatch("setSnackbar", {
          text: "You have successfully deleted the post."
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.flex-table {
  display: grid;
  grid-template-columns: repeat(auto-fill, 33%);
  padding: 10px;
  border-bottom: 1px black solid;
  &:nth-of-type(2n) {
    background-color: #dedede;
  }
  .actions {
    * {
      margin-left: 8px;
    }
  }
}
</style>
