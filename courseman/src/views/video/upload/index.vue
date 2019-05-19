<template>
  <div>
    <el-container>
      <el-header>
        <el-row type="flex" justify="center">
          <el-col :span="4" >
            <p class="title">天圆地方</p>
          </el-col>
      </el-row></el-header>
      <el-main>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-upload
              ref="upload"
              :http-request="uploadfile"
              :auto-upload="false"
              :before-remove="beforeRemove"
              action=""
              class="upload-demo"
              drag
              multiple >
              <i class="el-icon-upload" />
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="2" >
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>

          </el-col>
          <el-col :span="2" :offset="2">
            <el-button style="margin-left: 10px;" size="small" type="success" @click="clearFile">清空文件列表</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" :offset="11">
            <div class="el-upload__tip">{{ loadingFile }}</div>
          </el-col>
          <el-col :span="5" :offset="10">
            <div class="el-upload__tip"> 请您耐心等待文件上传完成后再离开本页</div>
          </el-col>
        </el-row>
        <el-row>
          <el-input v-model="PostForm.title" placeholder="请输入内容"/>
        </el-row>
        <el-row>
          <el-input
            v-model="PostForm.content"
            type="textarea"
            placeholder="请输入内容"
            maxlength="30"
            show-word-limit
          />
        </el-row>

        <el-row>
          <el-link :href="PostForm.url" name="nb" type="primary"/>
          <el-tag>{{ PostForm.url }}</el-tag>
        </el-row>
        <!-- <el-row>
          <el-link type="primary">{{ PostForm.img }}</el-link>
        </el-row> -->
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { upLoadFile } from '@/api/video'
export default {
  data() {
    return {
      loadprogress: 0,
      loadingFile: '没有文件正在上传',
      FileUploadForm: {
        asset: 'vedio',
        file: null
      },
      PostForm: {
        url: '',
        title: '',
        content: '',
        img: ''
      }
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    uploadfile(param) {
      this.FileUploadForm.file = param.file
      this.loadingFile = param.file.name + '正在上传'
      upLoadFile(this.FileUploadForm).then(response => {
        this.PostForm.url = response.data.url
        this.loadingFile = '没有文件正在上传'
        this.$notify({
          title: '成功',
          message: '文件' + name + '上传成功',
          type: 'success',
          duration: 0
        })
      }).catch(response => {
        this.loadingFile = '文件完成上传'
        this.$notify.error({
          title: '错误',
          message: '文件' + name + '上传失败',
          duration: 0
        })
      })
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    clearFile() {
      this.$confirm(`确定移除这些文件吗？`).then(() => {
        this.loadingFile = ''
        this.loadprogress = 0
        this.$refs.upload.clearFiles()
        this.$message({
          type: 'success',
          message: '移除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>
<style>
.title{
  font-size: 30px;
}
</style>
