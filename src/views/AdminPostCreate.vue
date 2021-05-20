<template>
  <v-container class="AdminPostCreate">
    <v-row>
      <v-col md="6" cols="12" class="ma-2">
        <h1>Post Create Page</h1>
        <!--        <PostEditForm :post="post" :savePost="savePost" :btnText="btnText" />-->
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
            :rules="[imageRequired(), imageSize()]"
            placeholder="Pick an Image"
            prepend-icon="mdi-camera"
            label="Image"
            id="pickedImage"
            ref="pickedImage"
            @change="onFilePicked"
          />
          <!--          <div class="field mt-2">-->
          <!--            <label for="pickedImage">Image</label>-->
          <!--            <v-btn class="primary mt-2" @click="onPickFile">Upload Image</v-btn>-->
          <!--            <input-->
          <!--              type="file"-->
          <!--              style="display: none"-->
          <!--              id="pickedImage"-->
          <!--              ref="pickedImage"-->
          <!--              accept="image/png image/jpg"-->
          <!--              @change="onFilePicked"-->
          <!--            />-->
          <!--          </div>-->
          <div class="field">
            <img :src="imageUrl" alt="" height="150" />
          </div>
          <v-btn @click="savePost" :disabled="!valid">{{ btnText }} Post</v-btn>
        </v-form>
      </v-col>
      <!--      <v-col md="9" cols="12">-->
      <!--        <PostListPost :post="post" />-->
      <!--      </v-col>-->
    </v-row>
  </v-container>
</template>

<script>
import validations from "@/utils/validations";
// import PostEditForm from "@/components/PostEditForm";
// import PostListPost from "@/components/PostListPost";

export default {
  name: "AdminPostCreate",
  components: {
    // PostEditForm
    // PostListPost
  },
  data() {
    return {
      btnText: "create",
      image: null,
      imageUrl: "",
      post: {
        creator: "609d8c02cf7bb100045fc594"
        // title: "asdgff fdgdffssdddsfdd fdsfdsfdfsfdffds",
        // snippet:
        //   "Aoigroierigrogi ergedsfdsf sdfsdfsdfsdf dfsdfsdfirtiregirgioroig ergeririoerigioergre ergiergreiogroigr ergrgiegorgio",
        // body:
        //   "Aasddddddddddddddd ddddddddddddddddddd adsssssssssssssss sssssssssssssssssssssssssss sssssssssss CTO and Arik Faingold our Co-founder and Chairman, on this great mission to revolutionize Cyber Risk Validation, together with industry veteran Ran Tamir, our VP of Product, and Aviv Cohen, our visionary CMO. Being an enterprise sales veteran, and an ex-VP of Global Sales, I didn’t need more than 3-4 PoC’s at Pcysys, to understand that we’re onto something big. Very big.\n" +
        //   "\n" +
        //   "Expadssdaaaaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaabilities asddddddddddddddd dddddddddddddd ddddddddddddddddddd ddddddddddddd  asdsdasasdds asdsdsdsdsdsd asddddd dddddddddddddd asdsdsdsds dsdsdsdsdsdsdsdsdsdsd asdsdsd sdsdsdsdsdsdsdsdsdsdsd asdsdsdsd sdsdsdsdsdsdsdsdsd asdsdsdsdsd sdsdsdsdsdsdsd asdasddddddddddanking me for sending our fabulous R&D and Sales Engineering teams to aassadddddddddddddddddddddddddddes) and the asdsdsdsdsdsdsdsdsdestors adsdddddddddddddddddddddhe Continuous Risk Validation market.\n" +
        //   "\n" +
        //   "While mainstream media has traditionally praised one’s ability to close big rounds of funding as if it is directly linked to past or future success, we, at Pcysys, have a different view on the whole thing. Our philosophy has always been: develop a product that (really) works, raise the funds necessary to support your initial go-to-market efforts, prove, beyond any reasonable doubt, that you’ve figured out the execution play (which is a devastating cliff for 90% of startups), and only then, raise a bit more funds than you really need, to progress to the next level.\n" +
        //   "\n" +
        //   "Our ability to acquire tens of customers quarter-over-quarter has given us the freedom to choose our investors and the right amount of funding necessary to support our growth. Our laser-like focus on execution across the board (and not on VC roadshows), has allowed us to grow our customer base and amplify our research velocity, while maintaining a winning culture which guarantees results.\n" +
        //   "\n" +
        //   "As we embark on the next part of this wonderful journey, it's a good time to look back and understand the key success factors that brought us this far. First and foremost, our customers, who are true pioneers and the leaders of the revolution. Believing in our vision, our way of thinking and our product. \n" +
        //   "\n" +
        //   "One of our core company values is customer-centricity. I take much pride in it. This means no politics- from R&D through product and marketing, we are one team. We all go out to the field and take part in the sales and success processes. Listen carefully to the pains of our customers and adapt accordingly.\n" +
        //   "\n" +
        //   "I’m amazed every day by the driven, intelligent people that surround me and comprise the Pcysys DNA. The truth is, everybody in the company, starting from the R&D ranks and all the way to G&A, are aces by their own right. It's just fun to come into the office and see this company work! It’s as if you were to witness a rocket flying to the moon in slow motion...\n" +
        //   "\n" +
        //   "Iasddddddddddddddddddddddd asddddddddd ddddddddddddddddddld and new, for their support and confidence in our vision. Nasddddddddddddddd dddddddddddddddddd dddddddddddasd asdddddddddddddddd asddddddddddddddddddde. ",
      },
      valid: false,
      ...validations
    };
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
      const postPayload = this.post;
      const imagePayload = this.image;
      console.log(postPayload);
      console.log(imagePayload);
      await this.$store.dispatch("createPost", {
        postPayload,
        imagePayload
      });
      await this.$store.dispatch("setSnackbar", {
        color: "accent lighten-1",
        text:
          "You have successfully created a new post, now wait to be approved."
      });
      await this.$router.push({ name: "Home" });
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
