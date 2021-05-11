<template>
  <div class="admin">
    <nav-bar>
      <template>高考数据查询系统后台管理</template>
      <template v-slot:right>
        <span v-if="phone != ''">{{ phone }}</span>
        <el-button type="text" icon="el-icon-refresh-right" @click="out"
          >退出</el-button
        >
      </template>
    </nav-bar>
    <div class="main">
      <el-card>
        <div class="searchUser">
          <el-input
            placeholder="请输入手机号"
            v-model="userPhone"
            maxlength="11"
          ></el-input>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button
            type="success"
            @click="$router.push('/tinymce')"
            style="margin-left: 680px"
            >编辑文章</el-button
          >
        </div>
        <el-dialog
          title="编辑"
          :visible.sync="centerDialogVisible"
          :close-on-click-modal="false"
          width="30%"
          center
        >
          <div class="dialog-div">
            <p>
              <span>昵称：</span><el-input v-model="user.username"></el-input>
            </p>
            <p>
              <span>手机号：</span
              ><el-input v-model="user.phone" disabled></el-input>
            </p>
            <p>
              <span>密码：</span><el-input v-model="user.password"></el-input>
            </p>
          </div>
          <span slot="footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="sure">确 定</el-button>
          </span>
        </el-dialog>

        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * currentSize,
              currentPage * currentSize
            )
          "
          border
          style="width: 100%"
          height="400"
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
                type="warning"
                size="small"
                icon="el-icon-edit"
                @click="edit(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                @click="del(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="tableData.length > 0"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="currentSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        >
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import NavBar from "components/NavBar";
import { userlist, delUser, userByPhone, updateUser } from "network/distribute";
import { message } from "utils/data";
export default {
  name: "Admin",
  components: { NavBar },
  data() {
    return {
      centerDialogVisible: false,
      userPhone: "",
      user: {},
      tableDataCopy: {},
      phone: localStorage.getItem("phone"),
      tableData: [],
      currentPage: 1,
      currentSize: 5,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.currentSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    async search() {
      if (this.userPhone === "") {
        message("请输入手机号");
      } else {
        const { data } = await userByPhone(this.userPhone);
        if (data.status === true) {
          this.tableData = data.data;
          message(data.msg, "success");
        } else {
          message(data.msg);
        }
      }
    },
    async sure() {
      const { data } = await updateUser(this.user);
      if (data.status === true) {
        message(data.msg, "success");
      } else {
        message(data.msg);
      }
      this.centerDialogVisible = false;
      this.init();
    },
    cancel() {
      this.tableData = this.tableDataCopy;
      this.centerDialogVisible = false;
    },
    edit(val) {
      this.centerDialogVisible = true;
      this.user = val;
    },
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
        this.tableDataCopy = JSON.parse(JSON.stringify(this.tableData));
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
    .dialog-div {
      p {
        display: flex;
        align-items: center;
        span {
          width: 100px;
          font-size: 16px;
          font-weight: 600;
          color: #666;
        }
      }
    }
    .el-card {
      padding-top: 20px;
      height: 600px;
      .searchUser {
        margin-bottom: 10px;
        .el-input {
          width: 200px;
        }
        button {
          margin-left: 10px;
        }
      }
      .el-pagination {
        float: right;
        margin-top: 20px;
      }
    }
  }
}
</style>