<template>
  <div class="dashboard-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="createPost-main-container">
        <el-form-item style="margin-bottom: 10px;">
          <h1>创建一个新的作业</h1>
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item prop="title" label="作业名称:" style="margin-bottom: 20px;">
              <el-input v-model="postForm.title" placeholder="请输入内容"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="16">
            <div class="components-container">
              <div>
                <tinymce id="tinymce" v-model="postForm.introduction" :height="400" />
              </div>
              <h1>预览:</h1>
              <div class="editor-content" v-html="postForm.introduction" />
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item prop="end_time" label="截止时间:" style="margin-bottom: 10px;">
            <el-date-picker
              v-model="postForm.end_time"
              type="date"
              placeholder="选择日期"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="4">
          <el-form-item prop="end_time" label="作业类型:" style="margin-bottom: 20px;">
            <el-radio v-model="postForm.before" label="1">课前</el-radio>
            <el-radio v-model="postForm.before" label="0">课后</el-radio>
          </el-form-item>

        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="margin-bottom: 20px;">
        <el-col :span="4" >
          <el-button type="primary" round @click="confirmButton">创建作业</el-button>
          <el-button type="primary" round @click="backbutton">返回</el-button>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import '@/utils/tinymce/zh_CN.js'
import { PubHomework } from '@/api/homework'

export default {
  components: { Tinymce },
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
      postForm: {
        class_id: '',
        title: '',
        introduction: `<h1 style="text-align: center;">在这里发布您的作业!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="logo.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>在这里编辑您的作业内容.</li><li>如果您需要插入图片,点击上方的UPLOAD按钮,选择文件,上传后您会获得一个URL,
        复制后点击插入->图片,在地址中粘贴您刚才获得的URL即可.</li><li>您编辑的内容会实时展示在下方供您预览</li>
      </ul>`,
        end_time: '',
        before: 0
      },
      rules: {
        title: [{ validator: validateRequire }],
        intro: [{ validator: validateRequire }],
        end_time: [{ validator: validateRequire }]
      }

    }
  },
  computed: {

  },
  created() {
    this.postForm.class_id = this.$route.query.chapterID
  },
  methods: {
    confirmButton() {
      // console.log(this.$refs.postForm.validate)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          // console.log('全输出了')
          PubHomework(this.postForm).then(response => {
            this.$router.go(-1)
            this.$notify({
              title: '成功',
              message: '作业发布成功',
              type: 'success',
              duration: 0
            })
          }).catch(response => {
            this.$notify.error({
              title: '错误',
              message: '作业发布失败',
              duration: 0
            })
          })
        } else {
          // console.log('没选')
          this.$notify.error({
            title: '错误',
            message: '请您完整填写',
            duration: 0
          })
          return false
        }
      })
    },
    backbutton() {
      this.$router.go(-1)
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

