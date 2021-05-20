import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// database
import store from "./store";
// styles
import vuetify from "./plugins/vuetify";
import "./assets/css/main.css";
// filters & alerts & dialogs
import AlertComponent from "./components/Alert";
// // proves
// import axios from "axios";

Vue.config.productionTip = false;

// filters & alerts & dialogs
Vue.component("app-alert", AlertComponent);

new Vue({
  router,
  store,
  vuetify,
  // created() {
  //   // const userString = localStorage.getItem("currentUser");
  //   // if (userString) {
  //   //   const userData = JSON.parse(userString);
  //   //   this.$store.commit("SET_CURRENT_USER", userData);
  //   // }
  //   axios.interceptors.response.use(
  //     response => response,
  //     error => {
  //       if (error.response.status === 401) {
  //         this.$store.dispatch("logoutUser");
  //       }
  //       return Promise.reject(error);
  //     }
  //   );
  // },
  render: h => h(App)
}).$mount("#app");
