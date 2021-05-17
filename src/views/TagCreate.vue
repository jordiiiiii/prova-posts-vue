<template>
  <v-container class="TagCreate">
    <v-row>
      <v-col md="3" cols="12" class="ma-2">
        <h1>Tag Create Page</h1>
        <div class="field">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="tag.name" />
        </div>
        <v-btn @click="createTag">Create Tag</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TagCreate",
  data() {
    return {
      tag: {}
    };
  },
  methods: {
    createTag() {
      // let post = await this.$store.dispatch("createPost", this.post);
      // this.$router.push({ name: "single-post", params: { id: post.id } });
      this.$store.dispatch("createTag", this.tag);
    }
  }
};
</script>

<style lang="scss" scoped>
.field {
  input {
    border: 1px solid black;
  }
  label {
    display: block;
  }
  padding-bottom: 10px;
}
</style>
