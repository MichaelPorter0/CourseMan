<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="createPost-main-container">
        <el-row>
          <!-- <Warning /> -->
          <el-col :span="24">
            <el-form-item style="margin-bottom: 10px;" prop="courseID">
              课程序号: {{ getcourseForm.course_id }}
            </el-form-item>
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.name" :maxlength="100" name="name" required>
                课程名称
              </MDinput>
            </el-form-item>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="60px" label="标签" class="postInfo-container-item">
                    <el-input
                      v-model="postForm.catalog"
                      type="text"
                      placeholder="请输入内容"
                      maxlength="10"
                      show-word-limit
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label-width="120px" label="课程介绍" class="postInfo-container-item">
                    <el-input
                      :rows="8"
                      v-model="postForm.introduction"
                      type="textarea"
                      maxlength="30"
                      show-word-limit="true"
                      placeholder="请输入课程介绍"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label-width="120px" label="开始时间:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.start_time" type="datetime" format="yyyy-MM-dd" placeholder="Select date and time" />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label-width="120px" label="结束时间:" class="postInfo-container-item">
                    <el-date-picker v-model="postForm.end_time" type="datetime" format="yyyy-MM-dd" placeholder="Select date and time" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label-width="120px" label="是否可以体验" class="postInfo-container-item">
                    <el-switch v-model="postForm.can_experience" :active-value="1" :inactive-value="0" />
                  </el-form-item>
                </el-col>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label-width="60px" label="链接" class="postInfo-container-item">
                      <el-input
                        v-model="postForm.experience_url"
                        type="text"
                        placeholder="请输入内容"
                        maxlength="10"
                        show-word-limit
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <el-upload
            ref="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-progress="progressing"
            :file-list="fileList"
            :auto-upload="false"
            :http-request="uploadfile"
            class="upload-demo"
            action="">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <el-button :disabled="uploading" style="margin-left: 10px;" size="small" type="success" @click="confirmButton">
            <label v-if="uploading">请耐心等待文件上传完成</label>
            <label v-else>修改信息</label>
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
// import router from '@/router'
const defaultForm = {
  course_id: '',
  name: '',
  catalog: '',
  introduction: '',
  start_time: '',
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
        this.postForm.introduction = response.data.info.introduction
        this.postForm.start_time = response.data.info.start_time
        this.postForm.end_time = response.data.info.end_time
        console.log(this.postForm.start_time)
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
        this.postForm.experience_url = response.data.url
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
    confirmButton() {
      this.$confirm('你确定修改课程"' + this.postForm.name + '"的信息', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        updateCourse(this.postForm).then(response => {
          this.$notify({
            title: '成功',
            message: '课程:' + this.postForm.name + ' 信息修改成功',
            type: 'success',
            duration: 0
          }).catch(response => {
            this.$notify.error({
              title: '错误',
              message: '课程' + this.postForm.name + '信息修改失败',
              duration: 0
            })
          })
          // router.push({ path: 'list/' })
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
