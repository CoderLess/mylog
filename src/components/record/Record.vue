<template>
  <div class="container"
       :style="{display:'flex'}">
    <div class="wait-container">
      <span class="title">待办事项</span>
      <el-button type="success"
                 icon="el-icon-circle-plus-outline"
                 size="mini"
                 @click="addItem(1)"
                 circle></el-button>

      <div class="items">
        <draggable v-model="items.waitItemList"
                   @end='allow'
                   :options="{animation:500,group:'people'}">
          <transition-group>
            <div v-for="e in items.waitItemList"
                 :key="e.text">
              <el-card class="box-card">
                <div slot="header"
                     class="clearfix">
                  <span>{{e.text}}</span>
                  <el-button icon="el-icon-search"
                             style="float: right;"
                             size="mini"
                             @click="e.show=!e.show"
                             circle></el-button>
                  <el-button type="primary"
                             style="float: right;"
                             icon="el-icon-edit"
                             size="mini"
                             @click="editItem(e)"
                             circle></el-button>
                  <el-button type="danger"
                             style="float: right;"
                             icon="el-icon-delete"
                             size="mini"
                             @click="removeItem(e,1)"
                             circle></el-button>
                </div>
                <div v-if="e.show">
                  <div v-for="(o,index) in e.subItemList"
                       :key="index"
                       class="text item">
                    {{ o.text }}
                  </div>
                </div>
              </el-card>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>

    <!-- 完成事项 -->
    <div class="complate-container">
      <span class="title">完成事项</span>
      <el-button type="success"
                 icon="el-icon-circle-plus-outline"
                 size="mini"
                 @click="addItem(2)"
                 circle></el-button>

      <div class="items">
        <draggable v-model="items.complateItemList"
                   @end='allow'
                   :options="{animation:500,group:'people'}">
          <transition-group>
            <div v-for="e in items.complateItemList"
                 :key="e.text">
              <el-card class="box-card">
                <div slot="header"
                     class="clearfix">
                  <span>{{e.text}}</span>
                  <el-button icon="el-icon-search"
                             style="float: right;"
                             size="mini"
                             @click="e.show=!e.show"
                             circle></el-button>
                  <el-button type="primary"
                             style="float: right;"
                             icon="el-icon-edit"
                             size="mini"
                             @click="editItem(e)"
                             circle></el-button>
                  <el-button type="danger"
                             style="float: right;"
                             icon="el-icon-delete"
                             size="mini"
                             @click="removeItem(e,2)"
                             circle></el-button>
                </div>
                <div v-if="e.show">
                  <div v-for="(o,index) in e.subItemList"
                       :key="index"
                       class="text item">
                    {{ o.text }}
                  </div>
                </div>
              </el-card>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>

    <!-- 丢弃事项 -->
    <div class="abandon-container">
      <span class="title">丢弃事项</span>
      <el-button type="success"
                 icon="el-icon-circle-plus-outline"
                 size="mini"
                 @click="addItem(3)"
                 circle></el-button>

      <div class="items">
        <draggable v-model="items.abandonItemList"
                   @end='allow'
                   :options="{animation:500,group:'people'}">
          <transition-group>
            <div v-for="e in items.abandonItemList"
                 :key="e.text">
              <el-card class="box-card">
                <div slot="header"
                     class="clearfix">
                  <span>{{e.text}}</span>
                  <el-button icon="el-icon-search"
                             style="float: right;"
                             size="mini"
                             @click="e.show=!e.show"
                             circle></el-button>
                  <el-button type="primary"
                             style="float: right;"
                             icon="el-icon-edit"
                             size="mini"
                             @click="editItem(e)"
                             circle></el-button>
                  <el-button type="danger"
                             style="float: right;"
                             icon="el-icon-delete"
                             size="mini"
                             @click="removeItem(e,3)"
                             circle></el-button>
                </div>
                <div v-if="e.show">
                  <div v-for="(o,index) in e.subItemList"
                       :key="index"
                       class="text item">
                    {{ o.text }}
                  </div>
                </div>
              </el-card>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>

    <el-dialog title="编辑"
               :visible.sync="editDialogVisible"
               width="30%">
      <el-form :model="curitem"
               ref="itemForm"
               label-width="100px">
        <el-form-item prop="text"
                      label="标题"
                      :rules="[
      { required: true, message: '请输入标题', trigger: 'blur' }
    ]">
          <el-input v-model="curitem.text"></el-input>
        </el-form-item>
        <el-form-item v-for="(cur, index) in curitem.subItemList"
                      :label="'子标题' + index"
                      :key="index">
          <el-input v-model="cur.text"
                    class="subitem"></el-input>
          <el-button @click.prevent="removeSubItem(cur)">删除</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addSubItem">新增子标题</el-button>
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加"
               :visible.sync="addDialogVisible"
               width="30%">
      <el-form :model="newitem"
               ref="itemForm"
               label-width="100px">
        <el-form-item prop="text"
                      label="标题"
                      :rules="[
      { required: true, message: '请输入标题', trigger: 'blur' }
    ]">
          <el-input v-model="newitem.text"></el-input>
        </el-form-item>
        <el-form-item v-for="(cur, index) in newitem.subItemList"
                      :label="'子标题' + index"
                      :key="index">
          <el-input v-model="cur.text"
                    class="subitem"></el-input>
          <el-button @click.prevent="removeSubItem(cur)">删除</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addSubItem">新增子标题</el-button>
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addItemConfirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import draggable from "vuedraggable"
export default {
  name: "PageDrag",
  data () {
    return {
      items: {},
      editDialogVisible: false,
      addDialogVisible: false,
      curitem: {
        text: '',
        show: false,
        subItemList: [{ text: '' }]
      },
      newitem: {
        type: 0,
        text: '',
        show: false,
        subItemList: [{ text: '' }]
      }
    }
  },
  methods: {
    allow () {
      this.$http.post('/items', this.items).then(res => {
        if (res.data.status !== 200) {
          this.$message.error("保存失败")
        }
      })
    },
    addItem (type) {
      this.newitem.type = type
      this.addDialogVisible = true
    },
    addItemConfirm () {
      if (this.newitem.type === 1) {
        this.items.waitItemList.push(this.newitem)
      } else if (this.newitem.type === 2) {
        this.items.complateItemList.push(this.newitem)
      } else if (this.newitem.type === 3) {
        this.items.abandonItemList.push(this.newitem)
      }

      this.newitem = {
        type: 0,
        text: '',
        show: false,
        subItemList: [{ text: '' }]
      }
      this.addDialogVisible = false
      this.allow()
    },
    editItem (item) {
      this.editDialogVisible = true
      this.curitem = item
      this.allow()
    },
    removeItem (item, type) {

      if (type === 1) {
        let index = this.items.waitItemList.indexOf(item)
        if (index !== -1) {
          this.items.waitItemList.splice(index, 1)
        }
      } else if (type === 2) {
        let index = this.items.complateItemList.indexOf(item)
        if (index !== -1) {
          this.items.complateItemList.splice(index, 1)
        }
      } else if (type === 3) {
        let index = this.items.abandonItemList.indexOf(item)
        if (index !== -1) {
          this.items.abandonItemList.splice(index, 1)
        }
      }
      this.allow()
    },
    addSubItem () {
      this.curitem.subItemList.push({ 'text': '' })
    },
    removeSubItem (item) {
      let index = this.curitem.subItemList.indexOf(item)
      if (index !== -1) {
        this.curitem.subItemList.splice(index, 1)
      }
    }
  },
  components: {
    draggable
  },
  created () {
    this.$http.get('/items').then(res => {
      if (res.data.status === 200) {
        this.items = res.data.data
      }
    })
  }
}
</script>

<style lang="less" scoped>
.container {
  width: calc(100% - 40px);
  height: auto;
  background-color: #fff;
  margin: 20px;
  padding: 20px 0;
  .wait-container,
  .abandon-container,
  .complate-container {
    text-align: left;
    margin-left: 10px;
    .title {
      font-size: 20px;
      font-weight: 700;
      margin-left: 10px;
      line-height: 30px;
    }
    .el-button {
      position: relative;
      margin-left: 10px;
      top: -5px;
    }
    .items {
      width: 290px;
      min-height: 50px;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      .itme {
        width: 270px;
        margin: 10px;
      }
    }
  }

  .el-form-item {
    .subitem {
      width: 70%;
    }
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 270px;
    margin: 10px;
  }
}
</style>
