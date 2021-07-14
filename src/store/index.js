import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  
  state: {
    keyword:'',
    goods:[],
    shopping_cart:[]
  },
  mutations: {
    update_keywords(state,payload){
      state.keyword = payload
    },
    update_goods(state,payload){
      state.goods = payload
    },
    update_shopping_cart(state ,payload){
      state.shopping_cart = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
