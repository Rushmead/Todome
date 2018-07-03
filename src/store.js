import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: []
  },
  mutations: {
    addItem(state, item){
      state.items.push(item)
    },
    updateItem(state, item){
      state.items.filter((it) => it.id === item).map(() => item)
    },
    markDone(state, item){
      state.items.filter((it) => it.id === item.id).map((it) => it.done = !it.done);
    },
    clear(state){
      state.items = [];
    },
    init(state){
      if(localStorage.getItem("store")){
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem("store"))))
      }
    }
  }
})
