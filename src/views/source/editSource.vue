<template>
  <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="updatedAt"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="typename"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column label="操作">
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
          <el-form-item label="名称">
            <el-input v-model="editTableData.typename"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">修改</el-button>
            <el-button @click="resetForm()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>
<script>
import { getSourceType ,delSourceType,updateSourceType} from '@/api/bqb'
export default {
  name:'editSource',
  data:function(){
    return {
      tableData:[],
      dialogTableVisible:false,
      editTableData:{}
    }
  },
  mounted(){
    this.getTypeList();
  },
  methods:{
    getTypeList(){
      getSourceType().then(res => {
        console.log(res);
        this.tableData = res.data;
      }).catch(error => {
        console.log(error)
      })
    },
    handleEdit(index,item){
      console.log(index,',,,,,',item)
      this.dialogTableVisible = true;
      this.editTableData = item;
    },
    handleDelete(index,item){
      console.log(index,',,,,,',item)
      let self = this;
      this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          //删除 操作
          delSourceType(item.id).then(res =>{
            self.$message({
            type: 'success',
            message: '删除成功!'
          });
          self.getTypeList();
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

    },
    submitForm(){
      console.log(this.editTableData);
      if(this.editTableData.typename == ""){
        this.$message('类型名称不能为空');
        return ;
      }
      //修改
      updateSourceType(this.editTableData.id,this.editTableData.typename).then(res =>{
        console.log(res)
        this.$message("修改成功")
        this.dialogTableVisible = false;
      }).catch(error => {
        this.$message("修改失败")
      })
    },
    resetForm(){
      this.dialogTableVisible = false;
    }
  }
}
</script>
<style lang="scss" scoped>

</style>


