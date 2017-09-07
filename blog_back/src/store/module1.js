import { ADD_SUCCESS, ADD_ERROR, ADD_ARTICLECLASS, ADD_DELETEARTICLECLASS, ADD_UPDATEDONE, ADD_UPDATEDTWO } from "./type_mutation"

export default {
    state: {
        articleInfo: []
    },
    mutations: {
        [ADD_ARTICLECLASS.mutations_type](state, result) {
            state.articleInfo = result;
        },
        [ADD_DELETEARTICLECLASS.mutations_type](state, obj) {
            state.articleInfo.forEach((val, i) => {
                if (val.onedata.id === obj.oneId) {
                    val.twodata.forEach((value, index) => {
                        value.id === obj.twoId && val.twodata.splice(index, 1)
                    })
                }
            })
            state.articleInfo.forEach((val, index) => {
                !val.twodata.length && state.articleInfo.splice(index, 1)
            })
        },
        deleteOneClass(state, obj) {
            state.articleInfo.forEach((val, index) => {
                val.onedata.id === obj.id && state.articleInfo.splice(index, 1)
            })
        },
        [ADD_UPDATEDONE.mutations_type](state, obj) {
            state.articleInfo.forEach((val, index) => {
                if (val.onedata.enname === obj.oldenname_one) {
                    val.onedata.enname = obj.enname_one;
                    val.onedata.cnname = obj.cnname_one;
                }
            })
        },
        [ADD_UPDATEDTWO.mutations_type](state, obj) {
            state.articleInfo.forEach(val => {
                val.twodata.forEach(value => {
                    if (value.enname === obj.oldenname_two) {
                        value.enname = obj.enname_two;
                        value.cnname = obj.cnname_two;
                    }
                })
            })
        }
    },
    getters: {

    },
    actions: {
        [ADD_SUCCESS.action_type](context, obj) {
            obj.this.$notify.success({
                title: obj.title,
                message: obj.message,
                offset: 100,
                duration: 2000
            });
        },
        [ADD_ERROR.action_type](context, obj) {
            obj.this.$notify.error({
                title: obj.title,
                message: obj.message,
                duration: 2000
            });
        },
        [ADD_ARTICLECLASS.action_type](context, $this) {
            $this.axios.get("/api/back_class/class_list")
                .then(function(result) {
                    context.commit(ADD_ARTICLECLASS.mutations_type, result.data.data)
                })
        },
        [ADD_DELETEARTICLECLASS.action_type](context, obj) {
            obj.id ? context.commit("deleteOneClass", obj) : context.commit(ADD_DELETEARTICLECLASS.mutations_type, obj)
        },
        [ADD_UPDATEDONE.action_type](context, obj) {
            obj.oldenname_one ? context.commit(ADD_UPDATEDONE.mutations_type, obj) : context.commit(ADD_UPDATEDTWO.mutations_type, obj);
        }
    }
}