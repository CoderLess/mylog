<template>
  <div class="container">
    <el-container>
      <el-aside width="200px">
        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:scroll">
          <li v-for="i in count" class="infinite-list-item" v-bind:key="i">{{ i }}</li>
        </ul>
      </el-aside>
      <el-main>
        <operation-log :logdata="logdata" ref="operationLogRef"></operation-log>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import OperationLog from './OperationLog.vue'
export default {
  data() {
    return {
      count: 0,
      logdata: "#### how to use mavonEditor in nuxt.js",
    }
  },
  components: {
    OperationLog
  },
  methods: {
    load() {
      this.count += 2
    },
    readOnly() {
      this.$refs.operationLogRef.readOnly()
    }
  },
  mounted() {
    this.readOnly()
  }

}

</script>
<style lang='less' scoped>
.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  padding: 0;
}
.container,
.el-container,
.el-aside,
.el-main,
.infinite-list {
  height: 100%;
}
.el-aside::-webkit-scrollbar,.infinite-list::-webkit-scrollbar {
  display: none;
}
</style>