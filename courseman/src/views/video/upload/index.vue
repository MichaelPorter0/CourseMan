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
          <el-col :span="5">
            <el-upload
              ref="upload"
              :http-request="uploadfile"
              :auto-upload="false"
              :before-remove="beforeRemove"
              :limit="1"
              :on-exceed="handleExceed"
              action=""
              class="upload-demo"
              drag
              multiple >
              <i class="el-icon-upload" />
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-col>x
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="2" >
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button style="margin-left: 10px;" size="small" type="success" @click="clearFile">清空文件</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" :offset="11">
            <div class="el-upload__tip">{{ loadingFile }}</div>
          </el-col>
          <el-col :span="5" :offset="10">
            <div class="el-upload__tip"> 请您耐心等待文件上传完成后再离开本页</div>
            <div class="el-upload__tip"> 当前仅支持上传MP4文件其他文件可能无法正常播放</div>
            <div class="el-upload__tip"> 视频传输成功后，点击下方的确认上传按钮即可完成传输</div>

          </el-col>
        </el-row>

        <el-form ref="PostForm" :model="PostForm" class="login-form" auto-complete="on" label-position="left">
          <el-row>
            <el-col :span="5" :offset="10">
              <el-form-item prop="email">
                视频内容：
                <el-input v-model="PostForm.title" placeholder="请输入内容"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" :offset="10">
              <el-form-item prop="password">
                视频介绍：
                <el-input
                  v-model="PostForm.content"
                  type="textarea"
                  placeholder="请输入内容"
                  maxlength="30"
                  show-word-limit
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row>
          <el-col :span="5" :offset="10">
            <el-tag>{{ PostForm.url }}</el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5" :offset="10">
            <el-button type="primary" @click="addToVideoList">确认上传</el-button>
          </el-col>
        </el-row>

      </el-main>
    </el-container>
  </div>
</template>

<script>
import { upLoadFile, addToVideoList } from '@/api/video'
import router from '@/router'
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
      this.$confirm('确认上传这个文件到服务器吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.upload.submit()
        this.$message({
          type: 'success',
          message: '文件' + this.loadingFile + '!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
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
        this.loadingFile = '文件' + name + '完成上传'
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
    },
    addToVideoList() {
      this.$confirm(`确定把这个视频添加到视频列表中吗？`).then(() => {
        if (this.PostForm.title.length === 0) {
          this.PostForm.title = this.FileUploadForm.file.name
        }
        if (this.PostForm.content.length === 0) {
          this.PostForm.content = this.FileUploadForm.file.name
        }
        addToVideoList(this.PostForm).then((response) => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
        })
        router.push({ name: 'videouplist' })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }, handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
    }
  }
}
</script>
<style>
.title{
  font-size: 30px;
}
</style>
