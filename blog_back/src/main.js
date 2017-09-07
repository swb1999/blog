// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false


import Vuex from "vuex"
Vue.use(Vuex)
import backStore from "./store/module1"
var store = new Vuex.Store({
    modules: {
        backStore
    }
})

import axios from "axios"
import vueAxios from "vue-axios"

Vue.use(vueAxios, axios)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

// 富文本编辑器
// import VueQuillEditor from 'vue-quill-editor'
// Vue.use(VueQuillEditor)
import '../static/Ueditor/ueditor.config.js'
import '../static/Ueditor/ueditor.all.min.js'
import '../static/Ueditor/lang/zh-cn/zh-cn.js'
import '../static/Ueditor/ueditor.parse.min.js'


router.beforeEach(function(to, from, next) {
    (to.name === "login" || sessionStorage.userId) ? next(): next(false)
})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})