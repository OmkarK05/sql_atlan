export const data = {
  namespaced: true,

  state: {
    selectedData: null,
  },

  getters: {
    getSelectedData: (state) => state.selectedData,
  },

  mutations: {
    SET_DATA: function (state, payload) {
      state.selectedData = payload;
    },
  },

  actions: {
    setSelectedData: function (store, data) {
      store.commit("SET_DATA", data);
    },
  },
};
