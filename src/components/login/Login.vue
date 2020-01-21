<template>
  <div class="topContent">
    <!-- 登入注册显示部分 -->
    <div class="contentBox">
      <!-- 注册/登入页面切换 -->
      <div class="header">
        <div>
          <router-link to="/login">用户登入</router-link>
        </div>
        <div>
          <router-link to="/register">用户注册</router-link>
        </div>
      </div>
      <!-- 注册登入页面显示主体部分 -->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  methods: {
  },
  created() {
  }

}

</script>
<style lang='less' scoped>
.topContent {
  height: 100%;
  background-size: 100% 100%;
  background-image: url("../../assets/bj.jpg");
}
.contentBox {
  width: 450px;
  height: 380px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
}
.header {
  width: 100%;
  height: 50px;
  display: flex;
  div {
    width: 50%;
    height: 100%;
    line-height: 50px;
    text-align: center;
    a {
      display: block;
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: #000000;
      font-weight: bold;
    }
  }
  .router-link-exact-active {
    border-bottom: 2px solid #5f92ff;
  }
}
</style>