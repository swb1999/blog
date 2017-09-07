<template>
  <div style="width:700px">
       <el-form :model="data" ref="detail" label-width="100px" class="demo-ruleForm">
        <h3>接口详情</h3>
<el-form-item label="标题" >
    <el-input type="text" v-model="data.title" auto-complete="off"></el-input>
</el-form-item>
<el-form-item label="接口地址">
    <el-input v-model.number="data.url"></el-input>
</el-form-item>
<el-form-item label="类型">
  <el-input v-model.number="data.backorfont"></el-input>
    
</el-form-item>
<el-form-item label="请求类型" >
   <el-input v-model.number="data.type"></el-input>
</el-form-item>
<el-form-item label="请求参数">
    <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="data.sendparams" :autosize='{ minRows: 2, maxRows: 10 }'>
</el-input>
</el-form-item>
<el-form-item label="返回数据" >
    <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="data.getparams" :autosize='{ minRows: 2, maxRows: 10 }'>
</el-input>
</el-form-item>


</el-form>

  </div>
   
</template>

<script>
    export default {
        data() {
            return {
                data: null
            }
        },
        created() {
            console.log(this.$route)
            this.data = this.$route.params
        }
    }
</script>

<style scoped>
    h3 {
        margin: 20px 0 20px 40px
    }
</style>