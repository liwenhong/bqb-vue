<template>
    <div class="upload-container">
          <el-upload
              class="upload-demo"
              drag
              list-type="picture-card"
              action="https://api.doutub.com/api/file/uploadMulterToQN"
              multiple
              :auto-upload="autoUpload" :on-success="handleImageScucess" :on-remove="rmImage" :before-upload="beforeUpload" ref="uploadimgs" name="avatar">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
    </div>
</template>

<script>
import { getToken, uploadImg } from '@/api/qiniu'

export default {
  name: 'singleImageUpload3',
  props: {
    autoUpload: {
      type: Boolean,
      default: false
    }
  },
  computed: {

  },
  data() {
    return {
      uid: ''
    }
  },
  methods: {
    rmImage(file) {
      console.log(file)
      this.$emit('removeImg', file)
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    submitUpload() {
      console.log('submit')
      this.$refs.uploadimgs.submit()
    },

    handleImageScucess(file) {
      console.log(file)
      file.data.uid = this.uid
      this.emitInput(file.data)
    },
    beforeUpload(file) {
      console.log(file)
      this.uid = file.uid
      console.log(this.uid)
    },
    clearFiles() {
      this.$refs.uploadimgs.clearFiles()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.upload-container {
  width: 100%;
  position: relative;
  @include clearfix;

  .el-upload__text{
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
  }

}
</style>
