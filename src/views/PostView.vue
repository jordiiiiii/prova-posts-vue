<template>
  <v-container class="PostView">
    <v-row>
      <v-col md="6" cols="12">
        <img :src="url + post.imageUrl" alt="post image" />
      </v-col>
      <v-col md="6" cols="12">
        <h1 class="display-1 mb-4">{{ post.title }}</h1>

        <div v-if="isRead" class="success--text">Read</div>
        <div v-else>
          <v-btn
            v-if="currentUser.email"
            text
            color="warning"
            x-small
            @click="markRead"
          >
            Mark Read
          </v-btn>
        </div>
        <span v-for="tag_id in post.tag_ids" :key="tag_id">
          <v-btn
            :to="{ name: 'tag', params: { id: tag_id } }"
            class="mr-1 my-2"
          >
            {{ getTag(tag_id).name }}
          </v-btn>
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div>{{ post.body }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "PostView",
  data() {
    return {
      url: process.env.VUE_APP_ROOT_API
    };
  },
  computed: {
    ...mapState(["currentUser", "posts"]),
    ...mapGetters(["getTag"]),
    post() {
      return this.posts.find(p => p.id === this.$route.params.id) || {};
    },
    isRead() {
      if (this.currentUser.readPostIds) {
        return this.currentUser.readPostIds.includes(this.post.id);
      } else {
        return false;
      }
    }
  },
  methods: {
    markRead() {
      this.$store.dispatch("markRead", this.post.id);
    }
  }
};
</script>

<style scoped>
img {
  max-width: 60%;
}
</style>
