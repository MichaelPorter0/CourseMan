<template>
  <div class="app-container">
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
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          {{ scope.row.teacher.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.teacher.create_time }}</span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { getTeacherList } from '@/api/user'
import Sticky from '@/components/Sticky'
export default {
  components: { Sticky },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
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
      getTeacherList().then(response => {
        this.list = response.data.list
        this.listLoading = false
      })
    },
    searchClick() {
      alert('搜索' + this.input)
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
