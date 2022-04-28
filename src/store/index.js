import Vue from 'vue'
import Vuex from 'vuex'
import modulePLayingSongInfo from './module/playingSongInfo'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    modulePLayingSongInfo
  }
})
