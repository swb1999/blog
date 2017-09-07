<template>
  <div style="width:700px">
<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <h3>修改接口文档</h3>
<el-form-item label="标题" prop="title">
    <el-input type="text" v-model="ruleForm2.title" auto-complete="off"></el-input>
</el-form-item>
<el-form-item label="接口地址" prop="url">
    <el-input v-model.number="ruleForm2.url"></el-input>
</el-form-item>
<el-form-item label="类型" prop="backorfont">
  <el-select v-model.number="ruleForm2.backorfont" placeholder="请选择">
    <el-option
      v-for="item in options_fontorback"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    
</el-form-item>
<el-form-item label="请求类型" prop="type">
  <el-select v-model.number="ruleForm2.type" placeholder="请选择">
    <el-option
      v-for="item in options_type"
      :key="item.value"
      :label="item.label"
      :value="item.value" >
    </el-option>
  </el-select>
  
</el-form-item>
<el-form-item label="请求参数" prop="sendparams" >
    <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="ruleForm2.sendparams" :autosize='{ minRows: 2, maxRows: 10 }'>
</el-input>
</el-form-item>
<el-form-item label="返回数据" prop="getparams">
    <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="ruleForm2.getparams" :autosize='{ minRows: 2, maxRows: 10 }'>
</el-input>
</el-form-item>

<el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
</el-form-item>
</el-form>
  </div>
    

</template>

<script>
    export default {
        data() {
            return {
                options_fontorback: [{
                    value: 'back',
                    label: '后台接口'
                }, {
                    value: 'font',
                    label: '前台接口'
                }],
                options_type: [{
                    value: 'get',
                    label: 'get'
                }, {
                    value: 'post',
                    label: 'post'
                }, {
                    value: 'formdata',
                    label: 'formdata'
                }],
                ruleForm2: {
                    title: "",
                    url: "",
                    backorfont: "",
                    type: "",
                    sendparams: "",
                    getparams: "",
                },
                rules2: {
                    title: [{
                        required: true,
                        message: '请输入接口名称',
                        trigger: 'blur'
                    }],
                    url: [{
                        required: true,
                        message: '请输入接口地址',
                        trigger: 'blur'
                    }],
                    backorfont: [{
                        required: true,
                        message: '请选择接口归属类型',
                        trigger: 'blur'
                    }],
                    type: [{
                        required: true,
                        message: '请选择接口请求类型',
                        trigger: 'blur'
                    }],
                    sendparams: [{
                        required: true,
                        message: '请输入接口发送参数',
                        trigger: 'blur'
                    }],
                    getparams: [{
                        required: true,
                        message: '请输入接口返回参数',
                        trigger: 'blur'
                    }]
                }
            };
        },
        created() {
            console.log(this.$route)
            this.ruleForm2 = this.$route.params
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');

                        this.axios.post("/api/apilist/amend", this.ruleForm2).then(function(data) {

                            if (data.data.code == "2022") {
                                this.open2()
                                this.$router.go(-1)
                            } else {
                                this.open4()
                            }
                        }.bind(this))

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 成功消息提示
            open2() {
                this.$message({
                    message: '恭喜你，修改消息成功',
                    type: 'success'
                });
            },
            // 失败消息提示
            open4() {
                this.$message.error('不好意思，修改失败');
            }
        }
    }
</script>

<style scoped>
    h3 {
        margin: 20px 0 20px 40px
    }
    
    .textarea {
        width: 400px;
        height: 500px;
    }
</style>