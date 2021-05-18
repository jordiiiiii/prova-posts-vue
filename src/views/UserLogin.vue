<template>
  <v-container>
    <h1>Register</h1>
    <UserAuthForm :submitForm="loginUser" :btnText="'Login'" />
  </v-container>
</template>

<script>
import UserAuthForm from "@/components/UserAuthForm";

export default {
  name: "UserLogin",
  components: {
    UserAuthForm
  },
  methods: {
    async loginUser(loginInfo) {
      let email = loginInfo.email;
      let password = loginInfo.password;
      let user = await this.$store.dispatch("loginUser", { email, password });
      if (user.error) {
        alert(user.error.email + user.error.password);
      } else {
        alert("Thanks for signing in " + user.email);
      }
    }
  }
};
</script>
