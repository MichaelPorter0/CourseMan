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
import { validURL } from '@/utils/validate'
import { getDetail } from '@/api/course'
import { upLoadFile } from '@/api/video'
import { searchUser } from '@/api/remote-search'
import Warning from './Warning'

const defaultForm = {
  status: 'draft',
  id: '',
  name: '',
  catalog: '',
  introduction: '',
  start_time: '',
  end_time: '',
  can_experience: '1',
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
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
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
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {}
    }
  },
  computed: {
    // contentShortLength() {
    //   return this.postForm.content_short.length
    // },
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
        this.postForm = response.data.info
        // Just for test
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.postForm.display_time = parseInt(this.display_time / 1000)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.introduction.length === 0 || this.postForm.title.name === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
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
      console.log(1)
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
