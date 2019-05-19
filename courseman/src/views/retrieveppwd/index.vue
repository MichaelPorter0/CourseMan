<template>
  <div class="login-container">
    <el-form ref="RetrievepPwdForm" :model="RetrievepPwdForm" :rules="RetrievepPwdRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">围棋课程管理</h3>
      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="邮箱" />
        </span>
        <el-input v-model="RetrievepPwdForm.email" name="email" type="text" auto-complete="on" placeholder="请输入您的邮箱" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleRetrievepPwd">
          找回密码
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="BacktoLogin">
          返回
        </el-button>

      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { isvalidEmail } from '@/utils/validate'
import { retrieveppwd } from '@/api/user'
export default {
  name: 'Rretrieveppwd',
  data() {
    const validEmail = (rule, value, callback) => {
      if (isvalidEmail(value)) {
        callback()
      } else {
        callback(new Error('这不是一个合格的邮箱格式'))
      }
    }
    return {
      RetrievepPwdForm: {
        email: ''
      },
      RetrievepPwdRules: {
        email: [{ required: true, trigger: 'blur', validator: validEmail }]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleRetrievepPwd() {
      this.$refs.RetrievepPwdForm.validate(valid => {
        if (valid) {
          this.loading = true
          retrieveppwd(this.RetrievepPwdForm).then((data) => {
            this.loading = false
            this.$message({
              message: '请前往您的邮箱根据提示找回您的密码',
              type: 'success',
              center: true,
              duration: 10 * 1000
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    BacktoLogin() {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
