<template>
  <v-container>
    <div class="display-1 pt-3">{{ post.title }}</div>
    <div>{{ post.snippet }}</div>

    <v-combobox
      :items="tags"
      item-text="name"
      v-model="postTags"
      multiple
      chips
      deletable-chips
      hide-selected
      return-object
    ></v-combobox>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "AdminPostShow",
  mounted() {
    console.log(this.tags);
  },
  computed: {
    ...mapState(["posts", "tags"]),
    // ...mapState({
    //   posts: state => state.posts.posts,
    //   tags: state => state.tags.tags
    // }),
    ...mapGetters(["getTag"]),
    // ...mapGetters({
    //   getTag: "getTag"
    // }),
    post() {
      return this.posts.find(p => p.id === this.$route.params.id) || {};
    },
    postTags: {
      get() {
        return this.post.tag_ids.map(id => this.getTag(id));
      },
      async set(newTags) {
        let createdTag = newTags.find(t => typeof t === "string");
        if (createdTag) {
          console.log(createdTag);
          createdTag = await this.$store.dispatch("createTag", {
            name: createdTag
          });
          console.log(createdTag);
          await this.$store.dispatch("addTagFromPost", {
            post: this.post,
            tag: createdTag
          });
        } else {
          let addedTags = _.differenceBy(newTags, this.postTags, "id");
          let removedTags = _.differenceBy(this.postTags, newTags, "id");
          console.log(addedTags);
          if (addedTags.length > 0) {
            await this.$store.dispatch("addTagFromPost", {
              post: this.post,
              tag: addedTags[0]
            });
          }
          if (removedTags.length > 0) {
            await this.$store.dispatch("removeTagFromPost", {
              post: this.post,
              tag: removedTags[0]
            });
          }
        }
      }
    }
  }
};
</script>
