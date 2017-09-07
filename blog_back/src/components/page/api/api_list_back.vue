<template>
  <div class="body">
    <el-table
    :data="everypage"
    style="width: 100%"
    :row-class-name="tableRowClassName" @row-dblclick.self="clickfn">
    <el-table-column
      prop="title"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="backorfont"
      label="前后端分类"
      width="180">
    </el-table-column>
    <el-table-column
      prop="time"
      label="时间" 
      width="300">
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

<style>
    .el-table .info-row {
        background: #c9e5f5;
    }
    
    .el-table .positive-row {
        background: #e2f0e4;
    }
</style>

<script>
    export default {
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
                this.$router.push({
                    name: "api_detail",
                    params: row
                })
            },
            // 修改
            handleEdit(index, rows) {
                console.log(rows)
                this.$router.push({
                    name: "api_amend",
                    params: rows
                })
            },
            // 点击触发弹窗
            handleDelete(index, rows) {
                this.itemId = rows.id
                this.dialogVisible = true
                console.log(this.itemId)

            },
            // 确定后调用删除接口
            deleteFn() {
                this.axios.post("/api/apilist/delete", {
                    id: this.itemId
                }).then(function(data) {
                    console.log(data.data)
                    if (data.data.code == "2032") {
                        this.dialogVisible = false
                        this.open2()
                        this.$router.go(0)
                    } else {
                        this.dialogVisible = false
                        this.open4()
                    }
                    console.log(this.alldata)
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
        data() {
            return {
                itemId: "", //删除时使用的id
                dialogVisible: false, //删除弹窗的控制
                currentPage4: 0, //当前显示页
                alldata: [], //请求的元数据
                everypagelist: 5, //默认每页显示条数
                everypage: [] //每页的数据
            }
        },
        mounted() {

            this.axios.get("/api/apilist/list?type=back").then(function(data) {
                this.alldata = data.data.data
                console.log(this.alldata)
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