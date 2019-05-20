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
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="视频名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="视频描述">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="视频地址">
        <template slot-scope="scope">
          {{ scope.row.url.url }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit" @click="editClick(scope.row)" />
            <el-button type="primary" icon="el-icon-delete" @click="deleteClick(scope.row.id)" />
          </el-button-group>
        </template>

      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getVideoList, deleteVideo } from '@/api/video'
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
      getVideoList(this.listQuery).then(response => {
        this.list = response.data.list
        this.listLoading = false
      })
    },
    searchClick() {
      alert('搜索' + this.input)
    },
    createClick() {
      router.push({ name: 'videoupload' })
    },
    editClick(row) {
      router.push({ name: 'videodetail' })
    },
    shareClick(row) {
      alert('点击了分享' + row)
    },
    deleteClick(videoID) {
      this.$confirm('删除这个视频(ID=' + videoID + ')吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const PostForm = {
          id: videoID
        }
        deleteVideo(PostForm).then(response => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '视频(ID=' + videoID + ')' + '删除成功!'
          })
        }

        )
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
