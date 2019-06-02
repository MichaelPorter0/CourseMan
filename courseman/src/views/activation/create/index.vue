<template>
  <div>
    <div v-if="step">
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
      <el-row>
        <el-col :span="5" :offset="10">
          <el-steps :active="1">
            <el-step title="步骤 1" description="选择激活码对应的课程"/>
            <el-step title="步骤 2" description="复制您的激活码"/>
          </el-steps>
        </el-col>

      </el-row>
    </div>
    <div v-else>
      <el-row class="row" type="flex" justify="center" align="middle">
        <el-tag size="medium">{{ code }}</el-tag>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button type="primary" icon="document" @click="handleCopy(code,$event)">
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
  </div>
</template>

<script>
import { getCourseList } from '@/api/course'
import { CreateCode } from '@/api/activation'
import clip from '@/utils/clipboard'
export default {
  data() {
    return {
      postForm: {
        course_id: 0
      },
      step: true,
      options: [],
      value: '',
      code: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCourseList(this.listQuery).then(response => {
        var list = response.data.list
        if (list.length === 0) {
          const option = {
            value: '',
            label: '没有课程可以选择'
          }
          this.options.push(option)
        } else {
          for (let index = 0; index < list.length; index++) {
            const option = {
              value: list[index].id,
              label: list[index].name
            }
            this.options.push(option)
          }
        }

        this.listLoading = false
      })
    },
    reconfirm() {
      if (this.value === '') {
        this.$confirm('你还没有选择班级', '提示', { center: true,
          showCancelButton: false })
      } else {
        this.$confirm('你提取的课程是' + this.value, '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
          this.postForm.course_id = this.value
          CreateCode(this.postForm).then(response => {
            this.step = false
            this.code = response.data.code
          }

          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
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
<style>
.row{
  height: 150px;
}
</style>
