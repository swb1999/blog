<template>
    <div class="list">
         <slot name="class_one">Archives</slot> 
        <ul>
            <slot><a href="#">August 2011</a>&nbsp;(1)</slot>
	    </ul>
    </div>
</template>
<script>
    export default {

    }
</script>
<style lang="scss" scoped>
    .list{
        margin: 30px 0;
    }
    h3{
        background: #000;
        color: #fff;
    }
    h3,li{
        height: 35px;
        line-height: 35px;
        padding-left: 20px;
    }
    li{
        font-size: 12px;
        border-bottom: 1px dashed  #959494;
    }
    a{
        color: #959494;
        text-decoration: none;
    }
    a:hover{
        color: #888A13;
    }
</style>

