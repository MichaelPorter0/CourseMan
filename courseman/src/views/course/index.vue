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
      <el-table-column label="课程名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="开课老师" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课时" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.coursenum }}
        </template>
      </el-table-column>
      <el-table-column label="选课学生人数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.studentnum }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="课程状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="开课时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.Begin_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit" @click="editClick(scope.row)" />
            <el-button type="primary" icon="el-icon-share" @click="shareClick(scope.row.id)" />
            <el-button type="primary" icon="el-icon-delete" @click="deleteClick(scope.row)" />
          </el-button-group>
        </template>

      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/course'
import Sticky from '@/components/Sticky'
import router from '@/router'
export default {
  components: { Sticky },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
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
