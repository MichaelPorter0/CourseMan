<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="createPost-main-container">
        <el-row>
          <!-- <Warning /> -->
          <el-col :span="24">
            <el-form-item style="margin-bottom: 10px;">
              <h1>课程序号: {{ getcourseForm.course_id }}</h1>
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
                      type="textarea"
                      maxlength="300"
                      show-word-limit="true"
                      placeholder="请输入一个简短的课程介绍"/>
                  </el-form-item>
                </el-col>

                <!-- <el-col :span="6">
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
                </el-col> -->
                <el-col :span="12">
                  <el-form-item label-width="120px" label="封面图链接" class="postInfo-container-item">
                    <el-input
                      v-model="postForm.img"
                      type="text"
                      placeholder="您需要先点击下方的upload按钮上传一张图片来获得链接,然后填入到这里"
                      maxlength="300"
                      style="width:300%"
                      show-word-limit
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
            <label>确认修改</label>
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
import { getDetail, updateCourse } from '@/api/course'
import { upLoadFile } from '@/api/video'
import Warning from './Warning'
import '@/utils/tinymce/zh_CN.js'
// import router from '@/router'
const defaultForm = {
  course_id: '',
  name: '',
  catalog: '',
  introduction: '',
  short_introduction: '',
  start_time: '',
  img: '',
  end_time: '',
  can_experience: 0,
  experience_url: ''
}

export default {
  name: 'CourseDetail',
  components: { Tinymce, MDinput, Upload, Sticky, Warning },
  data() {
    const validateRequire = (rule, value, callback) => {
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
      postForm: Object.assign({}, defaultForm),
      getcourseForm: {
        course_id: ''
      },
      fileForm: {
        asset: 'vedio',
        file: null
      },
      loading: false,
      userListOptions: [],
      rules: {
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
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
    this.tempRoute = Object.assign({}, this.$route)
    this.getcourseForm.course_id = this.$route.params.course_id
    this.fetchData(this.getcourseForm)
  },
  methods: {
    fetchData(getcourseForm) {
      getDetail(getcourseForm).then(response => {
        this.postForm.course_id = response.data.info.id
        this.postForm.name = response.data.info.name
        this.postForm.catalog = response.data.info.catalog
        this.postForm.img = response.data.info.img.url
        this.postForm.introduction = response.data.info.introduction
        this.postForm.start_time = response.data.info.start_time
        this.postForm.end_time = response.data.info.end_time
        this.postForm.short_introduction = response.data.info.short_introduction
        // console.log(this.postForm.start_time)
        this.postForm.can_experience = response.data.info.can_experience
        this.postForm.experience_url = response.data.info.experience_url
        // Just for test
      }).catch(err => {
        console.log(err)
      })
    },
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
      this.$confirm('你确定修改课程"' + this.postForm.name + '"的信息', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        console.log(this.postForm)

        updateCourse(this.postForm).then(response => {
          this.$router.go(-1)
          this.$notify({
            title: '成功',
            message: '课程:' + this.postForm.name + ' 信息修改成功',
            type: 'success',
            duration: 0
          })
        }).catch(response => {
          this.$notify.error({
            title: '错误',
            message: '课程' + this.postForm.name + '信息修改失败',
            duration: 0
          })
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

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.main-container {
  position: fixed;
  height: 100%;
  width: 100%;
  .post-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
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
