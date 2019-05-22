<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      upload
    </el-button>
    <el-dialog v-if="upload" :visible.sync="dialogVisible">
      <el-upload
        ref="upload"
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :http-request="uploadfile"
        :auto-upload="false"
        :limit="1"
        class="editor-slide-upload"
        action=""
        list-type="picture-card"
      >
        <el-button size="small" type="primary">
          点击上传
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="submitUpload">
        确认
      </el-button>
    </el-dialog>
    <el-dialog v-else :visible.sync="dialogVisible" >
      <el-tag size="medium">{{ url }}</el-tag>
      <el-button type="primary" icon="document" @click="handleCopy(url,$event)">
        复制
      </el-button>
      <el-button @click="addButton()">
        添加新的图片
      </el-button>
      <el-button @click="backButton()">
        返回
      </el-button>
  </el-dialog></div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import { upLoadFile } from '@/api/video'
import clip from '@/utils/clipboard'
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      fileForm: {
        asset: 'vedio',
        file: null
      },
      dialogVisible: false,
      listObj: {},
      fileList: [],
      upload: true,
      url: ''
    }
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event)
    },
    submitUpload() {
      this.$refs.upload.submit()
      this.upload = false
    },
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    uploadfile(param) {
      this.fileForm.file = param.file
      upLoadFile(this.fileForm).then(response => {
        this.url = response.data.url
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
    },
    backButton() {
      this.dialogVisible = false
      this.upload = true
    },
    // handleSubmit() {
    //   const arr = Object.keys(this.listObj).map(v => this.listObj[v])
    //   if (!this.checkAllSuccess()) {
    //     this.$message('Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!')
    //     return
    //   }
    //   this.$emit('successCBK', arr)
    //   this.listObj = {}
    //   this.fileList = []
    //   this.dialogVisible = false
    // },
    addButton() {
      this.upload = true
    },
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
