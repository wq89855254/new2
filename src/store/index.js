import Vue from "vue";
import Vuex from "vuex";
import createLogger from 'vuex/dist/logger';
import synthesis from './modules/synthesis';  //综合

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    synthesis
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
