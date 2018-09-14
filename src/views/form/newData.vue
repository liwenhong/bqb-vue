<template>
  <div>
   <el-row>
      <!-- <div class="name">{{u.name}}</div> -->
      <el-col :span="5" v-for="(o,i) in topLists" :key="i"  style="margin:0 0px 10px 10px;">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="o.imgUrl" class="image">
          <div style="padding: 14px;">
            <span>{{o.imgContent}}</span>
            <div class="bottom clearfix">
              <time class="time">{{o.updatedAt.substring(0,10)}}</time>
              <el-button type="text" class="button">编辑</el-button>
              <el-button type="text" class="button del" @click="delImg(o.uid)">删除</el-button>
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
import { getNewData } from '@/api/bqb'
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
      getNewData(this.currentPage,this.pageSize).then(res => {
        this.total = res.data.count;
        this.topLists = res.data.rows;
        console.log(this.topLists)
      }).catch(error => {
        console.log(error);
      })
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
