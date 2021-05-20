<template>
  <v-container>
    <div v-for="user in users" :key="user.id">
      {{ user.userName }}
      <v-btn x-small @click="loginUser(user)">Login</v-btn>
      {{ user.email }}
      {{ user.readPostIds }}
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AdminUserList",
  computed: {
    ...mapState(["users"])
    // ...mapState({
    //   users: state => state.users.users
    // })
  },
  mounted() {
    this.$store.dispatch("loadUsers");
  },
  methods: {
    loginUser(user) {
      this.$store.dispatch("loginUser", user);
    }
  }
};
</script>
