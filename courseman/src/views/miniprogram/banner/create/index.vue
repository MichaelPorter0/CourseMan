<template>
  <div class="dashboard-container">
    <el-form ref="postForm" :model="postForm" class="form-container">
      <div class="createPost-main-container">
        <el-form-item style="margin-bottom: 10px;">
          <h1>添加一个轮播图</h1>
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item prop="content" label="描述:" style="margin-bottom: 20px;">
              <el-input
                v-model="postForm.content"
                :autosize="{ minRows: 2, maxRows: 4}"
                type="textarea"
                placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row><el-row type="flex" justify="center">
          <el-col :span="4">
            <el-upload
              ref="upload"
              :http-request="uploadfile"
              :auto-upload="true"
              :limit="1"
              action=""
              list-type="picture-card"
            >
              <el-button size="small" type="primary">
                点击上传
              </el-button>
            </el-upload>
          </el-col>
        </el-row>
      </div>

      <el-row type="flex" justify="center" style="margin-bottom: 20px;">
        <el-col :span="6" >
          <el-button type="primary" round @click="confirmButton()">创建</el-button>
          <el-button type="primary" round @click="backbutton()">返回</el-button>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>

import { addBanner } from '@/api/miniprogram'
import { upLoadPubFile } from '@/api/video'
export default {

  data() {
    return {
      fileForm: {
        asset: 'recommend',
        file: null
      },
      postForm: {
        img: '',
        content: ''
      }

    }
  },
  computed: {

  },
  methods: {
    confirmButton() {
      console.log(this.postForm)

      addBanner(this.postForm).then(response => {
        this.$router.go(-1)
        this.$notify({
          title: '成功',
          message: '轮播图添加成功',
          type: 'success',
          duration: 0
        })
      }).catch(response => {
        this.$notify.error({
          title: '错误',
          message: '轮播图添加失败',
          duration: 0
        })
      })
    },
    backbutton() {
      this.$router.go(-1)
    },
    submitUpload() {
      this.$refs.upload.submit()
      this.upload = false
    },
    uploadfile(param) {
      this.fileForm.file = param.file
      console.log(this.fileForm)

      upLoadPubFile(this.fileForm).then(response => {
        this.postForm.img = response.data.url
        this.$notify({
          title: '成功',
          message: '文件' + name + '上传成功',
          type: 'success',
          duration: 0
        })
      }).catch(response => {
        this.$notify.error({
          title: '错误',
          message: '文件' + name + '上传失败',
          duration: 0
        })
      })
    }

  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.editor-content{
  margin-top: 20px;
}
</style>

