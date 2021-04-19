<template>
  <div class="index">
    <nav-bar>
      <template v-slot:right>
        <span>{{ $store.state.phone }}</span>
        <el-button type="text" icon="el-icon-refresh-right" @click="out"
          >退出</el-button
        >
      </template>
    </nav-bar>
    <Search></Search>

    <el-tabs
      type="border-card"
      @tab-click="changeData"
      v-model="$store.state.activeName"
    >
      <el-tab-pane name="1">
        <span slot="label"
          ><i class="glyphicon glyphicon-fire" style="color: red"></i>
          冲一冲</span
        >
        <Table></Table>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label"
          ><i class="glyphicon glyphicon-flag" style="color: yellow"></i>
          稳一稳</span
        >
        <Table></Table>
      </el-tab-pane>
      <el-tab-pane name="3">
        <span slot="label"
          ><i class="glyphicon glyphicon-tags" style="color: green"></i>
          保一保</span
        >
        <Table></Table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { arr } from "utils/data";
import { message } from "utils/data";
import { searchScore } from "network/distribute";
import Table from "components/Table";
import NavBar from "components/NavBar";
import Search from "components/Search";
export default {
  name: "Index",
  components: { Table, NavBar, Search },
  data() {
    return {};
  },
  methods: {
    changeData(val) {
      this.$store.commit("changeActive", val.name);
      let str = this.$store.state.totalData;
      if (val.index == 0) {
        this.$store.commit("addSearch", str.top);
        // console.log(str.top);
      } else if (val.index == 1) {
        this.$store.commit("addSearch", str.middle);
        // console.log(str.middle);
      } else {
        this.$store.commit("addSearch", str.bottom);
        // console.log(str.bottom);
      }
    },
    //====================退出=====================
    out() {
      this.$confirm("此操作将并退出用户 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.removeItem("id");
          localStorage.removeItem("phone");
          this.$store.commit("changeisLogin", false);
          this.$router.replace({ path: "/" });
          // location.reload();
        })
        .catch(() => {});
    },
  },
  mounted() {
    this.$store.dispatch("updataCount");
  },
};
</script>
<style  lang='less'>
.index {
  .el-tabs {
    .el-tabs__nav {
      padding: 0 20px;
      width: 100%;
      display: flex;
      .el-tabs__item {
        text-align: center;
        flex: 1;
        span {
          font-weight: 600;
          i {
            margin-right: 5px;
          }
        }
      }
      .is-active {
        color: red;
      }
    }
    .el-tabs__content {
      padding: 15px 0;
    }
  }
}
</style>
