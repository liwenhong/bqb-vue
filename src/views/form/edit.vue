<template>
  <div>
   <el-row v-for="(u,index) in topLists" :key="index">
      <!-- <div class="name">{{u.name}}</div> -->
      <el-col :span="5" v-for="(o,i) in u.data" :key="i"  style="margin:0 0px 10px 10px;">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="o.imgUrl" class="image">
          <div style="padding: 14px;">
            <span>{{u.name}}</span>
            <div class="bottom clearfix">
              <time class="time">{{o.updatedAt.substring(0,10)}}</time>
              <el-button type="text" class="button">编辑</el-button>
              <el-button type="text" class="button del" @click="delImgType(u.id)">删除</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
   </el-row>
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
import { getTopData ,delImage} from '@/api/bqb'
export default {
  data() {
    return {
      currentDate: new Date(),
      currentPage:1,
      pageSize:5,
      topLists:[],
      total:0
    };
  },
  mounted(){
    this.getData();
  },
  methods: {
    getData(){
      getTopData(this.currentPage,this.pageSize).then(res => {
        this.total = res.data.count;
        this.topLists = res.data.data;
      }).catch(error => {
        console.log(error);
      })
    },
    delImg(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          //删除，更新

        // delImage(t).then(res => {
        //   console.log(res);
        //   this.getData();
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!'
        //   });
        // })

        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
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
