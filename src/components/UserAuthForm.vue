<template>
  <v-container class="userAuthForm">
    <v-row v-if="error">
      <v-col cols="12" md="6" sm="8" class="offset-sm-2 offset-md-3">
        <app-alert @dismissed="onDismissed" :text="error"></app-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" sm="8" class="offset-sm-2 offset-md-3">
        <v-card>
          <v-card-text>
            <v-container>
              <v-form v-model="valid">
                <v-text-field
                  v-model="userInfo.userName"
                  :rules="[
                    required('Username'),
                    minLength('Password', 2),
                    maxLength('Password', 20)
                  ]"
                  label="Username"
                  type="text"
                  v-if="hasName"
                />
                <v-text-field
                  v-model="userInfo.email"
                  :rules="[required('Email'), isEmail()]"
                  label="Email"
                  type="email"
                />
                <v-text-field
                  v-model="userInfo.password"
                  :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPwd ? 'text' : 'password'"
                  :rules="[
                    required('Password'),
                    minLength('Password', 6),
                    maxLength('Password', 56)
                  ]"
                  label="Password"
                  @click:append="showPwd = !showPwd"
                />
                <v-btn @click="submitForm(userInfo)" :disabled="!valid">{{
                  btnText
                }}</v-btn>
              </v-form>
            </v-container>
            <router-link :to="{ name: changeRoute.optRoute }">
              {{ changeRoute.msgOptRoute }}
            </router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import validations from "@/utils/validations";

export default {
  name: "UserAuthForm",
  props: ["submitForm", "btnText", "hasName", "changeRoute"],
  data() {
    return {
      showPwd: false,
      userInfo: {
        userName: "",
        email: "",
        password: ""
      },
      valid: false,
      ...validations
    };
  },
  methods: {
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  }
};
</script>
