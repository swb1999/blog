import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import single from '@/components/page/article'
import main from "@/components/page/main"
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: index,
        redirect: "/main",
        children: [{
            path: 'main',
            name: 'main',
            component: main
        }, {
            path: 'single',
            name: 'single',
            component: single
        }]
    }]
})