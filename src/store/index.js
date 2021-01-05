import Vue from 'vue'
import Vuex from 'vuex'
// vuex数据持久化
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userState: {
      password: '',
      username: ''
    }
  },
  mutations: {
    userMutations(state, newValue) { 
      state.userState = { ...state.userState, ...newValue }
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
