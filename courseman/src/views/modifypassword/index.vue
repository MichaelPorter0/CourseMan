<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" class="form-container">
      <div class="createPost-main-container">
        <el-row>
          <!-- <Warning /> -->
          <el-col :span="24">
            <el-form-item style="margin-bottom: 10px;">
              <h1>修改密码</h1>
            </el-form-item>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="10">
                  <el-form-item label-width="140px" label="输入您原始密码" class="postInfo-container-item">
                    <el-input
                      v-model="postForm.password"
                      :show-word-limit="true"
                      show-password
                      maxlength="30"
                      placeholder="请输入您的昵称"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label-width="140px" label="输入您新的密码" class="postInfo-container-item">
                    <el-input
                      v-model="postForm.assetPw"
                      :show-word-limit="true"
                      show-password
                      maxlength="30"
                      placeholder="请输入您的昵称"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label-width="140px" label="再次输入新的密码" class="postInfo-container-item">
                    <el-input
                      v-model="postForm.againPw"
                      :show-word-limit="true"
                      show-password
                      maxlength="30"
                      placeholder="请输入您的昵称"/>
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
import { changepw } from '@/api/user'
// import router from '@/router'
export default {

  data() {
    return {
      uploading: false,
      postForm: {
        password: '',
        assetPw: '',
        againPw: ''

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
      this.$confirm('你确定修改个人信息吗', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        changepw(this.postForm).then(response => {
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
