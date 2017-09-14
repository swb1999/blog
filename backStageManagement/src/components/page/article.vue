<template>
    <div class="box">
        <header class="head">
            <router-link to="/index/main" tag="span" title="返回首页">首页</router-link> &rArr; 
            <span :title="'查看'+classOneName">{{classOneName}}</span> &rArr; 
            <span :title="'查看'+classTwoName">{{classTwoName}}</span> &rArr; 
            <span>{{everyArticle.article_name}}</span>
        </header>
        <div class="address">
            <h1>{{everyArticle.article_name}}</h1>
            <ul class="clear">
                <li><i class="el-icon-document"></i>vue</li>
                <li><i class="el-icon-edit"></i>{{everyArticle.editer}}</li>
                <li><i class="el-icon-time"></i>{{everyArticle.time}}</li>
                <li><i class="el-icon-star-on"></i>{{everyArticle.visitors}}</li>
            </ul>
        </div>
        <div class="context" v-html="everyArticle.content"></div>
        <div class="posts">
            <span class="previousPosts" @click="switchArticle(preventArticle.id)" v-show="preventArticle.id"><a href="javascript:scroll(0,0)">&laquo; {{preventArticle.article_name}}</a></span>
            <span class="nextsPosts" @click="switchArticle(nextArticle.id)" v-show="nextArticle.id"><a href="javascript:scroll(0,0)">{{nextArticle.article_name}} &raquo;</a></span>
        </div>
    </div>   
</template>
<script>
    import {mapState} from "vuex"
    export default {
        data(){
            return {
                everyArticle:{},
                preventArticle:{},
                nextArticle:{}
            }
        },
        computed:{
            ...mapState({
                 currentArticle:state=>state.module_one.currentArticle,
                 classOne:state=>state.module_one.classOne
            }),
            classOneName:{
                get(){
                    return this.classOneName = this.classOne[this.everyArticle.oneId];
                },
                set(){

                }
            },
            classTwoName:{
                get(){
                    return this.classTwoName = this.classOne[this.everyArticle.twoId]
                },
                set(){

                }
            }
        },
        watch:{
            everyArticle(){
                this.switchButton();
            },
            allData(){
                this.switchButton();
            }
        },
        methods:{
            switchButton(){
                this.preventArticle = {};
                this.nextArticle = {}
                this.currentArticle.forEach((val,index)=>{
                    if(val.id === this.everyArticle.id){
                        if(index){
                            this.preventArticle.id = this.currentArticle[index-1].id;
                            this.preventArticle.article_name = this.currentArticle[index-1].article_name;
                        }
                        if(index !== this.currentArticle.length-1){
                            this.nextArticle.id = this.currentArticle[index+1].id;
                            this.nextArticle.article_name = this.currentArticle[index+1].article_name;
                        }          
                    }
                },this)
            },
            switchArticle(id){
               this.axios.get("/api/front_article/getArticle?id="+id)
                .then(function(result){
                    this.everyArticle = result.data.data;
                }.bind(this))
            } 
        },
        beforeRouteEnter(to, from, next){
            next(vm=>{
                vm.everyArticle = to.params.id ? to.params : JSON.parse(sessionStorage.params);
                to.params.id && (sessionStorage.params = JSON.stringify(to.params));
            })
        },
        beforeRouteUpdate(to, from, next){
            this.everyArticle = to.params.id ? to.params : JSON.parse(sessionStorage.params);
            to.params.id && (sessionStorage.params = JSON.stringify(to.params));
        }
    }
</script>
<style lang="scss" scoped>
    .box{
        border:1px solid #ccc;
        border-radius: 3px;
        margin: 8px 0;
        overflow: hidden;
    }
    .head{
        height: 30px;
        line-height: 30px;
        border-bottom:1px solid #ccc;
        font-size: 14px;
        padding-left: 10px;
        span{
            cursor: pointer;
        }
         span:hover{
             color: lightcoral;
         }
    }
    .address{
        margin-bottom: 15px;
        border-bottom: 1px solid #eee;
        h1{
            font-size: 30px;
            font-weight: normal;
            margin: 5px 20px;
        }
        ul{
            margin: 10px 0;
        }
        li{
            float: left;
            font-size: 14px;
            color: #ccc;
        }
        i{
            padding: 0 5px;
        }
    }
    .clear:after{
        content: "";
        display: block;
        height: 0;
        clear: both;
    }
    .posts{
        height: 40px;
        border-top: 1px solid #ccc;
        margin-top: 20px;
        border-radius: 3px;
        line-height: 40px;
        padding: 0 10px;
        user-select: none;
        span{
            cursor: pointer;
        }
        span:hover{
            color: lightblue;
        }
        a{
            color: #000;
            text-decoration: none;
        }
    }
    .nextsPosts{
        float: right;
    }
</style>
