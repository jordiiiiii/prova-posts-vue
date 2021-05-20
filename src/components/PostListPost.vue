<template>
  <v-card
    width="340px"
    hover
    class="ma-2"
    :to="{ name: 'post-view', params: { id: post.id } }"
  >
    <v-img :src="url + post.imageUrl" alt="post image" />
    <v-card-title>{{ post.title }}</v-card-title>

    <v-card-text>
      <div v-if="isRead" class="success--text">
        <v-icon class="success--text" small>mdi-check</v-icon>
        Read
      </div>
      <div>{{ post.snippet }}</div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-actions>
      <span v-for="tag_id in post.tag_ids" :key="`${post.id}-${tag_id}`">
        <v-btn
          class="mr-2"
          small
          @mousedown.stop
          :to="{ name: 'tag', params: { id: tag_id } }"
        >
          {{ getTag(tag_id).name }}
        </v-btn>
      </span>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "PostListPost",
  props: ["post"],
  data() {
    return {
      url: process.env.VUE_APP_ROOT_API
    };
  },
  computed: {
    ...mapState(["currentUser"]),
    // ...mapState({
    //   currentUser: state => state.users.currentUser
    // }),
    ...mapGetters(["getTag"]),
    // ...mapGetters({
    //   getTag: "getTag"
    // }),
    isRead() {
      if (this.currentUser.readPostIds) {
        return this.currentUser.readPostIds.includes(this.post.id);
      } else {
        return false;
      }
    }
  }
};
</script>
