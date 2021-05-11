<template>
  <div class="echarsrank">
    <div class="search" style="height: 80px">
      <el-input v-model="schoolName" placeholder="请输入院校名称"></el-input>
      <el-button
        icon="el-icon-search"
        type="primary"
        style="margin-left: 5px"
        @click="getData"
      ></el-button>
    </div>
    <div class="main" ref="echars_rank"></div>
  </div>
</template>

<script>
import { getRankData } from "network/distribute";
import { message } from "utils/data";
export default {
  name: "ManagerEcharsRank",
  data() {
    return {
      schoolName: "",
      allData: [],
      chartInstance: null,
      startVal: 0,
      endVal: 6,
      timerId: null,
    };
  },
  methods: {
    initCharts() {
      this.chartInstance = this.$echarts.init(this.$refs.echars_rank, "chalk");
      const initOption = {
        title: {
          text: "▎去年各专业录取人数",
          left: 20,
          top: 20,
          textStyle: {
            fontSize: 20,
          },
        },
        grid: {
          top: "40%",
          left: "5%",
          bottom: "5%",
          right: "5%",
          containLabel: true,
        },
        tooltip: {
          show: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
            barWidth: 80,
            itemStyle: {
              barBorderRadius: [20, 20, 0, 0],
            },
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: "#666",
                },
              },
            },
          },
        ],
      };
      this.chartInstance.setOption(initOption);
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timerId);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },
    async getData() {
      if (this.schoolName === "") {
        message("请输入院校名称");
        return;
      }
      const {
        data: { data },
      } = await getRankData(this.schoolName);
      if (data.length > 0) {
        this.allData = data;
      } else {
        message("请输入正确的院校名称");
      }
      this.updateEchars();
      this.startInterval();
    },
    updateEchars() {
      const colorArr = [
        ["#0BA82C", "#4FF778"],
        ["#2E72BF", "#23E5E5"],
        ["#5052EE", "#AB6EE5"],
      ];

      const provinceArr = this.allData.map((item) => {
        return item.name;
      });
      const valueArr = this.allData.map((item) => {
        return item.value;
      });

      const dataOption = {
        xAxis: {
          data: provinceArr,
        },
        dataZoom: {
          show: false,
          startValue: this.startVal,
          endValue: this.endVal,
        },

        series: [
          {
            data: valueArr,
            itemStyle: {
              color: (arg) => {
                let targetColorArr = colorArr[0];
                if (arg.vaule >= 30) {
                  targetColorArr = colorArr[0];
                } else if (arg.value >= 50) {
                  targetColorArr = colorArr[1];
                } else {
                  targetColorArr = colorArr[2];
                }
                return new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: targetColorArr[0],
                  },
                  {
                    offset: 1,
                    color: targetColorArr[1],
                  },
                ]);
              },
            },
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(() => {
        this.startVal++;
        this.endVal++;
        if (this.endVal > this.allData.length - 1) {
          this.startVal = 0;
          this.endVal = 6;
        }
        this.updateEchars();
      }, 2000);
    },
  },
  created() {
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  destroyed() {
    clearInterval(this.timerId);
  },
};
</script>

<style lang="less" scoped>
.echarsrank {
  height: 100%;
  .search {
    padding: 20px 0 0 40px;
    .el-input {
      width: 200px;
    }
  }
  .main {
    height: 550px;
    width: 1200px;
    margin: 0 auto;
  }
}
</style>