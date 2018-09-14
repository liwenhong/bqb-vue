<template>
  <div>
   <el-row v-for="(u,index) in topLists" :key="index">
      <div class="name">{{u.serieName}}
         <el-button type="danger" class="serieDel" @click="serieDel(u.serieId)">删除</el-button>
         <el-button type="primary" class="serieDel" @click="addSerieById(u.serieId)">续传</el-button>
      </div>
      <el-col :span="5" v-for="(o,i) in u.data" :key="i"  style="margin:0 0px 10px 10px;">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="o.path" class="image">
          <div style="padding: 14px;">
            <span>{{o.imgDescribe}}</span>
            <div class="bottom clearfix">
              <time class="time">{{o.updatedAt.substr(0,10)}}</time>
              <el-button type="text" class="button" @click="editBq(o.id,o)">编辑</el-button>
              <el-button type="text" class="button del" @click="delById(o.id)">删除</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
   </el-row>

    <el-dialog title="编辑表情" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
        <el-form label-width="80px" :model="editTableData">
          <el-form-item label="ID">
            <el-input v-model="editTableData.id" readonly></el-input>
          </el-form-item>
          <el-form-item label="系列名称">
            <el-input v-model="editTableData.serieName"></el-input>
          </el-form-item>
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
                action="http://120.77.250.76:3000/api/file/uploadToQiNiu"
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
           <el-form-item label="是否热门">
             <el-switch
              v-model="editTableData.isHot"
              active-color="#13ce66"
              inactive-color="#eaeaea">
            </el-switch>
          </el-form-item>
           <el-form-item label="是否置顶">
             <el-switch
              v-model="editTableData.isTop"
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
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total" style="text-align: center;margin-top: 50px;">
    </el-pagination>
  </div>
</div>


</template>

<script>
import { getHotData } from '@/api/bqb'
export default {
  data() {
    return {
      currentDate: new Date(),
      currentPage:1,
      pageSize:5,
      topLists:[],
      total:0,
      dialogTableVisible:false,
      editTableData:{}
    };
  },
  mounted(){
    this.getData();
  },
  methods: {
    addSerieById(serieId){
      console.log(serieId)
      this.$router.push({name:'addSerieBq', params: { serieId: serieId}})
    },
    getData(){
      // getHotData(this.currentPage,this.pageSize).then(res => {
      //   this.total = res.data.count;
      //   this.topLists = res.data.data;
      // }).catch(error => {
      //   console.log(error);
      // })
      this.$get("bq/querySerieBq",{curPage:this.currentPage,pageSize:this.pageSize,isHot:true,isTop:false}).then(res => {
        this.topLists = res.data.lists;
        this.total = res.data.total;
      })
    },
    serieDel(serieId){
      this.$confirm('确定删除该系列表情, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          //删除，更新
          this.$post("bq/delSerieBq",{serieId:serieId}).then(res => {
            this.$message({
              type: 'info',
              message: '删除成功'
            });
            this.getData();
          }).catch(error => {
            this.$message({
              type: 'info',
              message: '删除失败'
            });
          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    delById(id){
      this.$post("bq/delBq",{id:id}).then(res =>{
        this.$message({
          type: 'info',
          message: '删除成功'
        });
        this.getData();
      }).catch(error => {
        this.$message({
          type: 'warning',
          message: '删除失败'
        });
      })
    },
    editBq(id,item){
      this.dialogTableVisible = true;
      this.editTableData = item;
    },
    submitForm(){
      console.log(this.editTableData);
      this.$post("bq/updateBq",this.editTableData).then(res => {
        this.$message("修改成功")
        this.dialogTableVisible = false;
      }).catch(error => {
        this.$message.error("修改失败")
        this.dialogTableVisible = false;
      })
    },
    resetForm(){
      this.dialogTableVisible = false;
    },
    handleImageScucess(file) {
      console.log(file)
      this.editTableData.path = file.data.imgPath;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.name {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  position: relative;
}
.serieDel{
  // position: absolute;
  // right: 10px;
  // top: 10px;
  float: right;
  margin-left: 10px;

}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0 0 0 5px;
  float: right;

  // border: 1px solid #eaeaea;
  // padding: 5px;
}
.del{
  color:red;
}

.image {
  width: 100%;
  display: block;
  height: 200px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
