<template>
  <div >
    <div class="add-source">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="一级名称" prop="typename">
          <el-input type="text" class="s-input" v-model="ruleForm.typename" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="二级名称" prop="name">
          <el-input type="text" class="s-input" v-model="ruleForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="素材关键字" prop="sourceKey">
          <el-input class="s-input" v-model="ruleForm.sourceKey"></el-input>
        </el-form-item>
        <el-form-item >
            <Upload  v-model="ruleForm.path" :title="ruleForm" v-on:input="uploadImg($event)" v-on:removeImg="removeImage($event)" ref="upload"></Upload>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script>
import Upload from "@/components/Upload/singleImage";
import { addImgSourceType,addImgSource } from "@/api/bqb"
export default {
  name: "addSource",
  data: function() {
    var validate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入名称"));
      }
      callback();
    };
    return {
      ruleForm: {
        typename: "",
        name: "",
        sourceKey: "",
        path: "",
        pid:"",
        imgName:""
      },
      rules: {
        typename: [{ validator: validate, trigger: "blur" }],
        name: [{ validator: validate, trigger: "blur" }]
      }
    };
  },
  components:{
    Upload
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
          this.$refs.upload.submitUpload();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async uploadImg(e) {
      //创建素材类型
      await addImgSourceType(this.ruleForm.typename).then(res => {
        //获得类型的id 并赋值到pid上
        this.ruleForm.pid = res.data.id;
      })
      this.ruleForm.path = e.imgPath;
      this.ruleForm.imgName = e.imgName;
      addImgSource(this.ruleForm).then(da => {
        console.log(da);
      })
    },
    removeImage(e) {
      console.log(e);
    }
  }
};
</script>
<style lang="scss" scoped>
.add-source {
  margin-top: 50px;
}
.s-input {
  width: 40%;
}
.btn {
  margin-top: 68px;
}
.el-upload__text {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.el-upload--picture-card {
  border: 0;
}
</style>


