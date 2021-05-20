<template>
  <v-container class="home">
    <h1 class="display-4 ma-4 d-flex justify-center">
      All Posts
    </h1>
    <!--    <div v-for="(tag, index) in tags" :key="index">{{ tag.name }}</div>-->
    <div class="d-flex flex-wrap">
      <div v-for="(post, index) in posts" :key="index">
        <PostListPost :post="post"></PostListPost>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import PostListPost from "@/components/PostListPost";

export default {
  name: "Home",
  components: {
    PostListPost
  },
  mounted() {
    this.$store.dispatch("loadPosts");
  },
  computed: {
    ...mapState(["posts", "tags"])
    // ...mapState({
    //   posts: state => state.posts.posts,
    //   tags: state => state.tags.tags
    // })
  }
};
</script>

<style scoped lang="scss"></style>
