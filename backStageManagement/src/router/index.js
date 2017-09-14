import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from "@/components/login"
import error from "@/components/error"
import single from '@/components/page/article'
import main from "@/components/page/main"
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: login
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            children: [{
                path: 'main',
                name: 'main',
                component: main
            }, {
                path: 'single/:id',
                name: 'single',
                component: single
            }]
        },
        {
            path: '/error',
            name: 'error',
            component: error
        }
    ]
})