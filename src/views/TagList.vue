<template>
  <v-container class="TagList">
    <h1 class="display-3 ma-4 d-flex justify-center">
      Posts with Tag "{{ tag.name }}
    </h1>
    <div class="d-flex flex-wrap">
      <div v-for="(post, index) in postsOnTag" :key="index">
        <PostListPost :post="post"></PostListPost>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PostListPost from "@/components/PostListPost";

export default {
  name: "TagList",
  components: {
    PostListPost
  },
  computed: {
    ...mapState(["posts"]),
    ...mapGetters(["getTag"]),
    tag() {
      return this.getTag(this.$route.params.id) || {};
    },
    postsOnTag() {
      return this.posts.filter(p => this.tag.post_ids.includes(p.id));
    }
  }
};
</script>
