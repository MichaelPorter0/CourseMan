<template>
  <el-table
    :data="list"
    border
    fit
    highlight-current-row
    style="width: 100%">
    <!-- <el-table-column
      v-loading="loading"
      align="center"
      label="课节ID"
      width="200"
      element-loading-text="请给我点时间！"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column> -->

    <el-table-column min-width="300px" label="视频ID">
      <template slot-scope="{row}">
        <span>{{ row.vedio.id }}</span>
      </template>
    </el-table-column>
    <el-table-column min-width="300px" label="视频名称">
      <template slot-scope="{row}">
        <span>{{ row.vedio.title }}</span>
      </template>
    </el-table-column>
    <el-table-column min-width="300px" label="视频描述">
      <template slot-scope="{row}">
        <span>{{ row.vedio.content }}</span>
      </template>
    </el-table-column>
    <el-table-column min-width="300px" label="视频URL">
      <template slot-scope="{row}">
        <span>{{ row.vedio.url }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getChapter } from '@/api/course'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    chapterid: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      list: null,
      loading: false,
      idForm: {
        id: this.chapterid
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      // this.$emit('create') // for test
      getChapter(this.idForm).then(response => {
        this.list = response.data.info.vedioList
        console.log(response.data.info)
        this.loading = false
      })
    }
  }
}
</script>

