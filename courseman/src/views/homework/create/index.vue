<template>
  <div class="dashboard-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="createPost-main-container">

        <el-form-item style="margin-bottom: 10px;">
          创建一个新的课程
        </el-form-item>

        <el-form-item prop="intro" style="margin-bottom: 30px;">
          <editor :init="{plugins: 'wordcount'}" api-key="API_KEY"/>
        </el-form-item>

      </div>
    </el-form>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
export default {
  components: { Editor },
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
        introduction: '',
        end_time: ''
      },
      rules: {
        title: [{ validator: validateRequire }],
        intro: [{ validator: validateRequire }],
        end_time: [{ validator: validateRequire }]
      }
    }
  },
  computed: {

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
</style>
