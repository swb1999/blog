<template>
    <div class="parent">
        <loop class="loop"></loop>
        <div class="context">
            <template v-for="(item,index) in everyPage"> 
            <my-section :keydata="item" :index="index+1"></my-section>
            </template> 
        <div class="block">
            <el-pagination
                layout="prev, pager, next, total"
                :total="allDataLength"
                :page-size = "pageSize"
                @current-change="currentChange">
            </el-pagination>
        </div>
        </div>
    </div>  
</template>
<script>
import loop from "./components/loop"
import section from "./components/section"
import {INDEX_EVERYPAGE} from "../../store/type_mutation"
import {mapState,mapActions} from "vuex"
export default {
    data(){
        return {
            pageSize:8
        }
    },
    computed:{
        ...mapState({
            currentArticle:state=>state.module_one.currentArticle,
            everyPage:state=>state.module_one.everyPage,
            allDataLength:state=>state.module_one.allDataLength
        })
    },
    methods:{
        ...mapActions([INDEX_EVERYPAGE.actions_type]),
        currentChange(currentPage){
           this[INDEX_EVERYPAGE.actions_type]({currentPage,pageSize:this.pageSize})
        }
    },
    components:{
        loop,
        mySection:section
    }
}
</script>
<style scoped>
    .parent{
        position: relative;
    }
    .loop{
        margin: 30px 0;
    }
    .block{
        position: absolute;
        left: 50%;
        bottom: -58px;
        transform: translateX(-50%);
        padding-bottom: 15px;
    }
</style>

