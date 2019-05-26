<template>
  <div class="tab-container">
    <el-tag>一个课节只能拥有一个最多一个课前作业和一个课后作业</el-tag>
    <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;" title="同一个课节的多个相同作业将不会在小程序中显示" type="success" />
    <el-button type="primary" title="添加课节" @click="createChapter"> 创建新的课节</el-button>
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.label">
        <keep-alive>
          <tab-pane v-if="activeName==item.label" :chapterid="item.key" @create="showCreatedTimes" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabPane from './components/TabPane'
import { getDetail } from '@/api/course'
export default {
  name: 'Tab',
  components: { tabPane },
  data() {
    return {
      getcourseForm: {
        course_id: ''
      },
      tabMapOptions: [],
      activeName: 0,
      createdTimes: 0,
      classlist: []
    }
  },
  created() {
    this.getcourseForm.course_id = this.$route.params.course_id
    this.fetchData(this.getcourseForm)
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    },
    fetchData(getcourseForm) {
      getDetail(getcourseForm).then(response => {
        var classlist = response.data.info.classList
        for (var i = 0, l = classlist.length; i < l; i++) {
          var tablist = {}
          tablist['label'] = '第' + (i + 1) + '节'
          tablist['key'] = classlist[i].id
          this.tabMapOptions.push(tablist)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    createChapter() {
      this.$router.push({ name: 'chaptercreate', query: {
        chapterID: this.getcourseForm.course_id
      }})

      // router.push({ name: 'createchapter' })
    }
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
