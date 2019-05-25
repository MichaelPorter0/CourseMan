<template>
  <div>
    <el-button type="primary" icon="el-icon-edit-outline" round @click="createClick()">新建</el-button>
    <el-table

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
      <el-table-column align="center" label="描述" width="95">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column label="预览" width="110" align="center">
        <template slot-scope="scope">
          <!-- {{ scope.row.img.url }} -->
          <viewer style="height: 200px;">
            <img :src="scope.row.img.url" :key="scope.row.img.filename" height="100">
          </viewer>

        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="删除该轮播图" placement="top-start">
              <el-button type="primary" icon="el-icon-delete" @click="deleteClick(scope.row.id)" />
            </el-tooltip>
          </el-button-group>

        </template>
      </el-table-column>
    </el-table>
  </div>

</template>
<script>
// import Tinymce from '@/components/Tinymce'
import { listBanner, deleteBanner } from '@/api/miniprogram'
import router from '@/router'
// import '@/utils/tinymce/zh_CN.js'

export default {

  // components: { Tinymce },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      listBanner().then(responce => {
        this.list = responce.data.list
      })
    },
    deleteClick(BannerID) {
      this.$confirm('删除这个轮播图(ID=' + BannerID + ')吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const PostForm = {
          id: BannerID
        }
        console.log(PostForm)

        deleteBanner(PostForm).then(response => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '轮播图(ID=' + BannerID + ')' + '删除成功!'
          })
        }

        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    createClick() {
      router.push({ name: 'bannercreate' })
    }
  }
}
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

