<template>
  <div class="editor-box">
    <div :class="editorName" style="text-align:left"></div>
    <!-- <editor :id="editorName" class="kindeditor" content=""
      pluginsPath="/static/kindeditor/plugins/"
      :loadStyleMode="false"
      ></editor> -->
  </div>
</template>

<script>
  import E from 'wangeditor'

  export default {
    name: 'editor',
    data() {
      return {
        editorContent: ''
      }
    },
    props: {
      name: {
        type: String,
        default: ''
      }
    },
    methods: {
      getContent: function() {
        return this.editorContent
      }
    },
    computed: {
      editorName() {
        return `editor_${this.name}`
      }
    },
    mounted() {
      var editor = new E('.' + this.editorName)
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      // 下面两个配置，使用其中一个即可显示“上传图片”的tab。但是两者不要同时使用！！！
      editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
      // editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
      editor.create()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .editor-box{
    overflow: hidden;
  }
  .kindeditor{
    height: auto;
    width: 100%
  }
</style>