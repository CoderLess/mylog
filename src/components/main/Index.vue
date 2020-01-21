<template>
  <div class="container" @click="showUserCenter(false)">
    <el-container>
      <el-header>
        <div class="logo">mylog</div>
        <div class="user-center">
          <div class="user-center-drop-list" @click.stop="showUserCenter(true)">
            <img
              class="user-logo"
              :class="{'user-logo-atvice':showUserCenterMenu}"
              src="../../assets/logo.png"
            />
            <div class="user-center-items" v-show="showUserCenterMenu">
              <ul>
                <li class="user-center-item">待开发1</li>
                <li class="user-center-item">待开发2</li>
                <li class="user-center-item" @click="logout">退出</li>
              </ul>
            </div>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div class="menu">
            <el-menu>
              <el-menu-item index="4">
                <i class="el-icon-document"></i>
                <span slot="title">
                  <router-link to="/catalog">笔记本</router-link>
                </span>
              </el-menu-item>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showUserCenterMenu: false,
    };
  },
  components: {
  },
  methods: {
    showUserCenter(data) {
      this.showUserCenterMenu = data
    },
    logout() {
      window.sessionStorage.setItem('token', '')
      this.$router.push('/login')
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
  }
  .el-menu {
    background-color: #d3dce6;
    border: 0;
  }
  .el-aside {
    background-color: #d3dce6;
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
</style>