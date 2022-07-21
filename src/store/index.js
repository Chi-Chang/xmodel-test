import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scene:null,
  },
  mutations: {
    saveScene(state,data) {
      state.scene=data;
    },
  },
  actions: {
    saveScene (context,data) {
      context.commit('saveScene',data)
    },
    
  },
  modules: {
  }
})
