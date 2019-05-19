<template>
  <div class="dashboard-container">
    <div class="dashboard-text">作业查看</div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  created() {
    alert('创建课节')
    console.log('创建课节')
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
