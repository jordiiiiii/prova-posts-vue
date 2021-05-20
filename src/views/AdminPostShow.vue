<template>
  <v-container>
    <div class="display-1 pt-3">{{ post.title }}</div>
    <div>{{ post.snippet }}</div>

    <v-autocomplete
      :items="tags"
      item-text="name"
      v-model="postTags"
      multiple
      chips
      deletable-chips
      hide-selected
      return-object
    ></v-autocomplete>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import _ from "lodash";

export default {
  name: "AdminPostShow",
  computed: {
    ...mapState(["posts", "tags"]),
    ...mapGetters(["getTag"]),
    post() {
      return this.posts.find(p => p.id === this.$route.params.id) || {};
    },
    postTags: {
      get() {
        return this.post.tag_ids.map(id => this.getTag(id));
      },
      set(newTags) {
        let addedTags = _.differenceBy(newTags, this.postTags, "id");
        let removedTags = _.differenceBy(this.postTags, newTags, "id");
        console.log(addedTags);
        if (addedTags.length > 0) {
          this.$store.dispatch("addTagFromPost", {
            post: this.post,
            tag: addedTags[0]
          });
        }
        if (removedTags.length > 0) {
          this.$store.dispatch("removeTagFromPost", {
            post: this.post,
            tag: removedTags[0]
          });
        }
      }
    }
  }
};
</script>
