<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您! {{ name }}</div>
    <div class="dashboard-text">您的权限是:{{ role }}</div>
    <div class="dashboard-text">您的联系方式:{{ phone }}</div>
    <div class="dashboard-text">登录设备:{{ device }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRole } from '@/utils/auth'
export default {
  name: 'Dashboard',
  data() {
    return {
      role: getRole()
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'phone',
      'device'
    ])
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
