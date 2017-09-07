import { INDEX_AXIOSPOST, INDEX_AXIOSGETALL, INDEX_AXIOSGETNAV, INDEX_EVERYPAGE, INDEX_CLASSONE } from "./type_mutation"

export default {
    state: {
        allData: [],
        navData: [],
        everyPage: [],
        allDataLength: 0,
        classOne: {},
        listData: []
    },
    actions: {
        [INDEX_AXIOSGETALL.actions_type](context, $this) {
            context.dispatch(INDEX_AXIOSGETNAV.actions_type, $this)
                .then(data => {
                    $this.axios.get("/api/front_article/getArticleAll")
                        .then(result => {
                            context.commit(INDEX_AXIOSGETALL.mutations_type, result.data.data)
                            context.dispatch(INDEX_EVERYPAGE.actions_type, { currentPage: 1, pageSize: 8 })
                        })
                })
        },
        [INDEX_AXIOSGETNAV.actions_type](context, $this) {
            return new Promise((resolve, reject) => {
                $this.axios.get("/api/front_article/getNav").then((result) => {
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
                classOne[val.id] = val.enname;
            })
            context.commit(INDEX_CLASSONE.mutations_type, classOne)
        }
    },
    mutations: {
        [INDEX_AXIOSGETALL.mutations_type](state, result) {
            state.allData = result;
            state.allDataLength = result.length;
            console.log(state.allData)
        },
        [INDEX_AXIOSGETNAV.mutations_type](state, result) {
            state.navData = result;
        },
        [INDEX_EVERYPAGE.mutations_type](state, options) {
            state.everyPage = state.allData.slice((options.currentPage - 1) * options.pageSize, options.currentPage * options.pageSize)
        },
        [INDEX_CLASSONE.mutations_type](state, result) {
            state.classOne = result;
        }
    },
    getters: {

    }
}