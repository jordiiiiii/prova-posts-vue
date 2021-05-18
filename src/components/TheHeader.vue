<template>
  <!--    <v-app-bar app color="primary" dark>-->
  <v-app-bar app color="" dark>
    <v-toolbar-title>
      <router-link :to="{ name: 'Home' }" class="text-uppercase grey--text">
        <span class="font-weight-light">Grail</span>
        <span>CyberTech</span>
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        text
        class="grey--text text--darken-1"
        v-for="item in items"
        :key="item.title"
        :to="item.route"
      >
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </v-toolbar-items>
    <div v-if="currentUser.userName">
      {{ currentUser.userName }}
      <v-btn @click="onLogout">Logout</v-btn>
    </div>
    <div v-else>
      <v-btn :to="{ name: 'user-login' }">Login</v-btn>
      <v-btn :to="{ name: 'user-registration' }">Register</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "TheHeader",
  props: ["currentUser"],
  computed: {
    items() {
      let items = [
        {
          title: "Admin",
          icon: "mdi-lock-open",
          route: { name: "admin-post-list" }
        },
        {
          title: "Add Tag",
          icon: "mdi-lock-open",
          route: { name: "tag-create" }
        }
      ];
      return items;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logoutUser");
    }
  }
};
</script>
