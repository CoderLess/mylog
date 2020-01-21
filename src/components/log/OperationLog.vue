<template>
  <div class="mavonEditor">
    <div class="title">
      <el-input v-model="title" placeholder="请输入标题"></el-input>
    </div>
    <div class="log">
      <mavon-editor
        :toolbarsFlag="toolbarsFlag"
        :subfield="subfield"
        :defaultOpen="defaultOpen"
        :toolbars="markdownOption"
        v-model="logdata"
        @readOnly="readOnly"
        @previewToggle="previewToggle"
        @subfieldToggle="subfieldToggle"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ['logdata'],
  data() {
    return {
      title: '',
      toolbarsFlag: true,
      subfield: false,
      defaultOpen: 'preview',
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      }
    }
  },
  methods: {
    // 预览模式
    readOnly() {
      this.subfield = false
      this.markdownOption = {
        bold: false, // 粗体
        italic: false, // 斜体
        header: false, // 标题
        underline: false, // 下划线
        strikethrough: false, // 中划线
        mark: false, // 标记
        superscript: false, // 上角标
        subscript: false, // 下角标
        quote: false, // 引用
        ol: false, // 有序列表
        ul: false, // 无序列表
        link: false, // 链接
        imagelink: false, // 图片链接
        code: false, // code
        table: false, // 表格
        help: false, // 帮助
        /* 1.3.5 */
        undo: false, // 上一步
        redo: false, // 下一步
        trash: false, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.1.8 */
        alignleft: false, // 左对齐
        aligncenter: false, // 居中
        alignright: false, // 右对齐
        /* 2.2.1 */
        subfield: false, // 单双栏模式
        preview: true, // 预览
      }
    },
    // 编辑模式
    edit() {
      this.markdownOption = {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      }
    },
    // 切换预览编辑的回调事件
    previewToggle(status) {
      if (status) {
        this.readOnly()
      } else {
        this.edit()
      }

    },
    // 切换单双栏编辑的回调事件
    subfieldToggle(status) {
      this.subfield = status
      this.edit()
    }
  }
}
</script>

<style scoped>
.mavonEditor,
.markdown-body {
  width: 100%;
  height: 100%;
}
.mavonEditor{
  position: relative;
}
.title {
  line-height: normal;
  height: 40px;
}
.log {
  width: 100%;
  position: absolute;
  top: 40px;
  bottom: 0px;
  left: 0px;
}
</style>