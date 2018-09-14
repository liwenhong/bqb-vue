<template>
  <div>
    <el-form :model="keyWordForm" status-icon :rules="rules2" ref="keyWordForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="搜索关键字" prop="searchKey" >
        <el-input type="text" v-model="keyWordForm.searchKey" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="关键字类型">
        <el-select v-model="keyWordForm.typeName" placeholder="选择关键字类型">
          <el-option label="今日热门" value="今日热门"></el-option>
          <el-option label="实时热搜" value="实时热搜"></el-option>
          <el-option label="热搜关键字" value="热搜关键字"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('keyWordForm')">提交</el-button>
        <el-button @click="resetForm('keyWordForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addSearchKey } from "@/api/bqb.js";
export default {
  name: "addKeyWord",
  data() {
    var checkKeyWord = (rule, value, callback) => {
      if (!value || value == "") {
        return callback(new Error("搜索关键字不能为空"));
      }
      callback();
    };
    return {
      keyWordForm: {
        typeId: 1,
        typeName: "今日热门",
        searchKey: ""
      },
      rules2: {
        searchKey: [{ validator: checkKeyWord, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.keyWordForm.typeId = this.keyWordForm.typeName == "今日热门" ? 1 : (this.keyWordForm.typeName == "实时热搜"?2:3);
          addSearchKey(this.keyWordForm)
            .then(res => {
              console.log(res);
              //提示
              this.$message({
                message: "添加成功",
                type: "success"
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>


