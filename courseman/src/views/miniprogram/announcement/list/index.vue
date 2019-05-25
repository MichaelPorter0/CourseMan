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
      <el-table-column align="center" label="ID" width="40">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="通知内容" width="500">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="创建时间" width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="update_time" label="修改时间" width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.update_time }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="操作" width="170">
        <template slot-scope="scope">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="修改此通知" placement="top-start">
              <el-button type="primary" icon="el-icon-edit" @click="editClick(scope.row.id)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除此通知" placement="top-start">
              <el-button type="primary" icon="el-icon-delete" @click="deleteClick(scope.row.id)" />
            </el-tooltip>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getNotifyList, deleteNotify } from '@/api/miniprogram'
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
      getNotifyList(this.listQuery).then(response => {
        this.list = response.data.list
        this.listLoading = false
      })
    },
    searchClick() {
      alert('搜索' + this.input)
    },
    createClick() {
      router.push({ name: 'createannouncement' })
    },
    editClick(ID) {
      this.$router.push({ name: 'modifyannouncement', query: {
        notifyID: ID
      }})
    },
    deleteClick(ID) {
      this.$confirm('删除这则通知(ID=' + ID + ')吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id: ID
        }
        deleteNotify(data).then(response => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
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
<style scoped>
.components-container div {
  margin: 10px;
}

.time-container {
  display: inline-block;
}

</style>
