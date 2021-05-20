import axios from "axios";

export default () => {
  let currentUser = JSON.parse(window.localStorage.currentUser);

  return axios.create({
    baseURL: process.env.VUE_APP_ROOT_API,
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: currentUser && currentUser.token
    }
  });
};
