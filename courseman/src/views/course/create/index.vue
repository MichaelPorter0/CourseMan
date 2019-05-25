<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="createPost-main-container">
        <el-row>
          <!-- <Warning /> -->
          <el-col :span="24">
            <el-form-item style="margin-bottom: 10px;">
              <h1>创建一个新的课程</h1>
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" prop="name">
              <MDinput v-model="postForm.name" :maxlength="100" name="name" required>
                课程名称
              </MDinput>
            </el-form-item>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="6">
                  <el-form-item label-width="70px" label="课程介绍" prop="short_introduction" class="postInfo-container-item">
                    <el-input
                      :rows="6"
                      v-model="postForm.short_introduction"
                      :show-word-limit="true"
                      type="textarea"

                      maxlength="300"
                      placeholder="请输入一个简短的课程介绍"/>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label-width="120px" label="开始时间:" prop="start_time" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.start_time" type="date" format="yyyy-MM-dd" value-format="yyyy.MM.dd" placeholder="选择课程的开始时间" />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label-width="120px" label="结束时间:" prop="end_time" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.end_time" type="date" format="yyyy-MM-dd" value-format="yyyy.MM.dd" placeholder="选择课程的结束时间" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label-width="120px" label="是否可以体验" class="postInfo-container-item">
                    <el-switch v-model="postForm.can_experience" :active-value="1" :inactive-value="0" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label-width="120px" label="封面图链接" class="postInfo-container-item">
                    <el-input
                      v-model="postForm.experience_url"
                      type="text"
                      placeholder="您需要先点击下方的upload按钮上传一张图片来获得链接填入到这里"
                      maxlength="300"
                      style="width:300%"

                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="components-container">
                <div>
                  <tinymce id="tinymce" v-model="postForm.introduction" :height="300" />
                </div>
                <h1>预览:</h1>
                <div class="editor-content" v-html="postForm.introduction" />
              </div>

            </div>
          </el-col>
        </el-row>
        <el-form-item style="margin-bottom: 30px;">
          <el-button style="margin-left: 10px;" size="small" type="primary" @click="confirmButton">
            <label>确认创建</label>
          </el-button>
          <el-button style="margin-left: 10px;" size="small" type="primary" @click="backButton">
            <label>返回</label>
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { submitCourse } from '@/api/course'
import { upLoadFile } from '@/api/video'
import '@/utils/tinymce/zh_CN.js'
// import router from '@/router'
export default {
  name: 'CourseDetail',
  components: { Tinymce, MDinput, Upload, Sticky },
  data() {
    const validateRequire = (rule, value, callback) => {
      console.log(value)

      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }

    return {
      fileList: [],
      uploading: false,
      postForm: {
        name: '',
        catalog: '',
        introduction: `<h1 style="text-align: center;">在这里详细描述您的课程!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="logo.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>在这里编辑您的作业内容.</li><li>如果您需要插入图片,点击上方的UPLOAD按钮,选择文件,上传后您会获得一个URL,
        复制后点击插入->图片,在地址中粘贴您刚才获得的URL即可.</li><li>您编辑的内容会实时展示在下方供您预览</li>
      </ul>`,
        short_introduction: '',
        start_time: '',
        end_time: '',
        img: '',
        can_experience: 0,
        experience_url: ''
      },
      value1: '',
      fileForm: {
        asset: 'vedio',
        file: null
      },
      loading: false,
      userListOptions: [],
      rules: {
        name: [{ validator: validateRequire }],
        catalog: [{ validator: validateRequire }],
        introduction: [{ validator: validateRequire }],
        start_time: [{ validator: validateRequire }],
        end_time: [{ validator: validateRequire }]

      },
      tempRoute: {}
    }
  },
  computed: {
    lang() {
      return this.$store.getters.language
    }
  },
  created() {
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    uploadfile(param) {
      this.fileForm.file = param.file
      this.uploading = true
      upLoadFile(this.fileForm).then(response => {
        this.uploading = false
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
    },
    progressing(event, file, fileList) {
      console.log(event)
    },
    backButton() {
      this.$router.go(-1)
    },
    confirmButton() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.$confirm('你确定创建课程"' + this.postForm.name + '"吗?', '确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true
          }).then(() => {
            submitCourse(this.postForm).then(response => {
              this.$notify({
                title: '成功',
                message: '课程:' + this.postForm.name + ' 创建成功',
                type: 'success',
                duration: 0
              })
              this.$router.go(-1)
            }).catch(response => {
              this.$notify.error({
                title: '错误',
                message: '课程' + this.postForm.name + '创建失败',
                duration: 0
              })
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '请完整填写所有信息',
            duration: 0
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

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
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
