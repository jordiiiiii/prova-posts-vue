<template>
  <!--    <v-app-bar app color="primary" dark>-->
  <v-app-bar app color="" dark>
    <v-toolbar-title>
      <router-link to="/" class="text-uppercase grey--text">
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
  </v-app-bar>
</template>

<script>
export default {
  name: "TheHeader",
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
  }
};
</script>
