<template>
 <div>
      <table class="tab" v-for="item in articleInfo">
        <tr class="one" >
            <td>一级分类:{{item.onedata.cnname}}</td>    
            <td>标识:{{item.onedata.enname}}</td>    
            <td>文章数量:0</td>    
            <td>
                <button type="button" @click.self="updatedInfoOne({oldenname_one:item.onedata.enname})">修改</button>
                <button type="button" @click.self="deleteOneClass({id:item.onedata.id,enname_one:item.onedata.enname})">删除</button>
            </td>    
        </tr>
        <tr v-for="val in item.twodata">
            <td>二级分类:{{val.cnname}}</td>    
            <td>表示:{{val.enname}}</td>    
            <td>文章数量:{{val.article_num}}</td>    
            <td>
                <button type="button" @click.self="updatedInfoTwo({oldenname_two:val.enname})">修改</button>
                <button type="button" @click.self="deleteInfoFn({oneId:item.onedata.id,twoId:val.id,enname_one:item.onedata.enname})">删除</button>
            </td>    
        </tr>
    </table>
    <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
        <span>确认要删除该分类吗?</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteBackData">确 定</el-button>
        </span>
    </el-dialog>
    <div class="updataAlert" v-show="updataState">
        <div class="from">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="中文类名" prop="cn">
                    <el-input type="text" v-model="ruleForm2.cnname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="英文类名" prop="entwo">
                    <el-input v-model.number="ruleForm2.enname"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button type="primary" @click="updataState=false">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
 </div>
</template>
<script>
import {ADD_SUCCESS,ADD_ERROR,ADD_ARTICLECLASS,ADD_DELETEARTICLECLASS,ADD_UPDATEDONE} from "../../../store/type_mutation"
import {mapState,mapActions} from "vuex"
    export default {
        data(){
            var entwo = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入英文标识'));
                } else {
                    if (/^[A-Za-z]+$/.test(this.ruleForm2.enname_two)) {
                        callback();
                    } else {
                        callback(new Error('请输入英文'));
                    }
                }
            }
            return {
                updataState:false,
                dialogVisible: false,
                deleteInfo:{},
                updatedInfo:{},
                ruleForm2: {
                    cnname: "",
                    enname: "",
                },
                rules2: {
                    cn: [{
                        validator: "",
                        trigger: 'blur'
                    }],
                    entwo: [{
                        validator: entwo,
                        trigger: 'blur'
                    }]
                }
            }
        },
        computed:{
            ...mapState({
                articleInfo:state=>state.backStore.articleInfo
            })
        },
        created(){
            this[ADD_ARTICLECLASS.action_type](this)
        },
        methods:{
            ...mapActions([ADD_SUCCESS.action_type,ADD_ERROR.action_type,ADD_ARTICLECLASS.action_type,ADD_DELETEARTICLECLASS.action_type,ADD_UPDATEDONE.action_type]),
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            updatedInfoOne(obj){
                this.updataState = true;
                this.updatedInfo.oldenname_one = obj.oldenname_one;
                this.updatedInfo.url = "/api/back_class/amend_class_one";
            },
            updatedInfoTwo(obj){
                this.updataState = true;
                this.updatedInfo.oldenname_two = obj.oldenname_two;
                this.updatedInfo.url = "/api/back_class/amend_class_two";
            },
            deleteInfoFn(option){
                this.dialogVisible = true;
                option.url = "/api/back_class/delete_two";
                this.deleteInfo = option;
            },
            deleteBackData(){
                var $this = this;
                this.dialogVisible = false
                this.axios.post(this.deleteInfo.url,this.deleteInfo)
                    .then(result=>{
                        console.log(result)
                        if(result.data.code === "1071"){
                            $this[ADD_SUCCESS.action_type]({this:$this,title:"删除成功",message:result.data.msg})
                            // $this.$router.go(0)
                            $this[ADD_DELETEARTICLECLASS.action_type]($this.deleteInfo)
                        }else{
                             $this[ADD_ERROR.action_type]({this:$this,title:"删除失败",message:result.data.msg})
                        }
                    })
            },
            deleteOneClass(option){
                this.dialogVisible = true;
                option.url = "/api/back_class/delete_one";
                this.deleteInfo = option;
            },
            submitForm(formName) {
            var $this = this;
            this.$refs[formName].validate((valid) => {
                if (valid && $this.ruleForm2.cnname) {
                    $this.verifySuccess();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        verifySuccess(){
            var $this = this;
            if(this.updatedInfo.oldenname_one){
                this.updatedInfo.cnname_one = this.ruleForm2.cnname;
                this.updatedInfo.enname_one = this.ruleForm2.enname;  
            }else{
                this.updatedInfo.cnname_two = this.ruleForm2.cnname;
                this.updatedInfo.enname_two = this.ruleForm2.enname; 
            }     
            this.updataState = false;
            this.axios.post(this.updatedInfo.url,this.updatedInfo)
                .then((result)=>{
                    if(result.data.code === "1052" || result.data.code === "1062"){
                        $this[ADD_SUCCESS.action_type]({this:$this,title:"修改成功",message:result.data.msg})
                        $this[ADD_UPDATEDONE.action_type]($this.updatedInfo)
                    }else{
                        $this[ADD_ERROR.action_type]({this:$this,title:"修改失败",message:result.data.msg})
                    } 
                })
            }
        }
    }
</script>
<style scoped>
    .tab{
        width: 800px;
        margin: 30px auto;
        border-collapse: collapse;
    }
    td{
        border:1px solid #ccc;
        text-align: center;
        padding: 5px 0;
    }
    .one{
        background: lightblue;
        margin: 20px 0;
    }
    .tab button{
        border:none;
        outline: none;
        padding: 5px 10px;
        cursor: pointer;
        margin: 0 5px;
        border-radius: 3px;
        border:1px solid #ccc;
        background: #fff;
    }
    .updataAlert{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
        position: absolute;
        top: 0;
        left: 0;
    }
    .from{
        width: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%,-50%,0);
        background: #fff;
        padding: 15px 20px;
        border-radius: 5px;
    }
</style>

