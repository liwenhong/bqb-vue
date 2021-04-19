<template>
  <div >
    <div class="add-source">



      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
        <el-form-item label="选择栏目" prop="type">
          <el-select v-model="ruleForm.typeId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="表情描述" prop="imgDescribe">
          <el-input type="text" class="s-input" v-model="ruleForm.imgDescribe" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="搜索关键字" prop="searchKey">
          <el-input type="text" class="s-input" v-model="ruleForm.searchKey" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片名称" prop="searchKey">
          <el-input type="text" class="s-input" v-model="ruleForm.imgName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否显示在首页" prop="isShowIndex">
          <el-switch
            v-model="ruleForm.isShowIndex"
            active-color="#13ce66"
            inactive-color="#eaeaea">
          </el-switch>
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
import Upload from '@/components/Upload/singleImage';
import { addImgSourceType, addImgSource } from '@/api/bqb'
export default {
  name: 'addSource',
  data: function() {
    // var validate = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("不能为空"));
    //   }
    //   callback();
    // };
    return {
      ruleForm: {
        searchKey: '',
        path: '',
        imgName: '',
        typeId: '1', // 栏目id
        isShowIndex: false, // 是否显示在首页，默认false
        imgDescribe: '', // 图片描述
        uid: ''
      },
      // rules: {
      //   typename: [{ validator: validate, trigger: "blur" }],
      //   name: [{ validator: validate, trigger: "blur" }]
      // },
      options: [{
        value: '1',
        label: '最新表情'
      }, {
        value: '3',
        label: '汪星人'
      },
      {
        value: '4',
        label: '喵星人'
      }]
      // value: ''
    }
  },
  components: {
    Upload
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm)
          this.$refs.upload.submitUpload()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$refs.upload.clearFiles()
    },
    async uploadImg(e) {
      // 创建素材类型
      // await addImgSourceType(this.ruleForm.typename).then(res => {
      //   //获得类型的id 并赋值到pid上
      //   this.ruleForm.pid = res.data.id;
      // })
      this.ruleForm.path = e.imgPath
      // this.ruleForm.imgName = e.imgName;
      this.ruleForm.uid = e.uid
      this.$post('bq/add', this.ruleForm).then(res => {
        console.log(res)
      })

      // addImgSource(this.ruleForm).then(da => {
      //   console.log(da);
      // })
    },
    removeImage(e) {
      console.log(e)
    }
  }
}
</script>
<style lang="scss" scoped>
.add-source {
  margin-top: 50px;
  margin-left: 0px;
}
.s-input {
  width: 100%;
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

<style>
.demo-ruleForm .el-form-item{
    margin-bottom: 5px;
  }
</style>


