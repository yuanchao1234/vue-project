const approve1 = { 
  namespaced: true,
  state: {
    yuan1: ''
  },
  mutations: {
    yuanMutations(state, newValue) {
      console.log('我是approve1',state, newValue)
      state.yuan1 = newValue
    }
  },
}
const approve2 = { 
  namespaced: true,
  state: {
    yuan2: ''
  },
  mutations: {
    yuanMutations(state, newValue) {
      console.log('我是approve2', state, newValue)
      state.yuan2 = newValue
    }
  },
}
export { 
  approve1,
  approve2
}