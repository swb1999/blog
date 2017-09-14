<template>
    <el-carousel :interval="5000" arrow="always">
         <el-carousel-item v-for="(item,index) in 4" :key="index">
            <img src="/static/images/skater-in-air.jpg" alt="">
        </el-carousel-item> 
    </el-carousel>
</template>
<script>
   
</script>
<style scoped>
  img{
      width: 100%;
      height: 100%;
  }
</style>