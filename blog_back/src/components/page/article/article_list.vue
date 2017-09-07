<template>
  <div class="body">
    <el-table
    :data="everypage"
    :row-class-name="tableRowClassName" 
    @row-dblclick.self="clickfn">
    <el-table-column
      prop="article_name"
      label="文章名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="editer"
      label="作者"
      width="100">
    </el-table-column>
     <el-table-column
      prop="recommend"
      label="是否推荐"
      width="100">
    </el-table-column>
    <el-table-column
      prop="art_show"
      label="是否隐藏"
      width="180">
    </el-table-column>
    <el-table-column
      prop="time"
      label="时间" 
      width="180">
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
</el-table-column>
</el-table>
<div class="block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5, 10, 15, 20]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="alldata.length">
    </el-pagination>
</div>
<el-dialog title="提示" :visible.sync="dialogVisible" size="tiny">
    <span>确定删除此接口文档</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteFn">确 定</el-button>
  </span>
</el-dialog>

</div>

</template>



<script>
    import {mapState} from "vuex"
    export default {
        data() {
            return {
                itemId: "", //删除时使用的id
                dialogVisible: false, //删除弹窗的控制
                currentPage4: 0, //当前显示页
                alldata: [], //请求的元数据
                everypagelist: 5, //默认每页显示条数
                everypage: [], //每页的数据
                deleteRows:null
            }
        },
        methods: {
            tableRowClassName(row, index) {
                if (index === 1) {
                    return 'info-row';
                } else if (index === 3) {
                    return 'positive-row';
                }
                return '';
            },
            handleSizeChange(val) {
                this.everypagelist = val

            },
            handleCurrentChange(val) {

                this.everypage = this.alldata.slice(this.everypagelist * (val - 1), this.everypagelist * val)

            },
            // 跳转详情
            clickfn(row, event, column) {
                // this.$router.push({
                //     name: "api_detail",
                //     params: row
                // })
            },
            // 修改
            handleEdit(index, rows) {
                this.$router.push({
                    name:"amend_article",
                    params:rows
                })
            },
            // 点击触发弹窗
            handleDelete(index, rows) {
                this.dialogVisible = true;
                this.deleteRows = rows;
            },
            // 确定后调用删除接口
            deleteFn() {
                console.log(this.deleteRows)
                this.axios.post("/api/back_article/deleteOne", {
                    id: this.deleteRows.id,
                    enname_one:this.deleteRows.enname_one
                }).then(function(data) {
                   this.dialogVisible = false
                    if (data.data.code == "3041") {
                        this.open2()
                        this.$router.go(0)
                    } else {
                        this.open4()
                    }
                }.bind(this))
            },
            // 成功消息提示
            open2() {
                this.$message({
                    message: '恭喜你，删除消息成功',
                    type: 'success'
                });
            },
            // 失败消息提示
            open4() {
                this.$message.error('不好意思，删除失败');
            }
        },
        computed:{
            ...mapState({
                classlist:state=>state.backStore.articleInfo
            })
        },
        mounted() {
             this.axios.get("/api/back_article/getArticle")
                .then(function(result){
                    this.alldata = result.data.data;
                }.bind(this))
        }
    }
</script>
<style scoped>
    .body {
        margin: 20px 0;
    }
    
    .block {
        margin: 40px auto;
    }
    
    .block div {
        text-align: center
    }
</style>
<style>
    .el-table .info-row {
        background: #c9e5f5;
    }
    
    .el-table .positive-row {
        background: #e2f0e4;
    }
</style>

