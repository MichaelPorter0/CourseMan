<template>
  <div >
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <el-form-item style="margin-bottom: 40px;" prop="title">
        <el-input v-model="postForm.title" placeholder="请输入课节名称"/>
      </el-form-item>
      <el-form-item style="margin-bottom: 40px;" prop="intro">
        <el-input
          v-model="postForm.intro"
          type="textarea"
          placeholder="请输入课节内容"
          maxlength="30"
          show-word-limit="true"
        />
      </el-form-item>

      <el-row>
        <el-transfer
          :filter-method="filterMethod"
          v-model="value"
          :data="data"
          :titles="['可选择视频列表','已选择的视频列表']"
          filterable
          filter-placeholder="请输入视频名称"/>
        <el-button type="primary" @click="CreateButton">创建</el-button>
        <el-button type="primary" @click="EditButton">返回</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// import { getChapter } from '@/api/course'
import { getVideoList } from '@/api/video'
import { submitClass } from '@/api/course'
export default {
  name: 'Dashboard',
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      postForm: {
        course_id: '',
        title: '',
        intro: '',
        vedio_ids: []
      },
      data: [],
      value: [],
      rules: {
        title: [{ validator: validateRequire }],
        intro: [{ validator: validateRequire }]
      },
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1
      }
    }
  },
  created() {
    this.getList()
    this.postForm.course_id = this.$route.query.chapterID
  },
  methods: {
    getList() {
      this.loading = true
      getVideoList().then(response => {
        const lists = response.data.list
        for (let index = 0; index < lists.length; index++) {
          const element = lists[index]
          this.data.push({
            label: element.title,
            key: element.id
          })
        }
      })
    },
    CreateButton() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.postForm.vedio_ids = this.value
          // submitCourse()
          submitClass(this.postForm).then(response => {
            this.$notify({
              title: '成功',
              message: '课节添加成功成功',
              type: 'success',
              duration: 5000
            })
            this.$router.go(-1)
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '请完整填写',
            duration: 0
          })
        }
      })
    },
    EditButton() {
      this.$confirm('确定要放弃创建吗?', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        this.$router.go(-1)
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
