<template>

  <div >
    <div>
      <sticky :z-index="10" class-name="sub-navbar">
        <el-col :span="12">
          <el-input v-model="input" name="searchinput" prefix-icon="el-icon-search" placeholder="请输入内容" width="20px"/>
        </el-col>
        <el-button class="search" type="primary" icon="el-icon-search" round @click="searchClick()">搜索</el-button>

      </sticky>
    </div>
    <el-table
      v-loading="listLoading"
      :data="searchData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="作业ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="学生ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.account_id }}
        </template>
      </el-table-column>
      <el-table-column label="学生昵称" width="110">
        <template slot-scope="scope">
          {{ scope.row.student.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="提交时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column label="是否批复" width="110" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.has_feedback===0"> <el-tag type="danger">未批复</el-tag></span>
          <span v-else> <el-tag type="success">已经批复</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button-group v-if="scope.row.has_feedback===0">
            <el-tooltip class="item" effect="dark" content="查看该作业" placement="top-start">
              <el-button type="primary" icon="el-icon-position" @click="ViewHomeClick(scope.row.id)" />
            </el-tooltip>
          </el-button-group>
          <span v-else> 没有可用的操作</span>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import Sticky from '@/components/Sticky'

import { studentHomeworkList } from '@/api/homework'
export default {
  components: { Sticky },
  data() {
    return {
      postForm: {
        class_id: 0
      },
      step: true,
      options: [],
      value: '',
      input: '',
      listLoading: true,
      list: null

    }
  },
  computed: {
    searchData: function() {
      var search = this.input
      if (search) {
        return this.list.filter(function(product) {
          return Object.keys(product).some(function(key) {
            return String(product[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.list
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.postForm.class_id = this.$route.query.chapterID
      studentHomeworkList(this.postForm).then(response => {
        this.list = response.data.list

        this.listLoading = false
      })
    },
    ViewHomeClick(ID) {
      this.$router.push({ name: 'homeworkdatail', query: {
        HomeworkID: ID
      }})
    }

  }
}
</script>
<style>
.row{
  height: 150px;
}
</style>
