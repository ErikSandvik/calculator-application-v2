import { createStore } from 'vuex'

export default createStore({
  state: {
    formData: {
      name: '',
      email: '',
      message: '',
    },
  },
  getters: {
    formData: (state) => state.formData,
  },
  mutations: {
    setFormData(state, payload) {
      state.formData = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
