<template>
  <div class="article">
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-main>
        <div class="header">
          <div class="title">
            <h1>{{articleObject.title}}</h1>
          </div>
          <div class="detail">
            最后修改时间:<span>{{articleObject.createTime | formatDate}}</span>
            修改次数:<span>{{articleObject.version}}</span>
            <span class="edit-link">
              <router-link :to="'/writeArticle/'+articleObject.id">编辑</router-link>
            </span>
          </div>
        </div>
        <mavon-editor v-model="articleObject.content"
                      :subfield="false"
                      :boxShadow="false"
                      defaultOpen="preview"
                      :toolbarsFlag="false" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: 0,
      articleObject: {}
    }
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
  },
  created () {
    this.id = this.$route.params.id
    this.$http.get('/articles/' + this.id).then(res => {
      if (res.data.status === 200) {
        this.articleObject = res.data.data
      }
    })
  }
}
</script>

<style lang="less" scoped>
.article,
.markdown-body {
  height: 100%;
}
.header {
  width: 100%;
  height: 70px;
}
.title,
.detail {
  padding-left: 20px;
}
.edit-link {
  float: right;
  padding-right: 20px;
  a {
    text-decoration: none;
  }
}
</style>