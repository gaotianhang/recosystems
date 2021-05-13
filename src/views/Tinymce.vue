<template>
  <div class="tinymce">
    <nav-bar>
      <template>高考数据查询系统后台管理</template>
      <template v-slot:right>
        <span>{{ $store.state.phone }}</span>
        <el-button
          type="text"
          icon="el-icon-refresh-right"
          @click="$router.back(-1)"
          >返回</el-button
        >
      </template>
    </nav-bar>
    <section>
      <el-divider>修改文章</el-divider>
      <el-select
        v-model="title"
        placeholder="请选择文章标题"
        :disabled="disabled"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-button type="primary" @click="selText" v-show="!disabled"
        >查询</el-button
      ><el-button-group v-show="disabled" style="margin-top: -3px">
        <el-button type="warning" @click="upText">修改</el-button>
        <el-button type="danger" @click="delText">删除</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </el-button-group>
      <el-divider>添加文章</el-divider>
      <el-input v-model="textTitle" placeholder="请输入文章标题"></el-input>
      <el-button type="success" @click="addText">添加</el-button>
    </section>
    <Editor v-model="myValue" :init="init"> </Editor>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver";
import "tinymce/icons/default";
import Editor from "@tinymce/tinymce-vue";
import NavBar from "components/NavBar";
//引入插件
import "tinymce/plugins/preview";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
//引入组件
import { message } from "utils/data";
import {
  getTitle,
  getAllText,
  updateText,
  addText,
  deleteText,
} from "network/distribute";
export default {
  name: "Tinymce",
  components: {
    Editor,
    NavBar,
  },
  props: {
    plugins: {
      type: [String, Array],
      default: "link lists  code table  wordcount  preview",
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo |bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent |  link unlink image code | removeformat preview",
    },
  },
  data() {
    return {
      options: [],
      textTitle: "", //input
      title: "", //select
      myValue: "",
      disabled: false,
      init: {
        language_url: "/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        plugins: this.plugins,
        toolbar: this.toolbar,
        elementpath: false,
        branding: false,
        menubar: false,
        height: 480,
      },
    };
  },
  methods: {
    //查询文章
    selText() {
      if (this.title === "") {
        message("请选择题目");
      } else {
        getAllText(this.title).then((res) => {
          this.myValue = res.data.data;
          this.disabled = true;
        });
      }
    },
    // 更新文章
    upText() {
      if (this.myValue === "") {
        message("请输入内容");
      } else {
        updateText({ id: this.title, text: this.myValue }).then((res) => {
          message(res.data.msg, "success");
        });
      }
    },
    // 添加文章
    addText() {
      if (this.disabled === true) {
        message("请先取消修改文章");
      } else if (this.textTitle === "") {
        message("请输入题目");
      } else if (this.myValue === "") {
        message("请输入内容");
      } else {
        addText({
          id: Date.now(),
          title: this.textTitle,
          text: this.myValue,
        }).then((res) => {
          message(res.data.msg, "success");
          this.getData();
        });
      }
    },
    // 删除文章
    async delText() {
      const { data } = await deleteText(this.title);
      message(data.msg, "success");
      this.getData();
      this.cancel();
    },
    // 取消添加
    cancel() {
      this.title = "";
      this.myValue = "";
      this.disabled = false;
    },
    async getData() {
      const { data } = await getTitle();
      this.options = data.data;
    },
  },
  created() {
    this.getData();
    this.$nextTick(() => {
      tinymce.init({});
    });
  },
};
</script>

<style lang="less" scoped>
.tinymce {
  section {
    padding: 5px 20px;
    .el-divider__text {
      font-size: 18px;
      font-weight: 600;
      color: #666;
    }
    .el-select,
    .el-input {
      width: 300px;
    }
    button {
      margin-left: 10px;
    }
  }
}
</style>