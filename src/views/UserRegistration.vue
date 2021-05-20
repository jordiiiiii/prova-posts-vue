<template>
  <v-container>
    <h1>Register</h1>
    <UserAuthForm
      :submitForm="registerUser"
      :btnText="'Register'"
      :changeRoute="changeRoute"
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
  data() {
    return {
      changeRoute: {
        optRoute: "user-login",
        msgOptRoute: "Already have an account? Login."
      }
    };
  },
  methods: {
    // TODO: podria ser un try/cacth
    async registerUser(registrationInfo) {
      let user = await this.$store.dispatch("registerUser", {
        userName: registrationInfo.userName,
        email: registrationInfo.email,
        password: registrationInfo.password
      });
      if (!user.error) {
        await this.$store.dispatch("setSnackbar", {
          text: "Welcome to our Group " + user.userName
        });
        await this.$router.push({ name: "Home" });
      }
    }
  }
};
</script>
