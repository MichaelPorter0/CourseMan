<template>
  <div class="login-container">
    <el-form ref="RegisterForm" :model="RegisterForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">围棋课程管理</h3>
      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="邮箱" />
        </span>
        <el-input v-model="RegisterForm.email" name="email" type="text" auto-complete="on" placeholder="输入您的邮箱" />
      </el-form-item>
      <el-form-item >
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="RegisterForm.nickname" name="nickname" type="text" auto-complete="on" placeholder="您的昵称" />
      </el-form-item>
      <el-form-item prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="手机" />
        </span>
        <el-input v-model="RegisterForm.phone" name="phone" type="text" auto-complete="on" placeholder="您的电话" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="RegisterForm.password"
          name="password"
          auto-complete="on"
          placeholder="密码"
          @keyup.enter.native="handleRegister" />
          <!-- <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span> -->
      </el-form-item>

      <el-form-item prop="passwordConfirm">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="RegisterForm.passwordConfirm"
          name="passwordConfirm"
          auto-complete="on"
          placeholder="确认您的密码"
          @keyup.enter.native="handleRegister" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleRegister">
          注册
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
import { isNickname, isvalidEmail, isPhoneNumber } from '@/utils/validate'
import { register } from '@/api/user'
export default {
  name: 'Register',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!isvalidEmail(value)) {
        callback(new Error('请输入正确的邮箱'))
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
    const validatePhone = (rule, value, callback) => {
      if (!isPhoneNumber(value)) {
        callback(new Error('这似乎不是一个正确的手机号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码太短了!'))
      } else if (value.length > 20) {
        callback(new Error('密码太长了!'))
      } else {
        callback()
      }
    }
    const validateRePass = (rule, value, callback) => {
      if (value === this.RegisterForm.password) {
        callback()
      } else {
        callback(new Error('密码不一致'))
      }
    }
    return {
      RegisterForm: {
        email: '',
        nickname: '',
        phone: '',
        password: '',
        passwordConfirm: ''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        nickname: [{ required: true, trigger: 'blur', validator: validateNickname }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        passwordConfirm: [{ required: true, trigger: 'blur', validator: validateRePass }]
      },
      loading: false,
      pwdType: 'password',
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
    handleRegister() {
      this.$refs.RegisterForm.validate(valid => {
        if (valid) {
          this.loading = true
          register(this.RegisterForm).then((data) => {
            this.loading = false
            this.$refs['RegisterForm'].resetFields()
            this.$message({
              message: '您已成功注册,请您联系管理员为您登录权限,您现在暂时还不能登录',
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
