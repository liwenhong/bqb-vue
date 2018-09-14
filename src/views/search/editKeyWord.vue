<template>
  <div>
    <div class="hottoday" style="margin-top:50px;">今日热门</div>
     <el-checkbox :indeterminate="isHotIndeterminate" v-model="checkHotAll" @change="handleCheckHotAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkeHotArr" @change="handleCheckedHotChange">
        <el-checkbox v-for="item in hotList" :label="item.id" :key="item.id">{{item.searchKey}}</el-checkbox>
    </el-checkbox-group>
    <div class="realsearch" style="margin-top:50px;">实时搜索</div>
     <el-checkbox :indeterminate="isNewIndeterminate" v-model="checkNewAll" @change="handleCheckNewAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedNewArr" @change="handleCheckedNewChange">
        <el-checkbox v-for="item in newList" :label="item.id" :key="item.id">{{item.searchKey}}</el-checkbox>
    </el-checkbox-group>

    <div style="margin-top:50px;">
      <el-button type="primary" @click="delKeyWord()">删除</el-button>
      <el-button @click="reset()">重置</el-button>
    </div>

  </div>
</template>
<script>
import { getKeyWord ,delKeyWord} from "@/api/bqb";
export default {
  name: "editKeyWord",
  data() {
    return {
      checkHotAll: false,
      checkNewAll: false,
      checkedNewArr: [],
      checkeHotArr: [],
      keyWordLists: [],
      isHotIndeterminate: true,
      isNewIndeterminate: true,
      hotList: [],
      newList: []
    };
  },
  mounted() {
    this.getKeyWordList();
  },
  methods: {
    getKeyWordList() {
      // this.$get(1,50).then(res =>{
      //       console.log(res);
      //     })
      for (let i = 1; i < 3; i++) {
        // (function(i){
        getKeyWord(i, 50).then(res => {
          console.log(res);
          if (i == 1) {
            this.hotList = res.data.rows;
          } else {
            this.newList = res.data.rows;
          }
        });
        // })(i)
      }
    },
    handleCheckHotAllChange(val) {
      console.log(val);
      let temp = [];
      if (val) {
        for (let i = 0; i < this.hotList.length; i++) {
          temp.push(this.hotList[i].id);
        }
        // this.checkeHotArr = this.temp;
      }
      this.checkeHotArr = val ? temp : [];
      this.isHotIndeterminate = false;
    },
    handleCheckNewAllChange(val) {
      let temp = [];
      if (val) {
        for (let i = 0; i < this.newList.length; i++) {
          temp.push(this.newList[i].id);
        }
        // this.checkeHotArr = this.temp;
      }
      this.checkedNewArr = val ? temp : [];
      this.isNewIndeterminate = false;
    },
    handleCheckedHotChange(value) {
      // console.log(id,name)
      let checkedCount = value.length;
      this.checkHotAll = checkedCount === this.hotList.length;
      this.isHotIndeterminate =
        checkedCount > 0 && checkedCount < this.hotList.length;
    },
    handleCheckedNewChange(value) {
      let checkedCount = value.length;
      this.checkNewAll = checkedCount === this.newList.length;
      this.isNewIndeterminate =
        checkedCount > 0 && checkedCount < this.newList.length;
    },
    delKeyWord(){
      if(this.checkedNewArr.length === 0 && this.checkeHotArr.length === 0){
        this.$message({
          message: '请至少选择一项',
          type: 'warning'
        })
      }
      let res = this.checkeHotArr.concat(this.checkedNewArr);

      delKeyWord(res.join(',')).then(res => {
        this.$message({
          message:res.data,
          type:'success'
        })
        //刷新
        this.getKeyWordList();
      }).catch(err => {
        this.$message({
          message:'删除失败',
          type:'fail'
        })
      })
    },
    reset(){
      this.checkedNewArr = [];
      this.checkHotAll =[];
      this.checkHotAll = false;
      this.checkHotAll = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>


