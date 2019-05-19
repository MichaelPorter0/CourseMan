<template>
  <div>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%">
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
          <span>{{ row.vedio.url.url }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="视频名称">
        <template slot-scope="{row}">
          <span>{{ row.vedio.url.filename }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="isEdit">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title=" 课节信息" name="1">
          <h1>{{ chapterForm.title }}</h1>
          <div>{{ chapterForm.intro }}</div>
        </el-collapse-item>
      </el-collapse>
      <el-row >
        <el-button type="primary" icon="el-icon-edit" title="编辑此课节" circle @click="EditButton"/>
        <el-button type="danger" icon="el-icon-delete" title="删除此课节" circle/>
      </el-row>
    </div>
    <div v-else>
      <el-input v-model="chapterForm.title" placeholder="请输入课节名称"/>
      <el-input
        v-model="chapterForm.intro"
        type="textarea"
        placeholder="请输入课节内容"
        maxlength="30"
        show-word-limit="true"
      />
      <el-row>
        <el-transfer
          :filter-method="filterMethod"
          v-model="value"
          :data="data"
          :titles="['可选择视频列表','已选择的视频列表']"
          filterable
          filter-placeholder="请输入视频名称"/>
        <el-button type="primary">确认修改</el-button>
        <el-button type="primary" @click="EditButton">返回</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getChapter } from '@/api/course'
import { getVideoList } from '@/api/video'
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
      activeNames: ['1'],
      list: null,
      loading: false,
      idForm: {
        id: this.chapterid
      },
      chapterForm: {
        title: '',
        intro: ''
      },
      isEdit: true,
      data: [],
      value: [],
      filterMethod(query, item) {
        console.log(item)
        return item.label.indexOf(query) > -1
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      // 获得课节的视频列表
      getChapter(this.idForm).then(response => {
        // 视频列表,已选择的视频需要加入values
        this.list = response.data.info.vedioList
        for (let index = 0; index < this.list.length; index++) {
          const element = this.list[index].vedio_id
          this.value.push(element)
        }
        // console.log(response.data.info)
        this.chapterForm.title = response.data.info.title
        // console.log(this.chapterForm.title)
        this.chapterForm.intro = response.data.info.intro
        this.loading = false
      })
      // 获得视频列表
      getVideoList().then(response => {
        const lists = response.data.list
        for (let index = 0; index < lists.length; index++) {
          const element = lists[index]
          this.data.push({
            label: element.title,
            key: element.id
          })
        }
      })
    },
    handleChange(val) {
      console.log(val)
    },
    EditButton() {
      if (this.isEdit) {
        this.isEdit = false
      } else {
        this.$confirm('确定要放弃修改吗?', '确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
          this.isEdit = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    }
  }
}
</script>

