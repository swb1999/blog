import {
    INDEX_AXIOSPOST,
    INDEX_AXIOSGETALL,
    INDEX_AXIOSGETNAV,
    INDEX_EVERYPAGE,
    INDEX_CLASSONE,
    INDEX_DEFAULT,
    INDEX_CURRENTARTICLE,
    INDEX_RECOMMEND,
    INDEX_TOPDATA,
    INDEX_NEWDATA,
    INDEX_TOPARRAY
} from "./type_mutation"

export default {
    state: {
        allData: null,
        navData: null,
        everyPage: [],
        allDataLength: 0,
        classOne: {},
        listData: [],
        currentArticle: [],
        topList: [],
        newList: []
    },
    actions: {
        [INDEX_DEFAULT.actions_type](context, $this) {
            Promise.all([context.dispatch(INDEX_AXIOSGETALL.actions_type, $this), context.dispatch(INDEX_AXIOSGETNAV.actions_type, $this)])
                .then(result => {
                    context.dispatch(INDEX_RECOMMEND.actions_type);
                    context.commit(INDEX_TOPDATA.mutations_type);
                    context.commit(INDEX_NEWDATA.mutations_type);
                    $this.$router.push({
                        name: "main"
                    })
                }, error => {
                    $this.$router.push({
                        name: "error"
                    })
                }).catch(error => {
                    console.log(error)
                })
        },
        [INDEX_AXIOSGETALL.actions_type](context, $this) {
            // context.dispatch(INDEX_AXIOSGETNAV.actions_type, $this)
            //     .then(data => {
            //         $this.axios.get("/api/front_article/getArticleAll")
            //             .then(result => {
            //                 context.commit(INDEX_AXIOSGETALL.mutations_type, result.data.data)
            //                 context.dispatch(INDEX_EVERYPAGE.actions_type, { currentPage: 1, pageSize: 8 })
            //             })
            //     })
            return new Promise((resolve, reject) => {
                $this.axios.get("/api/front_article/getArticleAll").then((result) => {
                    context.commit(INDEX_AXIOSGETALL.mutations_type, result.data.data)
                    resolve("ok")
                }, () => {
                    reject("no")
                })
            })
        },
        [INDEX_AXIOSGETNAV.actions_type](context, $this) {
            return new Promise((resolve, reject) => {
                $this.axios.get("/api/back_class/class_list").then((result) => {
                    context.commit(INDEX_AXIOSGETNAV.mutations_type, result.data.data);
                    context.dispatch(INDEX_CLASSONE.actions_type, result.data.data)
                    resolve("ok")
                }, () => {
                    reject("no")
                })
            })
        },
        [INDEX_EVERYPAGE.actions_type](context, options) {
            context.commit(INDEX_EVERYPAGE.mutations_type, options)
        },
        [INDEX_CLASSONE.actions_type](context, options) {
            var classOne = {};
            options.forEach(val => {
                classOne[val.onedata.id] = val.onedata.cnname;
                val.twodata.forEach(value => {
                    classOne[value.id] = value.cnname;
                })
            })
            context.commit(INDEX_CLASSONE.mutations_type, classOne)
        },
        [INDEX_RECOMMEND.actions_type](context) {
            context.commit(INDEX_RECOMMEND.mutations_type)
            context.dispatch(INDEX_EVERYPAGE.actions_type, { currentPage: 1, pageSize: 8 })
        },
        [INDEX_CURRENTARTICLE.actions_type](context, value) {
            context.commit(INDEX_CURRENTARTICLE.mutations_type, value)
            context.dispatch(INDEX_EVERYPAGE.actions_type, { currentPage: 1, pageSize: 8 })
        },
        [INDEX_TOPARRAY.actions_type](context, type) {
            context.commit(INDEX_TOPARRAY.mutations_type, type)
        }
    },
    mutations: {
        [INDEX_AXIOSGETALL.mutations_type](state, result) {
            state.allData = result;
        },
        [INDEX_AXIOSGETNAV.mutations_type](state, result) {
            state.navData = result;
        },
        [INDEX_EVERYPAGE.mutations_type](state, options) {
            state.everyPage = state.currentArticle.slice((options.currentPage - 1) * options.pageSize, options.currentPage * options.pageSize)
        },
        [INDEX_CLASSONE.mutations_type](state, result) {
            state.classOne = result;
        },
        [INDEX_CURRENTARTICLE.mutations_type](state, value) {
            state.currentArticle = state.allData.filter(val => {
                return val.article_name.includes(value) || val.editer.includes(value)
            })
            state.allDataLength = state.currentArticle.length;
        },
        [INDEX_RECOMMEND.mutations_type](state) {
            state.currentArticle = state.allData.filter(val => {
                return val.recommend;
            })
            state.allDataLength = state.currentArticle.length;
        },
        [INDEX_TOPDATA.mutations_type](state) {
            var topList = state.allData.sort((a, b) => {
                return b.visitors - a.visitors
            })
            state.topList = topList.slice(0, 5)
        },
        [INDEX_NEWDATA.mutations_type](state) {
            var newList = state.allData.sort((a, b) => {
                return a.TIME - b.TIME
            })
            state.newList = newList.slice(0, 5)
        },
        [INDEX_TOPARRAY.mutations_type](state, type) {
            console.log(state)
            state.currentArticle = type === "top" ? state.topList : state.newList;
            console.log(state.currentArticle)
        }
    },
    getters: {

    }
}