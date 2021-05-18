<template>
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
</template>

<script>
import validations from "@/utils/validations";

export default {
  name: "UserAuthForm",
  props: ["submitForm", "btnText", "hasName"],
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
  }
};
</script>
