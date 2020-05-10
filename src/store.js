import Vue from "vue";
import Vuex from "vuex";
import {
  stat
} from "fs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    flag: false
  },
  mutations: {
    changeToTrue(state) {
      state.flag = true
    },
    changeToFalse(state) {
      state.flag = false
    },
    getFlag(state) {
      return state.flag
    }
  },
  actions: {}
});