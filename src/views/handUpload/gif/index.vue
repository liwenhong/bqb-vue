<template>
  <div >
    <p>上传同一类型的gif,请不要刷新页面,换类型或者不同类型的可以点击重置按钮或者按F5刷新页面即可.</p>
    <div class="add-source">
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
        <!-- <el-form-item label="选择类型" prop="type"> -->
          <!-- <el-select v-model="ruleForm.gifType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item label="gif名称" prop="gifName">
          <el-input type="text" class="s-input" v-model="ruleForm.gifName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="gif模版描述" prop="gifName">
          <el-input type="text" class="s-input" v-model="ruleForm.gifDesc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分隔标识" prop="gifName">
          <el-input type="text" class="s-input" v-model="ruleForm.splitMark" placeholder="以 | 分隔" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片描述" prop="gifContent">
          <el-input type="text" class="s-input" v-model="ruleForm.gifContent" auto-complete="off"></el-input>
          <el-color-picker v-model="ruleForm.color"></el-color-picker>
          <span>字体颜色</span>
        </el-form-item>
        <!-- <el-form-item label="图片描述字体颜色" prop="gifContent">
          <el-input type="text" class="s-input" v-model="ruleForm.gifContent" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="gif时间" prop="gifTime">
          <el-input type="text" class="s-input" v-model="ruleForm.gifTime" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否是显示列表中的图片" prop="showIndex">
          <el-switch
            v-model="ruleForm.showIndex"
            active-color="#13ce66"
            inactive-color="#eaeaea">
          </el-switch>
        </el-form-item>
        <el-form-item label="gif版权" prop="gifCopyRight">
          <el-input type="text" class="s-input" v-model="ruleForm.gifCopyRight" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="gif主图">
            <Upload  v-model="ruleForm.mainGif" :autoUpload="true" v-on:input="uploadMainImg($event, 'mainGif')" v-on:removeImg="removeImage($event, 'mainGif')" ref="mainUpload"></Upload>
        </el-form-item>
        <el-form-item label="gif素材">
            <Upload  v-model="ruleForm.gifPath" :autoUpload="false" v-on:input="uploadImg($event)" v-on:removeImg="removeImage($event, 'gifPath')" ref="upload"></Upload>
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
import Upload from '@/components/Upload/singleImage'
// import { addImgSourceType, addImgSource } from '@/api/bqb'
export default {
  name: 'addGif',
  data: function() {
    // var validate = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("不能为空"));
    //   }
    //   callback();
    // };
    return {
      ruleForm: {
        gifName: '',
        gifPath: '',
        gifContent: '',
        gifId: '',
        gifType: '1', // 栏目id
        showIndex: false, // 是否显示在首页，默认false
        // uid: '',
        gifTime: '1000',
        gifStatus: '1',
        splitMark: '',
        color: '#000',
        gifDesc: '',
        gifCopyRight: '',
        mainGif: ''
      }
    }
  },
  components: {
    Upload
  },
  mounted() {
    const pa = this.$route.params
    console.log(pa)
    if (pa.gifId) {
      this.ruleForm.gifId = pa.gifId
    }
  },
  methods: {
    uploadMainImg(e) {
      console.log(e)
      this.ruleForm.mainGif = e.imgPath
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs.upload.submitUpload()
        } else {
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
      this.ruleForm.gifPath = e.imgPath
      // this.ruleForm.imgName = e.imgName;
      this.ruleForm.gifId === '' && (this.ruleForm.gifId = e.uid)
      if(!this.ruleForm.mainGif){
        this.$message.error('请上传gif主图')
        return
      }
      this.$post('gif/addGifSource', this.ruleForm).then(res => {
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        }
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


