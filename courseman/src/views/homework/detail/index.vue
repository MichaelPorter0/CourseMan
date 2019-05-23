<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="homeworkInfo" class="form-container">
      <div class="createPost-main-container">
        <el-row>

          <el-col :span="24">
            <el-form-item style="margin-bottom: 10px;">
              <h1>批复学生作业</h1>
            </el-form-item>
            <el-form-item style="margin-bottom: 10px;">
              <a >{{ homeworkInfo.content_word }}</a>
            </el-form-item>
            <div>
              <viewer :images="homeworkInfo.content_img" style="height: 200px;">
                <img v-for="item in images" :src="item.url" :key="item.url" height="100">
              </viewer>
            </div>
            <div class="postInfo-container">
              <div class="components-container">
                <div>
                  <tinymce id="tinymce" v-model="postForm.feedback" :height="300" />
                </div>
                <h1>预览:</h1>
                <div class="editor-content" v-html="postForm.feedback" />
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
import { studentHomeworkInfo, feedback } from '@/api/homework'
import '@/utils/tinymce/zh_CN.js'

export default {
  name: 'CourseDetail',
  components: { Tinymce },
  data() {
    return {
      fileForm: {
        asset: 'vedio',
        file: null
      },
      homeworkInfo: {
        id: '',
        content_word: ''
      },
      postForm: {
        id: '',
        feedback: ''
      },
      images: []
    }
  },
  computed: {
    lang() {
      return this.$store.getters.language
    }
  },
  created() {
    const GetForm = {
      id: this.$route.query.HomeworkID
    }
    studentHomeworkInfo(GetForm).then(responce => {
      this.homeworkInfo.id = responce.data.info.id
      this.postForm.id = responce.data.info.id
      this.homeworkInfo.content_word = responce.data.info.content_word
      this.images = responce.data.info.content_img
    })
  },
  methods: {

    backButton() {
      this.$router.go(-1)
    },
    confirmButton() {
      feedback(this.postForm).then(response => {
        this.$notify({
          title: '成功',
          message: '批复成功',
          type: 'success',
          duration: 0
        })
        this.$router.go(-1)
      }).catch(response => {
        this.$notify.error({
          title: '错误',
          message: '批复失败',
          duration: 0
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
