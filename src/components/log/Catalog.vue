<template>
  <div class="container">
    <el-container>
      <el-aside width="400px">
        <div class="tree-container">
          <el-tree :data="data"
                   :props="defaultPropsdefaultProps"
                   @node-click="handleNodeClick"></el-tree>
        </div>
      </el-aside>
      <el-main>
        <div v-if="articleList.length > 0">
          <el-card class="item"
                   v-for="item in articleList"
                   :key="item.id">
            <div>
              <span @click="handelItemClick(item.id)"
                    class="item-title">{{item.title}}</span>
              <div class="article-desc">
                <span>创建时间：{{item.createTime | formatDate}}</span>
                <el-link type="danger"
                         @click="handelItemDelete(item.id)">删除</el-link>
              </div>
            </div>
          </el-card>
        </div>
        <div v-else-if="articleList.length === 0 && (curNode.subMenuList.length<1 )">{{curNode.menuName}}菜单下暂无记录</div>
        <div v-else></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { formatDate } from '../js/common.js'
export default {
  filters: {
    formatDate (time) {
      return formatDate(time)
    }
  },
  data () {
    return {
      data: [],
      articleList: [],
      defaultPropsdefaultProps: {
        children: 'subMenuList',
        label: 'menuName'
      },
      userId: 0,
      curNode: {
        subMenuList: []
      }
    }
  },
  methods: {
    async getList () {
      const res = await this.$http.get('/menus/' + this.userId)
      this.data = res.data.data
    },
    // 点击树上的节点
    handleNodeClick (data) {
      this.curNode = data
      console.log(this.curNode)
      if (data.subMenuList.length == 0) {
        this.$http.get('/articles/list/' + data.id).then(res => {
          if (res.data.status === 200) {
            this.articleList = res.data.data
          }
        })
      }
    },
    // 查看具体的文章内容
    handelItemClick (data) {
      window.open('viewArticle/' + data, '_blank')
    },
    // 删除文章
    handelItemDelete (data) {
      this.$messageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('/articles/' + data).then(res => {
          if (res.data.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.handleNodeClick(this.curNode)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
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
<style lang='less' scoped>
// 列表每一项的设置
.item {
  width: 100%;
  text-align: left;
  .item-title {
    font-size: 30px;
    font-weight: 700;
  }
}
.el-container {
  height: 100%;
}
.el-aside {
  margin: 0 0 0 0;
}
.tree-container {
  width: calc(100% - 20px);
  height: calc(100% - 40px);
  margin: 20px 0 20px 20px;
  .el-tree {
    height: 100%;
  }
}
.article-desc {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>