<template>
  <div>
      <!-- 筛选 -->
      <div class="filter-container">
        <div class="filter-item">
          <!-- <label>关键词：</label> -->
          <el-input placeholder="请输入表情包关键词" v-model="keyword" />
        </div>
        <div class="filter-item">
          <el-button icon="el-icon-search" type="primary" size="small" @click="getTypeList()" :loading="loading.table">搜索</el-button>
        </div>
      </div>

      <el-table
        :data="tableData"
        stripe
        style="width: 100%" v-loading="loading.table">
         <el-table-column
          prop="id"
          label="ID"
          width="50"
          >
        </el-table-column>
        <el-table-column
          prop="updatedAt"
          label="日期"
          >
        </el-table-column>
        <!-- <el-table-column
          prop="serieName"
          label="系列名称">
        </el-table-column> -->
         <el-table-column
          prop="imgDescribe"
          label="表情描述"
          >
        </el-table-column>
         <el-table-column label="图片">
           <template slot-scope="scope">
             <div>
               <img style="width:100px;" :src="scope.row.path" alt="">
             </div>
           </template>
        </el-table-column>
        <el-table-column
          prop="searchKey"
          label="搜索关键字"
          >
        </el-table-column>
        <el-table-column
          prop="imgName"
          label="图片名称"
          >
        </el-table-column>
         <!-- <el-table-column label="是">
           <template slot-scope="scope">
             <div>
               <img style="width:100px;" :src="scope.row.path" alt="">
             </div>
           </template>
        </el-table-column> -->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="编辑表情" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
        <el-form label-width="80px" :model="editTableData">
          <el-form-item label="ID">
            <el-input v-model="editTableData.id" readonly></el-input>
          </el-form-item>
          <!-- <el-form-item label="系列名称">
            <el-input v-model="editTableData.serieName"></el-input>
          </el-form-item> -->
          <el-form-item label="表情描述">
            <el-input v-model="editTableData.imgDescribe"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <!-- <el-input v-model="editTableData.name"></el-input> -->
            <div>
              <img  :src="editTableData.path" alt="">
              <el-upload
                class="upload-demo"
                ref="upload"
                name="avatar"
                action="https://api.doutub.com/api/file/uploadMulterToQN"
                :on-success="handleImageScucess"
                >
                <el-button slot="trigger" size="small" type="primary">修改图片</el-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="搜索关键字">
            <el-input v-model="editTableData.searchKey"></el-input>
          </el-form-item>
          <el-form-item label="图片名称">
            <el-input v-model="editTableData.imgName"></el-input>
          </el-form-item>
          <el-form-item label="是否显示在首页">
             <el-switch
              v-model="editTableData.isShowIndex"
              active-color="#13ce66"
              inactive-color="#eaeaea">
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">修改</el-button>
            <el-button @click="resetForm()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="curpage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total" style="text-align: center;margin-top: 50px;">
          </el-pagination>
        </div>
  </div>
</template>
<script>
export default {
  name: 'searchKeyWord',
  data: function() {
    return {
      tableData: [],
      dialogTableVisible: false,
      editTableData: {},
      total: 0,
      curpage: 1,
      pageSize: 15,
      keyword: '',
      loading: {
        table: false
      }
    }
  },
  mounted() {

  },
  methods: {
    getTypeList() {
      //  判断有没有关键词
      if (!this.keyword) {
        this.$message.error('请输入表情包关键词')
        return
      }
      this.loading.table = true
      this.$get('bq/search', { pageSize: this.pageSize, curPage: this.curpage, keyword: this.keyword }).then(res => {
        this.total = res.data.count
        this.tableData = res.data.rows
        this.loading.table = false
      }).catch(() => {
        this.$message.error('查询失败')
        this.loading.table = false
      })
    },
    handleEdit(index, item) {
      this.dialogTableVisible = true
      this.editTableData = item
    },
    handleDelete(index, item) {
      const self = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 删除 操作
        this.$post('bq/delBq', { id: item.id }).then(res => {
          self.$message({
            type: 'success',
            message: '删除成功!'
          })
          self.getTypeList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitForm() {
      // 修改
      this.$post('bq/updateBq', this.editTableData).then(res => {
        this.$message('修改成功')
        this.dialogTableVisible = false
        this.getTypeList()
      }).catch(() => {
        this.$message.error('修改失败')
        this.dialogTableVisible = false
      })
    },
    resetForm() {
      this.dialogTableVisible = false
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getTypeList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.curpage = val
      this.getTypeList()
    },
    handleImageScucess(file) {
      console.log(file)
      this.editTableData.path = file.data.imgPath
    }
  }
}
</script>
<style lang="scss" scoped>

</style>


