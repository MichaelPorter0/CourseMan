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
      :data="searchData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="课程名称" width="110">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="开课老师" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.teacher.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程简介" width="440" align="center">
        <template slot-scope="scope">
          {{ scope.row.short_introduction }}
        </template>
      </el-table-column>
      <el-table-column label="课程类别" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.catalog }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="选课学生人数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.activate_time }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="是否可以试听" width="110" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.can_experience===1" :type="scope.row.can_experience | statusFilter">是</el-tag>
          <el-tag v-else :type="scope.row.can_experience | statusFilter">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="编辑课程信息" placement="top-start">
              <el-button type="primary" icon="el-icon-edit" @click="editClick(scope.row.id)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="编辑课程内容" placement="top-start">
              <el-button type="primary" icon="el-icon-s-unfold" @click="shareClick(scope.row.id)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除此课程" placement="top-start">
              <el-button type="primary" icon="el-icon-delete" @click="deleteClick(scope.row)" />
            </el-tooltip>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCourseList } from '@/api/course'
import Sticky from '@/components/Sticky'
import router from '@/router'
export default {
  components: { Sticky },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        0: 'danger'
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
      getCourseList(this.listQuery).then(response => {
        this.list = response.data.list
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
      console.log(row)
      router.push({ path: 'modify/' + row })
    },
    shareClick(row) {
      router.push({ path: 'chapter/' + row })
    },
    deleteClick(row) {
      alert('现在还不能删除课程')
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
