<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
         <el-form-item label="作者">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="时间">
            <el-date-picker
                v-model="form.time"
                type="datetime"
                placeholder="选择日期时间"
                @change="timeChange">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="推荐">
            <el-radio-group v-model="form.recommendState">
            <el-radio label="1">yes</el-radio>
            <el-radio label="0">no</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
            <el-radio-group v-model="form.stateState">
            <el-radio label="1">yes</el-radio>
            <el-radio label="0">no</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="导读">
            <el-input type="textarea" v-model="form.introduction"></el-input>
        </el-form-item>
            <div id="container" style="width:800px"></div>  
        <el-form-item>
            <el-button type="primary" @click="onSubmit">发表</el-button>
            <el-button>保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {ADD_SUCCESS,ADD_ERROR} from "../../../store/type_mutation"
    import {mapActions} from "vuex"
  export default {
    data() {
        return {
            form: {
                title:"",
                name: "",
                time:"",
                recommendState: "0",
                stateState:"0",
                introduction: "",
            },
            options: [],
            selectedOptions: [],
            ue:null
        }
    },
    methods: {
        ...mapActions([ADD_SUCCESS.action_type,ADD_ERROR.action_type]),
        onSubmit() {
            var flag = true;
            for(var key in this.form){
                !this.form[key] && (flag = false) 
            }
            //获取html内容，返回: <p>hello</p>
            var html = this.ue.getContent();
            flag = html ? true : false
            flag ? this.addArticle(this.form) : alert("信息不完整,请查看")
        },
        handleChange(value) {
            this.form.oneId = value[0];
            this.form.twoId = value[1];
        },
        timeChange(){
            this.form.time = arguments[0]
        },
        addArticle(options){
            var params = {},$this = this;
            params.article_name = options.title;
            params.editer = options.name;
            params.content =  this.ue.getContent();
            params.time = options.time;
            params.daodu = options.introduction;
            params.imgsrc = "/static/images/166c9a7c97d84c9.jpg";
            params.recommend = options.recommendState;
            params.art_show = options.stateState;
            params.enname_one = options.enname_one;
            params.id = options.id;
            params.visitors = 6;
            this.axios.post("/api/back_article/amendArticle",params)
                .then(result=>{
                    result.data.code === "3031" ? $this[ADD_SUCCESS.action_type]({this:$this,title:"文章修改成功",message:result.data.msg}) : $this[ADD_ERROR.action_type]({this:$this,title:"文章修改失败",message:result.data.msg})
                })
        }
    },
    created(){
        console.log(this.$route.params)
        this.form.title = this.$route.params.article_name;
        this.form.name = this.$route.params.editer;
        this.form.time = this.$route.params.time;
        this.form.recommendState = this.$route.params.recommend + "";
        this.form.stateState = this.$route.params.art_show + "";
        this.form.introduction = this.$route.params.daodu;
        this.form.id = this.$route.params.id;
        this.form.enname_one = this.$route.params.enname_one;
    },
    mounted(){
       this.ue = UE.getEditor('container');
       this.ue.ready(function(){
           this.ue.setContent(this.$route.params.content)
       }.bind(this))
    }
  }
</script>
<style scoped>
    .quill{
        width: 800px;
        margin-bottom: 20px;
    }
</style>
