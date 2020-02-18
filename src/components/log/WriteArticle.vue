<template>
  <div class="mavonEditor">
    <div class="title">
      <table>
        <tr>
          <td>
            <div @click="handleType"
                 class="type">
              <span>{{checkNode.menuName}}</span>
              <span class="el-icon-caret-bottom"></span>
              <el-tree :data="data"
                       :props="defaultPropsdefaultProps"
                       v-if="typeTree"
                       style="position: absolute;z-index: 99999;"
                       @node-click="handleNodeClick"></el-tree>
            </div>
          </td>
          <td>
            <el-input v-model="article.title"
                      placeholder="请输入标题"></el-input>
          </td>
        </tr>
      </table>

    </div>
    <div class="log">
      <mavon-editor v-model="article.content"
                    @save="saveArticle"
                    @imgAdd="$imgAdd"
                    ref=md />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      article: {
        id: 0,
        title: '',
        content: '# 123',
        menuId: 0,
        version: 0
      },
      typeTree: false,
      checkNode: '',
      data: [],
      defaultPropsdefaultProps: {
        children: 'subMenuList',
        label: 'menuName'
      }
    }
  },
  methods: {
    handleType () {
      this.typeTree = !this.typeTree
    },
    handleNodeClick (data) {
      if (0 === data.subMenuList.length) {
        this.checkNode = data
        this.article.menuId = data.id
        this.handleType()
      }
    },
    saveArticle () {
      // 分类不能为空
      if (!this.article.menuId) {
        this.$message.error('请选择分类')
        return
      }
      // 标题不能为空
      if (!this.article.title) {
        this.$message.error('请输入标题')
        return
      }
      this.$http.post('articles', this.article).then(res => {
        if (res.data.status === 200) {
          this.$message.info('success')
        }
      })
    },
    // 绑定@imgAdd event
    $imgAdd (pos, $file) {
      var formdata = new FormData();
      formdata.append('image', $file);
      this.$http({
        url: '/image',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((url) => {
        this.$refs.md.$img2Url(pos, 'http://localhost:8081/image/' + url.data.data)
      })
    }
  },
  created () {
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    this.$http.get('/menus/' + userInfo.id).then(res => {
      if (res.data.status === 200) {
        this.data = res.data.data
      }
    })
    this.id = this.$route.params.id
    if (this.id < 1) {
      return
    }
    this.$http.get('/articles/' + this.id).then(res => {
      if (res.data.status === 200) {
        this.article = res.data.data
      }
    })
  }
}
</script>

<style lang='less' scoped>
.mavonEditor,
.markdown-body {
  width: 100%;
  height: 100%;
}
.mavonEditor {
  position: relative;
}
.title {
  line-height: normal;
  height: 40px;
  table {
    width: 100%;
  }
  .type {
    position: relative;
  }
}
.el-input {
  .el-input__inner {
    border: 0px solid #dcdfe6;
  }
}
.log {
  width: 100%;
  position: absolute;
  top: 40px;
  bottom: 0px;
  left: 0px;
}
</style>