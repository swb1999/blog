// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

// 全局样式
import "../static/css/reset.css"

// vuex
import vuex from "vuex"
Vue.use(vuex)
    // axios
import vuexAxios from "vue-axios"
import axios from "axios"
Vue.use(vuexAxios, axios)

// store 
import module_one from "./store/module_one"
var store = new vuex.Store({
    modules: {
        module_one
    }
})

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})