<template>
  <div class="tab-container">
    <el-tag>mounted times ：{{ createdTimes }}</el-tag>
    <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;" title="Tab with keep-alive" type="success" />
    <el-button type="primary" icon="el-icon-edit" circle title="添加课节" @click="createChapter"/>
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
          tablist['label'] = '第' + i + '节'
          tablist['key'] = classlist[i].id
          this.tabMapOptions.push(tablist)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    createChapter() {
      console.log('路由变了')
      this.$router.push({ name: 'createchapter' })
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
