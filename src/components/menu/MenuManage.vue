<template>
  <div>
    <el-table :data="articleTree"
              style="width: 100%;margin-bottom: 20px;"
              row-key="id"
              border
              default-expand-all
              :tree-props="{children: 'subMenuList'}">
      <el-table-column prop="menuName"
                       label="菜单名称"
                       width="600">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="创建时间"
                       :formatter="formatter"
                       width="250">
      </el-table-column>
      <el-table-column label="操作">
        <template slot="header">
          <el-button type="success"
                     @click="handleAdd({id:0})"
                     round>添加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini"
                     type="success"
                     @click="handleAdd(scope.row)">添加</el-button>
          <el-button size="mini"
                     @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate } from '../js/common.js'
export default {
  data () {
    return {
      articleTree: [],
      userId: 0
    }
  },
  methods: {
    // 获取菜单列表
    async getList () {
      const res = await this.$http.get('/menus/' + this.userId)
      this.articleTree = res.data.data
    },
    formatter (row) {
      return formatDate(row.createTime);
    },
    handleEdit (data) {
      this.$messageBox.prompt('编辑菜单‘' + data.menuName + '’', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /([u4e00-u9fa5\dA-Za-z]){2,50}/,
        inputErrorMessage: '可输入的长度为2-50'
      }).then(({ value }) => {
        this.$http.post('/menus', { 'id': data.id, 'menuName': value }).then(res => {
          if (res.data.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.getList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消编辑'
        })
      })
    },
    // 删除菜单
    handleDelete (data) {
      this.$messageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('/menus/' + data.id).then(res => {
          if (res.data.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.getList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })

    },
    handleAdd (data) {
      let propText = '为‘' + data.menuName + '’添加子菜单'
      if (data.id === 0) {
        propText = '添加一级菜单'
      }
      this.$messageBox.prompt(propText, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /([u4e00-u9fa5\dA-Za-z]){2,50}/,
        inputErrorMessage: '可输入的长度为2-50'
      }).then(({ value }) => {
        this.$http.put('/menus', { 'parentId': data.id, 'menuName': value }).then(res => {
          if (res.data.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.message
            })
            this.getList()
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消添加'
        })
      })
    }
  },
  created () {
    this.userId = JSON.parse(window.sessionStorage.getItem('userInfo')).id
    this.getList()
  }

}
</script>

<style>
</style>