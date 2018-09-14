<template>
  <div class="upload-container">
    <el-upload  class="img-upload" :data="dataObj" multiple :auto-upload="false" list-type="picture-card" name="avatar" action="http://120.77.250.76:3000/api/file/uploadToQiNiu"
      :on-success="handleImageScucess" :on-remove="rmImage" :before-upload="beforeUpload" ref="uploadimgs">
      <i class="el-icon-plus"></i>
      <!-- <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
    </el-upload>
  </div>
</template>

<script>
import { getToken,uploadImg } from "@/api/qiniu";

export default {
  name: "singleImageUpload3",
  props: {
    title:Object
  },
  computed: {
    // imageUrl() {
    //   return this.value;
    // }
  },
  data() {
    return {
      tempUrl: "",
      uid:'',
      dataObj: { title:this.title }
    };
  },
  methods: {
    rmImage(file) {
      console.log(file);
      this.$emit('removeImg',file);
    },
    emitInput(val) {
      this.$emit("input", val);
    },
    submitUpload() {
      console.log('submit')
      this.$refs.uploadimgs.submit();
    },

    handleImageScucess(file) {
      console.log(file)
      if(file){
        file.data.uid = this.uid;
      }
      this.emitInput(file.data);
    },
    beforeUpload(file) {
     console.log(file);
     this.uid = file.uid;
     console.log(this.uid);
    }
  }
};
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
