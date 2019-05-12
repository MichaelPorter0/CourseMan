<template>
  <div>
    <el-row class="row" type="flex" justify="center" align="middle">
      <el-tag size="medium">{{ inputData }}</el-tag>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button type="primary" icon="document" @click="handleCopy(inputData,$event)">
        复制
      </el-button>
    </el-row>
    <el-col :span="5" :offset="10">
      <el-steps :active="2">
        <el-step title="步骤 1" description="选择激活码对应的课程"/>
        <el-step title="步骤 2" description="复制您的激活码"/>
      </el-steps>
    </el-col>
  </div>
</template>

<script>
import clip from '@/utils/clipboard' // use clipboard directly
import { create } from '@/api/activation'
export default {
  data() {
    return {
      inputData: 'https://github.com/PanJiaChen/vue-element-admin'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      create(this.listQuery).then(response => {
        this.inputData = response.data.activation
      })
    },
    handleCopy(text, event) {
      clip(text, event)
    },
    clipboardSuccess() {
      this.$message({
        message: '复制 成功',
        type: 'success',
        duration: 1500
      })
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
.row{
  height: 150px;
}
</style>
