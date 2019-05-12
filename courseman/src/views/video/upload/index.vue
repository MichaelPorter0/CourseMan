<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main
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
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="clearFile">清空文件列表</el-button>
        <div class="el-upload__tip">{{ loadingFile }}</div>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="loadprogress"/>
        <div class="el-upload__tip"> 请您耐心等待文件上传完成后再离开本页</div>
    </el-main></el-container>

  </div>
</template>

<script>
import { client } from '@/utils/alioss'

export default {
  data() {
    return {
      loadprogress: 0,
      loadingFile: '没有文件正在上传'
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    uploadfile(param) {
      console.log(param.file.name)
      var that = this
      async function load(name, file) {
        try {
          const result = await client.multipartUpload(name, file, {
            progress: async function(p, checkpoint) {
              that.loadprogress = Math.floor(p * 100)
              that.loadingFile = name
            }
          })
          that.$notify({
            title: '成功',
            message: '文件' + name + '上传成功',
            type: 'success',
            duration: 0

          })
          console.log(result)
        } catch (e) {
          that.$notify.error({
            title: '错误',
            message: '文件' + name + '上传失败',
            duration: 0
          })
        }
      }
      load(param.file.name, param.file)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    clearFile() {
      this.$confirm(`确定移除这些文件吗？`).then(() => {
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
