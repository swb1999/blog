<template></template>
<script>
  import {mapState,mapActions} from "vuex"
  import {INDEX_AXIOSGETALL,INDEX_DEFAULT} from "../store/type_mutation"
  export default {
    name: 'app',
    methods:{
      ...mapActions([INDEX_AXIOSGETALL.actions_type,INDEX_DEFAULT.actions_type]),
    },
    created(){
      this[INDEX_DEFAULT.actions_type](this)
    }
}
</script>
