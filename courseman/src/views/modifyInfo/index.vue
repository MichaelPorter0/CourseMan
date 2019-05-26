<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="Rules" class="form-container">
      <div class="createPost-main-container">
        <el-row>
          <!-- <Warning /> -->
          <el-col :span="24">
            <el-form-item style="margin-bottom: 10px;">
              <h1>修改个人信息</h1>
            </el-form-item>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="6">
                  <el-form-item label-width="70px" prop="nickname" label="昵称" class="postInfo-container-item">
                    <el-input
                      :rows="6"
                      v-model="postForm.nickname"
                      :show-word-limit="true"
                      maxlength="30"
                      placeholder="请输入您的昵称"/>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label-width="70px" prop="phone" label="手机号" class="postInfo-container-item">
                    <el-input
                      :rows="6"
                      v-model="postForm.phone"
                      :show-word-limit="true"
                      maxlength="11"
                      placeholder="请输入您的手机号码"/>
                  </el-form-item>
                </el-col>

              </el-row>

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
import { updateinfo } from '@/api/user'
import { isNickname, isPhoneNumber } from '@/utils/validate'
import '@/utils/tinymce/zh_CN.js'
// import router from '@/router'
export default {

  data() {
    const validatePhone = (rule, value, callback) => {
      if (!isPhoneNumber(value)) {
        callback(new Error('这似乎不是一个正确的手机号'))
      } else {
        callback()
      }
    }
    const validateNickname = (rule, value, callback) => {
      if (!isNickname(value)) {
        callback(new Error('请输入正确的昵称,只能含有汉字字母和数字!'))
      } else {
        if (value.length > 20) {
          callback(new Error('您的用户名太长了'))
        } else if (value.length < 4) {
          callback(new Error('您的用户名太短了'))
        } else {
          callback()
        }
      }
    }
    return {
      uploading: false,
      postForm: {
        nickname: '',
        phone: ''

      },
      Rules: {

        nickname: [{ required: true, trigger: 'blur', validator: validateNickname }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }]

      },
      loading: false
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
    backButton() {
      this.$router.go(-1)
    },
    confirmButton() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.$confirm('你确定修改个人信息吗', '确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true
          }).then(() => {
            updateinfo(this.postForm).then(response => {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 0
              })
              this.$router.go(-1)
            }).catch(response => {
              this.$notify.error({
                title: '错误',
                message: '修改失败',
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
            message: '请完整填写',
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
