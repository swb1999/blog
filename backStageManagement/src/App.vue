<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState,mapActions} from "vuex"
import {INDEX_AXIOSGETALL} from "./store/type_mutation"
export default {
  name: 'app',
  methods:{
     ...mapActions([INDEX_AXIOSGETALL.actions_type]),
    toTop(){
      var toTop = document.querySelector("#toTop");
      window.addEventListener("scroll",()=>{
        if(window.scrollY > 10){
          toTop.style.display = "block"
        }else{
          toTop.style.display = "none"
        }
      })
    }
  },
  created(){
    this[INDEX_AXIOSGETALL.actions_type](this);
  },
  mounted(){
    // 检测滚动条 显示隐藏按钮
    this.toTop();
  }
}
</script>

<style>
    body{
      background: url("/static/images/bg.gif")
    }
    body::before{
      content: "";
      height: 10px;
      background: #EBEE13;
      position: fixed;
      top:0;
      left: 0;
      width: 100%;
      z-index: 10;
    }
    #app{
      width: 100%;
    }
</style>
