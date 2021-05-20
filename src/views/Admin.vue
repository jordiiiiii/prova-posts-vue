<template>
  <div>
    <v-tabs>
      <v-tab
        text
        class="grey--text text--darken-1"
        v-for="item in items"
        :key="item.title"
        :to="item.route"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Admin",
  computed: {
    items() {
      return [
        {
          title: "Posts",
          icon: "mdi-view-dashboard",
          route: { name: "admin-post-list" }
        },
        {
          title: "Tags",
          icon: "mdi-bank-outline",
          route: { name: "admin-tag-list" }
        },
        {
          title: "Users",
          icon: "mdi-bank-outline",
          route: { name: "admin-user-list" }
        }
      ];
    }
  }
};
</script>
