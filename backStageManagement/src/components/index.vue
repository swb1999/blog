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
            <router-link to="/" tag="span">首页</router-link>
          </li>
          <li>关于我们</li>
          <li>留言</li>
          <li>登录/后台</li>
        </ul>
        <div class="search">
          <input type="text" placeholder="输入文章名、作者" v-model="searchText">
          <button type="button" @click="searchButton"></button>
        </div>
      </nav>
      <div class="main clear">
        <div class="left">
          <router-view></router-view>
        </div>
        <div class="right">
          <list v-for="(item,index) in navData" :key="index">
              <h3 slot="class_one">{{item.cnname}}</h3>   
              <li v-for="val in 4"><a href="#">August 2011</a>&nbsp;(1)</li>
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
import {INDEX_EVERYPAGE} from "../store/type_mutation"
export default {
  name: 'hello',
  data () {
    return {
      searchText:""
    }
  },
  methods:{
    searchButton(){
      if(this.searchText){
       console.log(this.allData)
      }
    }
  },
  computed:{
    ...mapState({
      navData:state=>state.module_one.navData,
      allData:state=>state.module_one.allData
    })
  },
  components:{
    list
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
    width: 960px;
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
    width: 575px;
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
</style>
