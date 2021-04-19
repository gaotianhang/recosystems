<template>
  <div class="admin">
    <nav-bar>
      <template>天津高考志愿推荐平台后台管理</template>
      <template v-slot:right>
        <span v-if="phone != ''">{{ phone }}</span>
        <el-button type="text" icon="el-icon-refresh-right" @click="out"
          >退出</el-button
        >
      </template>
    </nav-bar>

    <div class="main">
      <el-card>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        >
          <el-table-column prop="username" label="昵称" width="300">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="300">
          </el-table-column>
          <el-table-column prop="password" label="密码"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="del(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import NavBar from "components/NavBar";
import { userlist, delUser } from "network/distribute";
import { message } from "utils/data";
export default {
  name: "Admin",
  components: { NavBar },
  data() {
    return {
      phone: localStorage.getItem("phone"),
      tableData: [],
    };
  },
  methods: {
    del(val) {
      this.$confirm("此操作将删除此用户 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser(val.phone).then((res) => {
            if (res.data.status == "0") {
              message(res.data.msg, "error");
            } else {
              message(res.data.msg, "success");
              this.init();
            }
          });
        })
        .catch(() => {});
    },
    //====================退出=====================
    out() {
      this.$confirm("此操作将并退出用户 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.removeItem("phone");
          this.$store.commit("changeisLogin", false);
          this.$router.replace({ path: "/" });
        })
        .catch(() => {});
    },
    init() {
      userlist().then((res) => {
        this.tableData = res.data.data;
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
.admin {
  height: 100%;
  background: url("~assets/images/login/bg.jpg");
  background-size: cover;
  .main {
    padding: 20px 100px;
  }
}
</style>