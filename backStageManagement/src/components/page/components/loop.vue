<template>
    <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in 4" :key="item">
            <img src="/static/images/skater-in-air.jpg" alt="">
        </el-carousel-item>
    </el-carousel>
</template>
<script>
    export default{

    }
</script>
<style>
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>