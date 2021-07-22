<template>
  <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
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
        <el-table-column
          prop="typename"
          label="一级名称"
          >
        </el-table-column>
         <el-table-column
          prop="name"
          label="二级名称"
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
          prop="sourceKey"
          label="搜索关键字"
          >
        </el-table-column>
        <el-table-column
          prop="imgName"
          label="图片名称"
          >
        </el-table-column>
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

      <el-dialog title="编辑素材类型" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
        <el-form label-width="80px" :model="editTableData">
          <el-form-item label="ID">
            <el-input v-model="editTableData.id" readonly></el-input>
          </el-form-item>
          <el-form-item label="一级名称">
            <el-input v-model="editTableData.typename"></el-input>
          </el-form-item>
          <el-form-item label="二级名称">
            <el-input v-model="editTableData.name"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <!-- <el-input v-model="editTableData.name"></el-input> -->
            <div>
              <img style="width:100%;"  :src="editTableData.path" alt="">
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
            <el-input v-model="editTableData.sourceKey"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input type="number" v-model="editTableData.sort" placeholder="值越大排名越前"></el-input>
          </el-form-item>
          <el-form-item label="图片名称">
            <el-input v-model="editTableData.imgName"></el-input>
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
            :page-size="pagesize"
            layout="prev, pager, next, jumper"
            :total="total" style="text-align: center;margin-top: 50px;">
          </el-pagination>
        </div>
  </div>
</template>
<script>
import { getSourceList, delSource, updateSource } from '@/api/bqb'
export default {
  name: 'editSource',
  data: function() {
    return {
      tableData: [],
      dialogTableVisible: false,
      editTableData: {},
      total: 0,
      curpage: 1,
      pagesize: 15
    }
  },
  mounted() {
    this.getTypeList()
  },
  methods: {
    getTypeList() {
      getSourceList(this.pagesize, this.curpage).then(res => {
        this.total = res.data.count
        this.tableData = res.data.rows
      }).catch(error => {
        console.log(error)
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
        delSource(item.id).then(res => {
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
      if (this.editTableData.typename === '') {
        this.$message('类型名称不能为空')
        return
      }
      // 修改
      updateSource(this.editTableData).then(res => {
        console.log(res)
        this.$message('修改成功')
        this.dialogTableVisible = false
      }).catch(() => {
        this.$message('修改失败')
      })
    },
    resetForm() {
      this.dialogTableVisible = false
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getTypeList()
    },
    handleCurrentChange(val) {
      this.curpage = val
      this.getTypeList()
    },
    handleImageScucess(file) {
      this.editTableData.path = file.data.imgPath
    }
  }
}
</script>
<style lang="scss" scoped>

</style>


