export default {
  state: {
    error: null,
    snackbars: []
  },
  mutations: {
    SET_ERROR(state, payload) {
      state.error = payload;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
    SET_SNACKBAR(state, snackbar) {
      state.snackbars = state.snackbars.concat(snackbar);
    }
  },
  actions: {
    clearError({ commit }) {
      commit("CLEAR_ERROR");
    },
    setSnackbar({ commit }, snackbar) {
      snackbar.showing = true;
      snackbar.timeout = -1;
      // snackbar.timeout = 4000;
      snackbar.color = snackbar.color || "success lighten-1";
      commit("SET_SNACKBAR", snackbar);
    }
  },
  getters: {
    error(state) {
      return state.error;
    }
  }
};
