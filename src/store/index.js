import Vue from "vue";
import Vuex from "vuex";
import createLogger from 'vuex/dist/logger';
import synthesis from './modules/synthesis';  //综合
import historyCase from './modules/historyCase'; //历史个例

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    synthesis,
    historyCase,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
