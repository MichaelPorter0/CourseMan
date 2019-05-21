<template>
  <div >
    <el-input v-model="postForm.title" placeholder="请输入课节名称"/>
    <el-input
      v-model="postForm.intro"
      type="textarea"
      placeholder="请输入课节内容"
      maxlength="30"
      show-word-limit="true"
    />
    <el-row>
      <el-transfer
        :filter-method="filterMethod"
        v-model="value"
        :data="data"
        :titles="['可选择视频列表','已选择的视频列表']"
        filterable
        filter-placeholder="请输入视频名称"/>
      <el-button type="primary">创建</el-button>
      <el-button type="primary" @click="EditButton">返回</el-button>
    </el-row>
  </div>
</template>

<script>
// import { getChapter } from '@/api/course'
import { getVideoList } from '@/api/video'
export default {
  name: 'Dashboard',
  data() {
    return {
      postForm: {
        course_id: '',
        title: '',
        intro: '',
        vedio_ids: []
      },
      data: [],
      value: [],
      filterMethod(query, item) {
        console.log(item)
        return item.label.indexOf(query) > -1
      }
    }
  },
  created() {
    this.getList()
    console.log('创建课节' + this.$route.query.chapterID)
  },
  methods: {
    getList() {
      this.loading = true
      // 获得课节的视频列表
      // getChapter(this.idForm).then(response => {
      //   // 视频列表,已选择的视频需要加入values
      //   this.list = response.data.info.vedioList
      //   for (let index = 0; index < this.list.length; index++) {
      //     const element = this.list[index].vedio_id
      //     this.value.push(element)
      //   }
      //   console.log(response.data.info)
      //   this.chapterForm.title = response.data.info.title
      //   // console.log(this.chapterForm.title)
      //   this.chapterForm.intro = response.data.info.intro
      //   this.loading = false
      // })
      // 获得视频列表
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
    EditButton() {
      this.$confirm('确定要放弃创建吗?', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        this.isEdit = true
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
