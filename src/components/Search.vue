<template>
  <div class="search">
    <el-form
      :inline="true"
      :model="formInline"
      :rules="rules"
      ref="formInline"
      label-width="80px"
    >
      <el-form-item label="选择科目">
        <el-checkbox-group
          v-model="$store.state.checkboxGroup"
          :max="3"
          fill="orange"
          text-color="black"
        >
          <el-checkbox-button
            @change="changeChecked(city)"
            v-for="city in cities"
            :label="city.name"
            :key="city.name"
            >{{ city.name }}</el-checkbox-button
          >
        </el-checkbox-group>
      </el-form-item>
      <br />
      <el-form-item label="排名" prop="fsd">
        <el-input
          style="width: 120px"
          v-model="formInline.fsd"
          placeholder="请输入排名"
          maxlength="5"
        ></el-input>
      </el-form-item>
      <el-form-item label="学校名称">
        <el-input
          style="width: 180px"
          v-model="formInline.yxmc"
          placeholder="请输入学校名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="专业名称">
        <el-input
          style="width: 180px"
          v-model="formInline.zymc"
          placeholder="请输入专业名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="离津距离" prop="ljjl">
        <el-input
          style="width: 140px"
          v-model="formInline.ljjl"
          placeholder="请输入离津距离"
        ></el-input>
      </el-form-item>
      <br />
      <el-form-item label="院校类型">
        <el-checkbox-group
          v-model="$store.state.checkboxXxlx"
          fill="orange"
          text-color="black"
        >
          <el-checkbox-button v-for="arr in newList" :label="arr" :key="arr">{{
            arr
          }}</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div class="btn-group">
      <div>
        <el-button
          type="primary"
          @click="submitForm('formInline')"
          icon="el-icon-search"
          :disabled="disBtn"
          >查询</el-button
        >
      </div>
      <div>
        <el-button
          type="info"
          @click="$router.push('/about')"
          icon="el-icon-s-promotion"
          >填报指南</el-button
        >
      </div>
      <download-excel
        :data="$store.state.tableData"
        :before-generate="startDownload"
        :before-finish="finishDownload"
        :fields="json_fields"
        title="高考志愿推荐详细数据"
        name="高考数据"
      >
        <el-button type="danger" icon="el-icon-download">导出EXCEL</el-button>
      </download-excel>
      <el-badge :value="$store.state.count" :max="20">
        <el-button
          type="success"
          @click="$router.push('/collection')"
          icon="el-icon-s-help"
          >前往收藏页</el-button
        >
      </el-badge>
    </div>
  </div>
</template>

<script>
import { message, checkNum, arrList } from "utils/data";
import { searchGroup } from "network/distribute";
export default {
  name: "Search",
  computed: {
    formInline() {
      return this.$store.state.searchData;
    },
    cities() {
      return this.$store.state.projects;
    },
  },
  data() {
    var validateNum = (rule, value, callback) => {
      if (value != "" && checkNum(value)) {
        callback(new Error("请输入数字"));
      } else {
        callback();
      }
    };
    var validateDis = (rule, value, callback) => {
      if (value < 241 || value > 55045) {
        callback(new Error("范围在:241~55045"));
      } else {
        callback();
      }
    };
    return {
      json_fields: {
        成绩: "tzcj",
        院校名称: "yxmc",
        批次名称: "pcmc",
        专业名称: "zszymc",
        是否定向: "jhxzmc",
        专业限制: "kskmyq",
        学制名称: "xzmc",
        "学费(元)": "sfbz",
        学历层次: "xlcc",
        是否985: "is985",
        是否211: "is211",
        双一流: "syl",
        "民办/公办": "bxx",
        院校类型: "yxlx",
        "离津距离(km)": "ljjl",
        学校地址: "xxdz",
        邮箱: "yx",
        官网: "xxzy",
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      disBtn: false,
      newList: arrList,
      rules: {
        fsd: [
          { required: true, message: "请填写排名", trigger: "blur" },
          { validator: validateNum, trigger: "blur" },
          { validator: validateDis, trigger: "blur" },
        ],
        ljjl: [{ validator: validateNum, trigger: "blur" }],
      },
    };
  },
  methods: {
    startDownload() {
      if (this.$store.state.tableData.length < 1) {
        message("暂无数据");
      }
    },
    finishDownload() {
      setTimeout(() => {
        message("恭喜，数据导出成功", "success");
      }, 1000);
    },
    //=====================提交查询==========================
    submitForm(formName) {
      if (this.$store.state.checkboxGroup.length < 3) {
        message("请选择三个科目");
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              background: "rgba(0, 0, 0, 0.7)",
              text: "院校推荐中，请稍等",
              customClass: "isLoading",
              spinner: "el-icon-loading",
            });
            let str = "";
            for (let i of this.cities) {
              str += i.code;
            }
            let xxlxGroup = this.$store.state.checkboxXxlx.toString();
            let data = {
              fsd: this.formInline.fsd,
              yxmc: this.formInline.yxmc,
              zymc: this.formInline.zymc,
              kc: str,
              ljjl: this.formInline.ljjl,
              yxlx: xxlxGroup,
            };
            searchGroup(data).then((res) => {
              loading.close();
              console.log(res);
              if (res.data.status == "1") {
                message("查询成功", "success");
                this.$store.commit("changeActive", "1");
                this.$store.commit("addTotalData", res.data.data);
                this.$store.commit("addSearch", res.data.data.top);
              } else {
                message("没有合适数据");
              }
            });
            this.$store.commit("selectData", data);
          } else {
            return false;
          }
        });
      }
    },
    changeChecked(city) {
      if (city.code == "0") {
        city.code = "1";
      } else {
        city.code = "0";
      }
      this.$store.commit("changeProjects", this.cities);
    },
  },
};
</script>

<style lang="less" >
.search {
  padding-left: 30px;
  padding-top: 20px;
  background-color: whitesmoke;
  .btn-group {
    position: absolute;
    top: 70px;
    left: 900px;
    display: flex;
    .el-badge {
    }

    .print_excel {
    }
  }
}
.isLoading {
  .el-loading-spinner {
    top: 45%;
    left: 50%;
    margin-left: -55px;
    background: rgba(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 4px;
    width: auto;
    position: absolute;

    i {
      color: #eee;
      font-size: 30px;
    }

    .el-loading-text {
      color: #eee;
    }
  }
}
</style>