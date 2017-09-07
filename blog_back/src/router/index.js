import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import main from '@/components/main'
import main_index from '@/components/page/main_index'


// 接口文档
import add_api from '@/components/page/api/api_insert'
import api_list_font from '@/components/page/api/api_list_font'
import api_list_back from '@/components/page/api/api_list_back'
import api_detail from '@/components/page/api/api_detail'
import api_amend from '@/components/page/api/api_amend'

// 分类管理
import add_class_one from '@/components/page/class/add_class_one'
import add_class_two from '@/components/page/class/add_class_two'
import article_class_list from "@/components/page/class/article_class"

// 文章管理
import add_article from "@/components/page/article/add_article"
import article_list from "@/components/page/article/article_list"
import amend_article from "@/components/page/article/amend_article"
Vue.use(Router)




export default new Router({
    routes: [{
        path: '/',
        name: 'login',
        component: login
    }, {
        path: '/main',
        name: 'main',
        component: main,
        children: [{
                path: '/',
                name: 'main_index',
                component: main_index,
            }, {
                path: 'add_class_one',
                name: 'add_class_one',
                component: add_class_one,
            }, {
                path: 'add_class_two',
                name: 'add_class_two',
                component: add_class_two,
            }, {
                path: 'add_api',
                name: 'add_api',
                component: add_api,
            }, {
                path: 'api_list_font',
                name: 'api_list_font',
                component: api_list_font,
            }, {
                path: 'api_list_back',
                name: 'api_list_back',
                component: api_list_back,
            }, {
                path: 'api_detail',
                name: 'api_detail',
                component: api_detail,
            }, {
                path: 'api_amend',
                name: 'api_amend',
                component: api_amend,
            }, {
                path: 'article_class_list',
                name: 'article_class_list',
                component: article_class_list,
            }, {
                path: "add_article",
                name: "add_article",
                component: add_article
            }, {
                path: "article_list",
                name: "article_list",
                component: article_list
            },
            {
                path: "amend_article",
                name: "amend_article",
                component: amend_article
            }
        ]
    }]
})