import { createStore } from 'vuex'

export default createStore({
  state: {
    formData: {
      name: '',
      email: '',
      message: '',
    },
    logEntryDetails: {
      expression: '',
      result: '',
    },
  },
  getters: {
    formData: (state) => state.formData,
    logEntryDetails: (state) => state.logEntryDetails,
  },
  mutations: {
    setFormData(state, payload) {
      state.formData = payload;
    },
    setLogEntryDetails(state, {expression, result}) {
      state.logEntryDetails.expression = expression;
      state.logEntryDetails.result = result;
    },
  },
  actions: {
  },
  modules: {
  }
})
