<template>
  <div>
        <div class="select">
            <h3>一级分类</h3>
            <el-select v-model="value8" filterable placeholder="请选择">
                <el-option v-for="item in options" :key="item.id" :label="item.enname" :value="item.id"></el-option>
            </el-select>
        </div>
        <div class="from">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <h3>二级类名设置</h3>
                <el-form-item label="中文类名" prop="cn">
                    <el-input type="text" v-model="ruleForm2.cnname_two" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="英文类名" prop="entwo">
                    <el-input v-model.number="ruleForm2.enname_two"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
  </div>
</template>
<script>
import {ADD_SUCCESS,ADD_ERROR} from "../../../store/type_mutation"
import {mapActions} from "vuex"
  export default {
    data() {
        var entwo = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入英文标识'));
                } else {
                    console.log(this.ruleForm2.enname_two)
                    if (/^[A-Za-z]+$/.test(this.ruleForm2.enname_two)) {

                        callback();
                    } else {
                        callback(new Error('请输入英文'));
                    }
                }
            };
        return {
            options: [],
            value8: '',
            ruleForm2: {
                cnname_two: "",
                enname_two: "",
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
    created(){
        this.axios.get("/api/back_class/select_one_class")
            .then(function(result){
                this.options = result.data.data
            }.bind(this))
    },
    methods:{
        ...mapActions([ADD_SUCCESS.action_type,ADD_ERROR.action_type]),
        submitForm(formName) {
            var $this = this;
            this.$refs[formName].validate((valid) => {
                if (valid && $this.value8) {
                    console.log($this.value8)
                    $this.verifySuccess();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        verifySuccess(){
            const obj = {
               cnname_two:this.ruleForm2.cnname_two,
               enname_two:this.ruleForm2.enname_two,
               oneId:this.value8
            },
            $this = this;
            this.axios.post("/api/back_class/add_two_class",obj)
                .then((result)=>{
                    result.data.code === "1032" ? $this[ADD_SUCCESS.action_type]({this:$this,title:"添加成功",message:result.data.msg}) : $this[ADD_ERROR.action_type]({this:$this,title:"添加失败",message:result.data.msg})
                })
        }
    }
  }
</script>
<style scoped>
    .select{
        margin: 15px;
    }
    h3{
        margin-bottom:10px; 
    }
</style>
