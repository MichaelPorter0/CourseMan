<template>
  <div>
    <el-row class="row" type="flex" justify="center" align="middle">
      <el-select v-model="value" placeholder="请选择班级">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button type="primary" round @click="reconfirm">提取激活码</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: '选项1',
        label: '班级1'
      }, {
        value: '选项2',
        label: '班级2'
      }, {
        value: '选项3',
        label: '班级3'
      }, {
        value: '选项4',
        label: '班级4'
      }, {
        value: '选项5',
        label: '班级5'
      }],
      value: ''
    }
  },
  methods: {
    reconfirm() {
      if (this.value === '') {
        this.$alert('你还没有选择班级', '注意')
      } else {
        this.$alert('你提取的课程是' + this.value, '确认', {
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '确定'
        })
      }
    }
  }
}
</script>
<style>
.row{
  height: 150px;
}
</style>
