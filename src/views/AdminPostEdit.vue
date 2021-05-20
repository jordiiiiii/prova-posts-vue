<template>
  <v-container>
    <!--    <PostEditForm :post="post" :savePost="savePost" :btnText="btnText" />-->
    <v-form v-model="valid">
      <v-text-field
        v-model="post.title"
        label="Title"
        counter="88"
        :rules="[
          required('Title'),
          minLength('Title', 20),
          maxLength('Title', 88)
        ]"
      />
      <v-textarea
        v-model="post.snippet"
        label="Snippet"
        counter="180"
        :rules="[
          required('Snippet'),
          minLength('Snippet', 100),
          maxLength('Snippet', 180)
        ]"
      />
      <v-textarea
        v-model="post.body"
        label="Body"
        counter="6000"
        :rules="[
          required('Body'),
          minLength('Body', 2000),
          maxLength('Body', 6000)
        ]"
      />

      <v-file-input
        v-model="image"
        accept="image/png, image/jpeg, image/bmp"
        :rules="[imageSize()]"
        placeholder="Pick an Image"
        prepend-icon="mdi-camera"
        label="Image"
        id="pickedImage"
        ref="pickedImage"
        @change="onFilePicked"
      />

      <!--      <div class="field mt-2">-->
      <!--        <label for="pickedImage">Image</label>-->
      <!--        <v-btn class="primary mt-2" @click="onPickFile">Upload Image</v-btn>-->
      <!--        <input-->
      <!--          type="file"-->
      <!--          style="display: none"-->
      <!--          id="pickedImage"-->
      <!--          ref="pickedImage"-->
      <!--          accept="image/png image/jpg"-->
      <!--          @change="onFilePicked"-->
      <!--        />-->
      <!--      </div>-->
      <div class="field">
        <img :src="imageUrl" alt="" height="150" />
      </div>
      <v-btn @click="savePost" :disabled="!valid">{{ btnText }} Post</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import validations from "@/utils/validations";
// import PostEditForm from "@/components/PostEditForm";

export default {
  name: "AdminPostEdit",
  components: {
    // PostEditForm
  },
  data() {
    return {
      btnText: "update",
      image: null,
      imageUrl: "",
      valid: false,
      ...validations
    };
  },
  computed: {
    ...mapState(["posts"]),
    // ...mapState({
    //   posts: state => state.posts.posts
    // }),
    post() {
      return this.posts.find(p => p.id === this.$route.params.id) || {};
    }
  },
  methods: {
    onPickFile() {
      this.$refs.pickedImage.click();
    },
    onFilePicked() {
      // onFilePicked(event) {
      //   const imageFile = event.target.files[0];
      const imageFile = this.image;
      let fileName = imageFile.name;
      if (fileName.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(imageFile);
      this.image = imageFile;
    },
    async savePost() {
      let post = await this.$store.dispatch("updatePost", {
        postPayload: this.post,
        imagePayload: this.image
      });
      await this.$store.dispatch("setSnackbar", {
        text: `You have successfully edited your post, ${post.title}.`
      });
      await this.$router.push({ name: "admin-post-list" });
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
