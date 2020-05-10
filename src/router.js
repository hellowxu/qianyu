import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import searchSecond from "./components/search/searchSecond.vue";
import latestSearch from "./components/search/latestSearch.vue";
var router = new VueRouter({
  routes: [
    { path: "/", component: latestSearch },
    { path: "/searchSecond", name: "sSecond", component: searchSecond },
    { path: "/latestSearch", name: "lSearch", component: latestSearch }
  ]
});

export default router;
