<template>
  <div class="collection">
    <nav-bar></nav-bar>
    <div style="margin-top: 20px; padding: 0 20px">
      <el-table
        :data="
          table.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        style="width: 100%"
        height="530"
        :default-sort="{ prop: 'tdcj', order: 'descending' }"
        border
        stripe
      >
        <!-- 2020qjlq1 -->
        <el-table-column fixed prop="tzcj" label="成绩" width="80" sortable>
        </el-table-column>
        <el-table-column label="校徽" width="80" align="center">
          <template slot-scope="scope">
            <img
              :src="scope.row.logo"
              alt=""
              style="width: 50px; height: auto"
            />
          </template>
        </el-table-column>
        <el-table-column prop="yxmc" label="院校名称" width="220">
        </el-table-column>
        <el-table-column prop="zszymc" label="专业名称" width="220">
        </el-table-column>
        <!-- 2020jh -->
        <el-table-column prop="pcmc" label="批次名称" width="220">
        </el-table-column>
        <el-table-column
          prop="jhxzmc"
          label="是否定向"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="kskmyq"
          label="专业限制"
          width="200"
          align="center"
        >
        </el-table-column>
        <!-- yxinfo -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                type="warning"
                @click="details(scope.row.ksh)"
                size="small"
                >详情</el-button
              >
              <el-button
                @click="deleteRow(scope.row.ksh)"
                type="danger"
                size="small"
              >
                移除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination" style="float: right" v-if="table.length > 0">
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
  </div>
</template>
<script>
import NavBar from "components/NavBar";
import { collList, delColl } from "network/distribute";
import { message } from "utils/data";
export default {
  name: "Collection",
  components: { NavBar },
  data() {
    return {
      table: [],
      currentPage: 1, //默认显示页面为1
      pagesize: 5, //    每页的数据条数
      id: "",
    };
  },
  methods: {
    //每页下拉显示数据
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    //点击第几页
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    //移除数据
    deleteRow(val) {
      let data = {
        id: this.id,
        ksh: val,
      };
      const loading = this.$loading({
        background: "rgba(0, 0, 0, 0.7)",
        text: "加载中",
        spinner: "el-icon-loading",
      });
      delColl(data).then((res) => {
        setTimeout(() => {
          loading.close();
          this.$store.dispatch("updataCount");
          this.init(this.id);
          message("删除成功", "success");
        }, 500);
      });
    },
    //跳转详情页
    details(id) {
      this.$router.push({
        path: "/Details",
        query: { id },
      });
    },
    init(id) {
      collList(id).then((res) => {
        this.table = res.data.data;
      });
    },
  },
  created() {
    this.id = localStorage.getItem("id");
    this.init(this.id);
  },
};
</script>
<style scoped lang="less">
</style>
