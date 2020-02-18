<template>
  <div class="container"
       @click="showUserCenter(false)">
    <el-container>
      <el-aside class="aside"
                :style="asideStyle">
        <div class="logo">
          <div v-if="isCollapse"
               class="logo-text logo-text-collapse"><span>M</span></div>
          <div v-else
               class="logo-text logo-text-pack-up"><span>M</span>ylog</div>
        </div>
        <div class="menu">
          <el-menu router
                   :default-active="$route.path"
                   :collapse="isCollapse">
            <el-menu-item index="/catalog">
              <i class="el-icon-document"></i>
              <span>
                笔记本
              </span>
            </el-menu-item>
            <el-menu-item index="/menuManage">
              <i class="el-icon-document"></i>
              <span>
                菜单管理
              </span>
            </el-menu-item>
            <el-menu-item index="/record">
              <i class="el-icon-document"></i>
              <span>
                事项管理
              </span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <div class="iconfont icon-iconfontcaidan"
               @click="collapseHandel"
               :class="{packup:isCollapse}"></div>
          <div>
            <router-link to="/writeArticle/0"
                         target="_blank">写文章</router-link>
          </div>
          <div class="user-center">
            <div class="user-center-drop-list"
                 @click.stop="showUserCenter(true)">

              <img class="user-logo"
                   :class="{'user-logo-atvice':showUserCenterMenu}"
                   src="../../assets/logo.png" />
              <div class="user-center-items"
                   v-show="showUserCenterMenu">
                <ul>
                  <li class="user-center-item">待开发1</li>
                  <li class="user-center-item">待开发2</li>
                  <li class="user-center-item"
                      @click="logout">退出</li>
                </ul>
              </div>
            </div>
          </div>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 显示用户中心的菜单
      showUserCenterMenu: false,
      // 是否收起菜单
      isCollapse: false,
      // 侧边栏样式
      asideStyle: {
        width: '200px'
      }
    };
  },
  components: {
  },
  methods: {
    showUserCenter (data) {
      this.showUserCenterMenu = data
    },
    logout () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    collapseHandel () {
      if (!this.isCollapse) {
        this.asideStyle.width = '70px'
      } else {
        this.asideStyle.width = '200px'
      }
      this.isCollapse = !this.isCollapse
    }
  }

}

</script>
<style lang='less' scoped>
.container {
  widows: 100%;
  height: 100%;
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    // 侧边栏收起按钮
    .packup {
      transform: rotate(90deg);
    }
  }
  .el-menu {
    // background-color: #001529;
    background-color: #004381;
    border: 0;
    .el-menu-item {
      span {
        color: #ffffff;
      }
    }
    .is-active,
    .el-menu-item:hover {
      background-color: #ecf5ff;
      font-weight: 700;
      color: #000000;
      span {
        color: #000000;
      }
    }
  }
  .el-aside {
    background-color: #004381;
    color: #333;
    text-align: center;
  }
  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    padding: 0;
  }
  .el-container {
    width: 100%;
    height: 100%;
  }
  .write-article {
    height: 60px;
    line-height: 60px;
  }
  .user-center-drop-list {
    position: relative;
    display: inline-block;
    .user-logo {
      width: 40px;
      height: 40px;
      margin-top: 10px;
      border-radius: 50%;
      border: 3px solid #b3c0d1;
    }
    .user-logo-atvice {
      border: 3px solid #e2e6eb;
    }
    .user-center-items {
      position: absolute;
      top: 60px;
      right: 0px;
      z-index: 9999;
      border: #b3c0d1 solid 1px;
      border-radius: 5px;
      box-shadow: 5px 5px 5px #cecece;
      ul {
        list-style: none;
      }
    }
    .user-center-item {
      min-width: 100px;
      line-height: 40px;
      background: #ffffff;
      padding-left: 10px;
      font-size: 13px;
      color: #6b6b6b;
    }
    .user-center-item:nth-last-child(1) {
      border-top: 1px solid #d6d6d6;
    }
    .user-center-item:hover {
      background: #f5f4f4;
    }
  }
}
// 侧边栏
.aside {
  // 菜单展开样式
  .open {
    width: 200px;
  }
  // 菜单收起样式
  .pack-up {
    width: 40px;
  }
  // logo对应样式控制
  .logo {
    // width: 200px;
    height: 40px;
    margin-bottom: 10px;
    span {
      color: #000000;
    }
    .logo-text {
      height: 40px;
      font-family: "Helvetica Neue";
      color: #ffffff;
      background-color: #2d8cf0;
      margin: 10px auto;
      line-height: 40px;
      font-size: 20px;
      font-weight: 700;
      border-radius: 5px;
    }
    // 侧边栏展开的样式
    .logo-text-pack-up {
      width: 100px;
    }
    // 侧边栏合并时的样式
    .logo-text-collapse {
      width: 50px;
    }
  }
}
</style>