<template>
  <div class="schoolInfo">
    <el-card>
      <div class="search">
        <el-input v-model="schoolName" placeholder="请输入院校名称"></el-input>
        <el-button
          icon="el-icon-search"
          type="primary"
          style="margin-left: 5px"
          @click="searchInfo"
        ></el-button>
        <div class="btn-group">
          <el-button-group>
            <el-button type="success" @click="getData('211')" size="small"
              >211</el-button
            >
            <el-button type="success" @click="getData('985')" size="small"
              >985</el-button
            >
          </el-button-group>
        </div>
      </div>
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        border
        style="width: 100%"
        height="400px"
      >
        <el-table-column prop="xxmc" label="学校名称" width="200">
        </el-table-column>
        <el-table-column
          prop="xxcx"
          label="学校层次"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="xxlx"
          label="学校类型"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="xxdq" label="学校地区" width="180">
        </el-table-column>
        <el-table-column prop="zzbdh" label="招生办电话" width="320">
        </el-table-column>
        <el-table-column prop="zzbgw" label="招生办官网">
          <template slot-scope="scope">
            <a :href="scope.row.zzbgw" target="_blank">{{ scope.row.zzbgw }}</a>
          </template>
        </el-table-column>
      </el-table>
      <div
        style="float: right; margin-bottom: 20px"
        v-if="tableData.length != 0"
      >
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[8, 15, 25, 40]"
          :page-size="pagesize"
          layout="total, sizes,prev, pager, next,jumper"
          :total="tableData.length"
          prev-text="上一页"
          next-text="下一页"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { school211, school985, schoolByName } from "network/distribute";
import { message } from "utils/data";
export default {
  data() {
    return {
      schoolName: "",
      tableData: [],
      currentPage: 1, //默认显示页面为1
      pagesize: 8, //    每页的数据条数
    };
  },
  methods: {
    async getData(val) {
      this.schoolName = "";
      this.currentPage = 1;
      if (val === "211") {
        let {
          data: { data },
        } = await school211();
        if (data.length > 0) {
          this.tableData = data;
        } else {
          message("无匹配数据");
        }
      } else {
        let {
          data: { data },
        } = await school985();
        if (data.length > 0) {
          this.tableData = data;
        } else {
          message("无匹配数据");
        }
      }
    },

    //每页下拉显示数据
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    //点击第几页
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    async searchInfo() {
      if (this.schoolName == "") {
        console.log("error");
        message("请输入学校名称");
      } else {
        let {
          data: { data },
        } = await schoolByName(this.schoolName);
        if (data.length > 0) {
          this.tableData = data;
        } else {
          message("无匹配数据");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.schoolInfo {
  .el-card {
    margin: 10px;
    .search {
      position: relative;
      margin-bottom: 10px;
      height: 80px;
      .el-input {
        width: 200px;
      }
      .btn-group {
        position: absolute;
        right: 0;
        bottom: 10px;
      }
    }
    .el-table {
      margin-bottom: 50px;
      a {
        text-decoration: none;
        color: #606266;
      }
    }
  }
}
</style>