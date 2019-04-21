<template>
  <div class="app-container">
    <div>
      <sticky :z-index="10" class-name="sub-navbar">
        <el-col :span="12">
          <el-input v-model="input" name="searchinput" prefix-icon="el-icon-search" placeholder="请输入内容" width="20px"/>
        </el-col>
        <el-button class="search" type="primary" icon="el-icon-search" round @click="searchClick()">搜索</el-button>
        <el-button type="primary" icon="el-icon-edit-outline" round @click="createClick()">新建</el-button>
      </sticky>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="激活码">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="课程ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.courseID }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="提取老师" width="95">
        <template slot-scope="scope">
          {{ scope.row.teacher }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.be_used | statusFilter">{{ scope.row.be_used }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="提取时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/activation'
import Sticky from '@/components/Sticky'
import router from '@/router'
export default {
  components: { Sticky },
  filters: {
    statusFilter(status) {
      const statusMap = {
        used: 'success',
        unused: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      input: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    searchClick() {
      alert('搜索' + this.input)
    },
    createClick() {
      router.push({ name: 'coursecreate' })
    },
    editClick(row) {
      router.push({ name: 'coursemodify' })
    },
    shareClick(row) {
      alert('点击了分享' + row)
    },
    deleteClick(row) {
      alert('点击了删除')
    }
  }
}
</script>
<style scoped>
.components-container div {
  margin: 10px;
}

.time-container {
  display: inline-block;
}

</style>
