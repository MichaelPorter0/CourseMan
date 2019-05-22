<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" label-position="left">
      <div class="createPost-main-container">
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="课节名称: " prop="title">
              <el-input v-model="postForm.title" placeholder="请输入课节名称"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item style="margin-bottom: 40px;" label="课节介绍: " prop="intro">
              <el-input
                v-model="postForm.intro"
                :rows="5"
                type="textarea"
                placeholder="请输入课节内容(限制50个字以内)"
                maxlength="50"
                show-word-limit="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" style="margin-bottom: 40px;">
          <el-transfer
            :filter-method="filterMethod"
            v-model="value"
            :data="data"
            :titles="['可选择视频列表','已选择的视频列表']"
            filterable
            filter-placeholder="请输入视频名称"/>

        </el-row>
        <el-row type="flex" justify="center">
          <el-button type="primary" @click="CreateButton">创建</el-button>
          <el-button type="primary" @click="EditButton">返回</el-button>
        </el-row>
      </div>
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
          if (this.postForm.vedio_ids.length === 1) {
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
            this.$message({
              type: 'error',
              message: '你只能选择一个且必须选择一个视频'
            })
          }
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
