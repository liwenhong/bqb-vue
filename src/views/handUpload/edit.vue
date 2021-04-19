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
        <el-form-item label="系列名称" prop="serieName">
          <el-input type="text" class="s-input" v-model="ruleForm.serieName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="表情描述" prop="imgDescribe">
          <el-input type="text" class="s-input" v-model="describString" auto-complete="off" placeholder="以 - 号分各"></el-input>
        </el-form-item>
        <el-form-item label="搜索关键字" prop="searchKey">
          <el-input type="text" class="s-input" v-model="searchString" auto-complete="off" placeholder="以 - 号分各"></el-input>
        </el-form-item>
         <el-form-item label="图片名称" prop="imgName">
          <el-input type="text" class="s-input" v-model="imgName" auto-complete="off" placeholder="以 - 号分各"></el-input>
        </el-form-item>
        <el-form-item label="系列描述" prop="serieDescrib">
          <el-input type="textarea" class="s-input" v-model="ruleForm.serieDescrib" auto-complete="off" placeholder="系列描述"></el-input>
        </el-form-item>
        <el-form-item label="是否热门" prop="isHot">
          <el-switch
            v-model="ruleForm.isHot"
            active-color="#13ce66"
            inactive-color="#eaeaea">
          </el-switch>
        </el-form-item>
        <el-form-item label="是否置顶" prop="isTop">
          <el-switch
            v-model="ruleForm.isTop"
            active-color="#13ce66"
            inactive-color="#eaeaea">
          </el-switch>
        </el-form-item>
        <el-form-item >
            <Upload  v-model="ruleForm.path" :title="ruleForm" v-on:input="uploadImg($event)" v-on:removeImg="removeImage($event)" ref="upload"></Upload>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">新增系列</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script>
import Upload from '@/components/Upload/singleImage'
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
      temp: 0,
      searchArr: [],
      describArr: [],
      imgNameArr: [],
      searchString: '',
      describString: '',
      imgName: '',
      ruleForm: {
        searchKey: '',
        path: '',
        imgName: '',
        typeId: '2', // 栏目id
        isTop: false, // 是否显示在首页，默认false
        imgDescribe: '', // 图片描述
        uid: '',
        serieName: '', // 系列名称
        serieId: '',
        isHot: '',
        serieDescrib: ''
      },
      // rules: {
      //   typename: [{ validator: validate, trigger: "blur" }],
      //   name: [{ validator: validate, trigger: "blur" }]
      // },
      options: [{
        value: '2',
        label: '系列图片'
      }]
      // value: ''
    }
  },
  mounted() {
    const pa = this.$route.params
    console.log(pa)
    if (pa.serieId) {
      this.ruleForm.serieId = pa.serieId
    }
  },
  components: {
    Upload
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.searchArr = this.searchString.split('-')
          this.describArr = this.describString.split('-')
          this.imgNameArr = this.imgName.split('-')
          this.$refs.upload.submitUpload()
          this.temp = 0
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$refs.upload.clearFiles()
      this.ruleForm.uid = ''
      this.temp = 0
      this.searchArr = []
      this.describArr = []
      this.ruleForm.serieId = null
    },
    async uploadImg(e) {
      // 创建素材类型
      // await addImgSourceType(this.ruleForm.typename).then(res => {
      //   //获得类型的id 并赋值到pid上
      //   this.ruleForm.pid = res.data.id;
      // })
      if (this.ruleForm.uid == null || this.ruleForm.uid == '' || this.ruleForm.uid == undefined) {
        this.ruleForm.uid = e.uid
        if (!!this.ruleForm.serieId && this.ruleForm.serieId != '') {

        } else {
          this.ruleForm.serieId = e.uid
        }
      }
      this.ruleForm.path = e.imgPath
      // this.ruleForm.imgName = e.imgName;
      this.ruleForm.imgName = this.imgNameArr[this.temp]
      this.ruleForm.searchKey = this.searchArr[this.temp]
      this.ruleForm.imgDescribe = this.describArr[this.temp]

      // this.ruleForm.uid = e.uid;

      console.log(this.ruleForm)
      this.$post('bq/add', this.ruleForm).then(res => {
        console.log(res)
      })
      this.temp++
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


