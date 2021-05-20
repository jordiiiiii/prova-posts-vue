<template>
  <v-app>
    <!--    <v-app-bar app color="primary" dark>-->
    <!--      <v-toolbar-title>-->
    <!--        <div class="d-flex align-center">-->
    <!--          <v-img-->
    <!--            alt="Vuetify Logo"-->
    <!--            class="shrink mr-2"-->
    <!--            contain-->
    <!--            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"-->
    <!--            transition="scale-transition"-->
    <!--            width="40"-->
    <!--          />-->
    <!--          <v-img-->
    <!--            alt="Vuetify Name"-->
    <!--            class="shrink mt-1 hidden-sm-and-down"-->
    <!--            contain-->
    <!--            min-width="100"-->
    <!--            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"-->
    <!--            width="100"-->
    <!--          />-->
    <!--        </div>-->
    <!--      </v-toolbar-title>-->
    <!--      <v-spacer></v-spacer>-->
    <!--      <v-btn-->
    <!--        href="https://github.com/vuetifyjs/vuetify/releases/latest"-->
    <!--        target="_blank"-->
    <!--        text-->
    <!--      >-->
    <!--        <span class="mr-2">Latest Release</span>-->
    <!--        <v-icon>mdi-open-in-new</v-icon>-->
    <!--      </v-btn>-->
    <!--    </v-app-bar>-->
    <TheHeader :currentUser="currentUser" />

    <v-main>
      <router-view />
    </v-main>

    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
      :key="index"
      v-model="snackbar.showing"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`bottom: ${index * 60 + 8}px`"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text icon v-bind="attrs" @click="snackbar.showing = false">
          <v-icon dark>
            mdi-close-circle
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    TheHeader
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapState(["currentUser", "snackbars"])
    // ...mapState({
    //   currentUser: state => state.users.currentUser,
    //   snackbars: state => state.shared.snackbars
    // })
  },
  mounted() {
    this.$store.dispatch("loadPosts");
    this.$store.dispatch("loadCurrentUser");
  }
};
</script>

<style lang="scss">
//#app {
//  font-family: "Avenir", Helvetica, Arial, sans-serif;
//  -webkit-font-smoothing: antialiased;
//  -moz-osx-font-smoothing: grayscale;
//  text-align: center;
//  color: #2c3e50;
//}
</style>
