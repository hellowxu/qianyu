import Vue from "vue"
import App from "./App.vue"
import VueRouter from "vue-router"
import router from "./router.js"
import axios from "axios"
import $ from 'jquery'
import Vuex from 'vuex'
import store from "./store";
Vue.use(Vuex)
// import newSongList from './components/newSongList.vue'

//vue控制
axios.defaults.baseURL = "http://127.0.0.1:3000/";
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

Vue.use(VueRouter)

var vm = new Vue({
    el: "#app",
    components: {
        App,
        // newSongList
    },
    router,
    render: e => e(App),
    store: store
});
Vue.use({
    vm
})