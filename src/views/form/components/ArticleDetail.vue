<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm" >

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="21">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput name="name" v-model="postForm.title" required :maxlength="100">
                标签
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="21">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput name="name" v-model="postForm.content" required :maxlength="100">
                图片描述
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="21">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput name="name" v-model="postForm.searchKey" required :maxlength="100">
                搜索描述
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>

         <el-form-item label="是否热门">
          <el-switch v-model="postForm.ishot"></el-switch>
         </el-form-item>
         <el-form-item label="是否置顶">
          <el-switch v-model="postForm.istop"></el-switch>
         </el-form-item>

        <div style="margin-bottom: 20px;">
          <Upload v-model="postForm.image_uri" :title="postForm" v-on:input="uploadImg($event)" v-on:removeImg="removeImage($event)" ref="upload"></Upload>
        </div>

         <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button @click="resetForm('postForm')">重置</el-button>
          </el-form-item>
      </div>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
import Sticky from '@/components/Sticky' // 粘性header组件
import { validateURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
import { userSearch } from '@/api/remoteSearch'
import { addImage,delImage,addImgType } from '@/api/bqb'

const defaultForm = {
  title: '', // 标签
  image_uri: '', // 文章图片
  id: undefined,
  content:'',
  imgName:'',
  userId:'1',
  imgType:1,
  uid:'',
  ishot:false,//是否热门
  istop:false,//是否置顶
  searchKey:'',//搜索关键字
}

export default {
  name: 'articleDetail',
  components: { Tinymce, MDinput, Upload, Multiselect, Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(null)
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      fetchSuccess: true,
      loading: false,
      userLIstOptions: [],
      platformsOptions: [
        { key: 'a-platform', name: 'a-platform' },
        { key: 'b-platform', name: 'b-platform' },
        { key: 'c-platform', name: 'c-platform' }
      ],
      rules: {
        content: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
      }
    }
  },
  computed: {
    // contentShortLength() {
    //   return this.postForm.content_short.length
    // }
  },
  created() {
    if (this.isEdit) {
      this.fetchData()
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    fetchData() {
      fetchArticle().then(response => {
        this.postForm = response.data
      }).catch(err => {
        this.fetchSuccess = false
        console.log(err)
      })
    },
    submitForm() {
      // this.postForm.display_time = parseInt(this.display_time / 1000)
      console.log(this.postForm)
     if(this.draftForm()){
      this.$refs.upload.submitUpload();
     }
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标签和图片描述',
          type: 'warning'
        })
        return false;
      }
      return true;
    },
    getRemoteUserList(query) {
      userSearch(query).then(response => {
        if (!response.data.items) return
        console.log(response)
        this.userLIstOptions = response.data.items.map(v => ({
          key: v.name
        }))
      })
    },
    async uploadImg(e){

      //创建图片类型
      await addImgType(this.postForm.title,this.postForm.ishot,this.postForm.istop).then(da=> {
         console.log(da)
         this.postForm.imgType = da.data.data.id;
       });
       this.postForm.image_uri = e.imgPath;
       this.postForm.imgName = e.imgName;
       this.postForm.uid = e.uid;
       console.log(this.postForm);
       //图片上传到七牛成功后再掉接口，将图片描述，标签，路径保存到数据库
       addImage(this.postForm).then(res => {
         console.log(res);
       })
    },
    removeImage(e){
      console.log(e);
      delImage(e).then(res => {
        console.log(e)
      })
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .title-prompt{
    position: absolute;
    right: 0px;
    font-size: 12px;
    top:10px;
    color:#ff4949;
  }
  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
            text-align: right;
            margin-right: 10px;
            .editor-upload-btn {
                display: inline-block;
            }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
</style>

