<template>
  <v-container>
    <h1>Login</h1>
    <UserAuthForm
      :submitForm="loginUser"
      :btnText="'Login'"
      :changeRoute="changeRoute"
    />
  </v-container>
</template>

<script>
import UserAuthForm from "@/components/UserAuthForm";

export default {
  name: "UserLogin",
  components: {
    UserAuthForm
  },
  data() {
    return {
      changeRoute: {
        optRoute: "user-registration",
        msgOptRoute: "Don't have an account? Register."
      }
    };
  },
  methods: {
    // TODO: podria ser un try/cacth?!
    async loginUser(loginInfo) {
      let user = await this.$store.dispatch("loginUser", {
        email: loginInfo.email,
        password: loginInfo.password
      });
      if (!user.error) {
        await this.$store.dispatch("setSnackbar", {
          text: "Thanks for signing in " + user.email
        });
        if (user.admin) {
          await this.$router.push({ name: "admin-post-list" });
        } else {
          await this.$router.push({ name: "Home" });
        }
      }
    }
  }
};
</script>
