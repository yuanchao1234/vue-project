import Vue from 'vue'
import Vuex from 'vuex'
import { approve1, approve2 } from './approve'
// vuex数据持久化
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userState: {
      password: '',
      username: ''
    },
    yuan: ''
  },
  mutations: {
    userMutations(state, newValue) { 
      state.userState = { ...state.userState, ...newValue }
    },
    yuanMutations(state, newValue) { 
      console.log('我是根', state, newValue)
      state.yuan = newValue
    }
  },
  actions: {
  },
  modules: {
    approve1,
    approve2
  },
  // plugins: [createPersistedState()]
})
