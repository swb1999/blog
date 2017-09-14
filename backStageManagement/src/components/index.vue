<template>
  <div class="container">
      <header class="head clear">
        <ul id="social" class="social">
	        <li class="twitter"><a href="#">Twitter</a></li>
          <li class="rss"><a href="#">RSS</a></li>
          <li class="facebook"><a href="#">Facebook</a></li>
        </ul>
	      <p class="subscribers">Subscribers <span class="subscribersno">2175</span></p>
        <p class="logo">
          <a href="#" rel="home">
            <img src="/static/images/logo.png" alt="logo" height="69" width="299">
          </a>
        </p>
      </header>
      <nav class="nav clear">
        <ul class="navList">
          <li>
            <router-link to="/index/main" tag="span">首页</router-link>
          </li>
          <li>关于我</li>
          <li><a href="http://http://123.56.217.228:9999/#/" target="_blank">登录/后台</a></li>
          <li>留言</li>
        </ul>
        <div class="search">
          <input type="text" placeholder="输入文章名、作者" v-model="searchText" @keyup.enter="searchButton">
          <button type="button" @click.enter="searchButton"></button>
        </div>
      </nav>
      <div class="main clear">
        <div class="left">
          <router-view></router-view>
        </div>
        <div class="right">
          <list>
            <h3 slot="class_one">访问排行</h3>
            <template v-for="val in topList">
              <router-link :to="{name:'single',params:val}" tag="li"><a href="javascript:;">{{val.article_name}}</a><p>{{val.visitors}}次</p></router-link>
            </template>
          </list>  
          <list>
            <h3 slot="class_one">最新更新</h3>
            <template v-for="val in newList">
              <router-link :to="{name:'single',params:val}" tag="li"><a href="javascript:;">{{val.article_name}}</a><p>{{val.TIME.substr(0,10)}}</p></router-link>
            </template>
          </list> 
          <list v-for="(item,index) in navData" :key="index" class="toggle">
              <h3 slot="class_one">{{item.onedata.cnname}}</h3>   
              <li v-for="val in item.twodata"><a href="#">{{val.cnname}}</a>&nbsp;({{val.article_num}})</li> 
          </list>
        </div>
      </div>
      <footer class="foot">本网站由尚舸提供</footer>
        <a href="#">
          <div id="toTop" class="toTop"></div>
        </a>
  </div>
</template>
<script>
import list from "./page/components/list"
import {mapState,mapActions} from "vuex"
import {INDEX_EVERYPAGE,INDEX_CURRENTARTICLE,INDEX_TOPDATA,INDEX_NEWDATA,INDEX_TOPARRAY} from "../store/type_mutation"
export default {
  name: 'hello',
  data () {
    return {
      searchText:""
    }
  },
  methods:{
    ...mapActions([INDEX_CURRENTARTICLE.actions_type,INDEX_TOPARRAY.actions_type]),
    searchButton(){
      if(this.searchText){
       this[INDEX_CURRENTARTICLE.actions_type](this.searchText)
      }
    },
    updataArticleArray(type){
      this[INDEX_TOPARRAY.actions_type](type);
    }
  },
  computed:{
    ...mapState({
      navData:state=>state.module_one.navData,
      topList:state=>state.module_one.topList,
      newList:state=>state.module_one.newList,
    })
  },
  components:{
    list
  },
  beforeRouteEnter:(to, from, next) => {
    next(vm=>{
        !vm.navData && vm.$router.push({name:"login"})
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .clear:after{
    content: "";
    display: block;
    height: 0;
    clear: both;
  }
  .container{
    width: 1024px;
    margin: 0 auto;
  }
  .head{
    height: 106px;
    line-height: 106px;
  }
  .logo{
    float: left;
  }
  .social,.subscribers{
    float: right;
  }
  .social{
    margin-top: 35px;
    li{
      float: left;
      width: 37px;
      height: 37px;
      border-radius: 50%;
      overflow: hidden;
      background: url("/static/images/twitter-icon.png");
      background-position:top;
    }
    li:nth-of-type(2){
      background: url("/static/images/rss-icon.png")
    }
    li:nth-of-type(3){
      background: url("/static/images/facebook-icon.png")
    }
    li:hover{
      background-position:bottom;
      cursor: pointer;
    }
  }
  .subscribers{
    margin-right: 20px;
  }
  .subscribersno{
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 30px;
  }
  .nav{
    width: 100%;
    height: 72px;
    background: url("/static/images/nav-bg.png") repeat;
    color: #fff;
    margin-top: 10px;
  }
  .navList{
    font-size: 12px;
    float: left;
    margin-left: 20px;
    li{
      float: left;
      line-height: 72px;
      margin: 0 10px;
      cursor: pointer;
    }
    li:hover{
      color: #EBEE13;
    }
    a{
      color: #fff;
      text-decoration: none;
    }
    a:hover{
      color: #EBEE13;
    }
  }
  .search{
    padding-right: 20px;
    float: right;
    margin-top: 18px;
    input{
      background-color: black;
      border: 1px solid #2B2C2C;
      height: 32px;
      color: white;
      border-radius: 5px;
      padding-left: 5px;
      line-height: 32px;
      width: 200px;
    }
    input::-webkit-input-placeholder { /* WebKit browsers */  
      color: white;  
    }  
    button{
      height: 37px;
      width: 37px;
      background-image: url("/static/images/search-icon.png");
      background-position: top;
      border: 0px;
      cursor: pointer;
      background-color: transparent;
      outline: none;
      margin-left: 15px;
      float: right;
    }
    button:hover{
      background-position: bottom;
    }
  }
  .main{
    background: #fff;
  }
  .left{
    float: left;
    width: 639px;
    margin-left: 60px;
  }
  .right{
    float: right;
    width: 270px;
  }
  .foot{
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #000;
    color: #fff;
    font-size: .14rem;
    letter-spacing: 2px;
  }
  .toTop{
    position: fixed;
    width: 51px;
    height: 51px;
    background: #000;
    border-radius: 5px;
    bottom: 15px;
    right: 15px;
    text-align: center;
    display: none;
  }
  .toTop:hover{
    &:after{
      opacity: 1;
    }
  }
  .toTop:after{
      content: "";
      width: 10px;
      height: 10px;
      border:3px solid #ccc;
      display: inline-block;
      transform: rotate(135deg);
      border-color: transparent transparent #ccc #ccc;
      margin-top: 22px;
      opacity: .5;
      transition: opacity .5s ease-in-out;
  }
  a{
      color: #959494;
      text-decoration: none;
  }
  a:hover{
      color: #888A13;
  }
  p{
      float: right;
      padding-right: 15px;
      color: #959494;
  }
</style>
