<template>
    <div class="container">
        <h2>文件管理</h2>
        <ul class="contnet">    
            <li class="tit">
                <span><input type="checkbox"></span>
                <span>产品名称</span>
                <span>名称分类</span>
                <span>录入时间</span>
                <span>操作</span>
            </li>
            <li class="listContent">
                <span><input type="checkbox"></span>
                <span>name1</span>
                <span>分类1</span>
                <span>2017-8-31</span>
                <span><button>修改</button><button>删除</button></span>
            </li>
            <li class="listContent">
                <span><input type="checkbox"></span>
                <span>name2</span>
                <span>分类1</span>
                <span>2017-8-31</span>
                <span><button>修改</button><button>删除</button></span>
            </li>
            <li class="listContent">
                <span><input type="checkbox"></span>
                <span>name3</span>
                <span>分类2</span>
                <span>2017-8-31</span>
                <span><button>修改</button><button>删除</button></span>
            </li>
        </ul>
        <div class="page">
            <el-pagination
                :page-size="20"
                layout=" prev, pager, next,total , jumper"
                :total="1000">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeNames: ['1']
            };
        }
    }
</script>
<style scoped>
    .container {
        width: 100%;
        height: auto;
    }
    
    .container .content {
        width: 100%;
    }
    
    .contnet .tit {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border: 1px solid aqua;
        margin-bottom: 3px;
    }
    
    .contnet span {
        display: inline-block;
        width: 200px;
        text-align: center;
    }
    
    .contnet span:nth-child(1) {
        width: 100px;
    }
    
    .contnet span:nth-child(2),
    .contnet span:nth-child(3) {
        width: 300px;
    }
    
    .container .listContent:nth-child(even) {
        background: #fafafa;
    }
    
    .container .listContent button {
        width: 50px;
        margin: 0 3px;
        border: none;
        outline: none;
        background: darkcyan;
        color: #fff;
    }
    
    .page {
        text-align: center;
        margin-top: 30px;
    }
    
    h2 {
        font-size: 16px;
        line-height: 35px;
    }
</style>