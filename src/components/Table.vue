<template>
  <div class="main">
    <el-table
      :data="table.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
      style="width: 100%"
      height="450"
      :default-sort="{ prop: 'tzcj' }"
      border
    >
      <!-- 2020qjlq1 -->
      <el-table-column fixed prop="tzcj" label="成绩" width="80" sortable>
      </el-table-column>
      <el-table-column label="校徽" width="80" align="center">
        <template slot-scope="scope">
          <img
            :src="scope.row.logo"
            alt="暂无"
            title="点击查看部分信息"
            @click="getInfo(scope.row.logo, scope.row.yxmc)"
          />
          <el-dialog
            :visible.sync="dialogFormVisible"
            :modal-append-to-body="false"
            width="40%"
            center
          >
            <div class="content">
              <div class="img_info">
                <img :src="logoUrl" alt="" />
              </div>
              <p>
                <span>学校名称:</span>
                <span> {{ schoolInfo.xxmc }}</span>
              </p>
              <p>
                <span>学校层次:</span>
                <span> {{ schoolInfo.xxcx }}</span>
              </p>
              <p>
                <span>学校类型:</span>
                <span> {{ schoolInfo.xxlx }}</span>
              </p>
              <p>
                <span>学校地区:</span>
                <span> {{ schoolInfo.xxdq }}</span>
              </p>
              <p>
                <span>招生办电话:</span>
                <span> {{ schoolInfo.zzbdh }}</span>
              </p>
              <p>
                <span>招生办官网:</span>
                <span>
                  <a :href="schoolInfo.zzbgw" target="_blank">
                    {{ schoolInfo.zzbgw }}
                  </a>
                </span>
              </p>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column prop="yxmc" label="院校名称" width="220">
      </el-table-column>
      <el-table-column prop="zszymc" label="专业名称" width="220">
      </el-table-column>
      <!-- 2020jh -->
      <el-table-column prop="pcmc" label="批次名称" width="300">
      </el-table-column>
      <el-table-column
        prop="kskmyq"
        label="专业限制"
        width="180"
        align="center"
      >
      </el-table-column>
      <!-- yxinfo -->
      <el-table-column
        prop="ljjl"
        label="离津距离(km)"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column label="详情" align="center" width="110">
        <template slot-scope="scope">
          <el-button
            type="warning"
            @click="details(scope.row.ksh)"
            size="small  "
            icon="el-icon-view"
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column label="收藏" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isChecked"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="show(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination" style="float: right">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes,prev, pager, next,jumper"
        :total="table.length"
        prev-text="上一页"
        next-text="下一页"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { addColl, delColl, infoSchool } from "network/distribute";
import { message } from "utils/data";
export default {
  name: "Table",
  computed: {
    table() {
      return this.$store.state.tableData;
    },
    currentPage() {
      return this.$store.state.currentPage;
    },
  },
  data() {
    return {
      // currentPage: 1, 默认显示页面为1
      pagesize: 5, //    每页的数据条数
      value: [], //存放select连级内容
      ischange: "", //placeholder内容
      dialogFormVisible: false,
      logoUrl: "",
      schoolInfo: {},
    };
  },

  mounted() {},
  methods: {
    //=====================处理表格================================
    //每页下拉显示数据
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    //点击第几页
    handleCurrentChange: function (currentPage) {
      this.$store.state.currentPage = currentPage;
    },
    //查询详细信息
    details(id) {
      this.$router.push({
        path: "/details",
        query: { id },
      });
    },

    getInfo(logo, yxmc) {
      this.dialogFormVisible = true;
      this.logoUrl = logo;
      infoSchool(yxmc).then((res) => {
        this.schoolInfo = res.data.data;
      });
    },
    //收藏开关添加ksh
    show(val) {
      let data = {
        id: localStorage.getItem("id"),
        ksh: val.ksh,
      };
      const loading = this.$loading({
        background: "rgba(0, 0, 0, 0.7)",
        text: "处理中",
        spinner: "el-icon-loading",
      });
      if (val.isChecked == true) {
        addColl(data).then((res) => {
          setTimeout(() => {
            loading.close();
            if (res.data.status == "1") {
              this.$store.dispatch("updataCount");
              message(res.data.msg, "success");
            } else {
              message(res.data.msg);
            }
          }, 500);
        });
      } else {
        delColl(data).then((res) => {
          setTimeout(() => {
            loading.close();
            this.$store.dispatch("updataCount");
            message(res.data.msg, "success");
          }, 500);
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  padding: 0 20px;
  .el-table {
    img {
      width: 50px;
      height: auto;
      cursor: pointer;
    }
    .el-dialog {
      .content {
        .img_info {
          text-align: center;
          margin-bottom: 20px;
          img {
            width: 70px;
            height: auto;
          }
        }
      }
      p {
        padding-left: 20px;
        span {
          display: inline-block;
          &:first-child {
            font-family: STXingkai;
            font-size: 25px;
            color: black;

            font-weight: 600;
          }
          &:last-child {
            margin-left: 30px;
            font-size: 18px;
            color: rgb(125, 125, 125);
            font-weight: 600;
            a {
              font-size: 18px;
              color: rgb(125, 125, 125);
              font-weight: 600;
            }
          }
        }
      }
    }
  }
}
</style>