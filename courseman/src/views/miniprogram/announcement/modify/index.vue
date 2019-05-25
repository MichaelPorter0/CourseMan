<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" class="form-container">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 10px;">
              <h1>修改通知</h1>
            </el-form-item>
            <el-row type="flex" justify="center">
              <el-col :span="16">
                <div class="components-container">
                  <div>
                    <tinymce id="tinymce" v-model="postForm.content" :height="400" />
                  </div>
                  <h1>预览:</h1>
                  <div class="editor-content" v-html="postForm.content" />
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-bottom: 20px;">
          <el-col :span="4" >
            <el-form-item style="margin-bottom: 30px;">
              <el-button style="margin-left: 10px;" size="small" type="primary" @click="confirmButton">
                <label>确认修改</label>
              </el-button>
              <el-button style="margin-left: 10px;" size="small" type="primary" @click="backButton">
                <label>返回</label>
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </div>
    </el-form>
  </div>
</template>

<script>
import { updateNotify, infoNotify } from '@/api/miniprogram'
import Tinymce from '@/components/Tinymce'
import '@/utils/tinymce/zh_CN.js'
export default {
  components: { Tinymce },
  data() {
    return {
      uploading: false,
      postForm: {
        id: '',
        content: ''
      }
    }
  },
  created() {
    console.log('nb2')
    this.postForm.id = this.$route.query.notifyID
    this.fetchData(this.postForm.id)
  },
  methods: {
    fetchData(id) {
      console.log('nb')

      const data = {
        id: id
      }
      infoNotify(data).then(response => {
        this.postForm.id = response.data.info.id
        this.postForm.content = response.data.info.content
      })
    },
    backButton() {
      this.$router.go(-1)
    },
    confirmButton() {
      this.$confirm('你确定修改这则通知吗?', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        updateNotify(this.postForm).then(response => {
          this.$notify({
            title: '成功',
            message: '通知修改成功',
            type: 'success',
            duration: 0
          })
          this.$router.go(-1)
        }).catch(response => {
          this.$notify.error({
            title: '错误',
            message: '通知修改失败',
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
