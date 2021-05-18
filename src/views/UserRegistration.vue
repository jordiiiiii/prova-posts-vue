<template>
  <v-container>
    <h1>Login</h1>
    <UserAuthForm
      :submitForm="registerUser"
      :btnText="'Register'"
      hasName="true"
    />
  </v-container>
</template>

<script>
import UserAuthForm from "@/components/UserAuthForm";

export default {
  name: "UserRegistration",
  components: {
    UserAuthForm
  },
  methods: {
    async registerUser(registrationInfo) {
      let userName = registrationInfo.userName;
      let email = registrationInfo.email;
      let password = registrationInfo.password;
      let user = await this.$store.dispatch("registerUser", {
        userName,
        email,
        password
      });
      if (user.error) {
        alert(user.error.userName + user.error.email + user.error.password);
      } else {
        alert("Welcome to our Group " + user.userName);
      }
    }
  }
};
</script>

<style scoped></style>
