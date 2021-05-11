<template>
  <div class="about">
    <nav-bar>
      <template>
        <span>高考志愿填报指南</span>
      </template>
    </nav-bar>
    <div class="content">
      <div class="con_left">
        <el-menu
          :unique-opened="true"
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="getInfo"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">重要概念</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">什么叫录取批次？</el-menu-item>
              <el-menu-item index="1-2">识别各类分数线</el-menu-item>
              <el-menu-item index="1-3">院校级差的含义</el-menu-item>
              <el-menu-item index="1-4">招生章程的含义</el-menu-item>
              <el-menu-item index="1-5">什么是强基计划</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>政策解读</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">什么时候开始志愿填报？</el-menu-item>
              <el-menu-item index="2-2">什么是平行志愿</el-menu-item>
              <el-menu-item index="2-3">体检政策</el-menu-item>
              <el-menu-item index="2-4">加分政策</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>考生情况</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">正确评估自己的考分</el-menu-item>
              <el-menu-item index="3-2">分析自己能上哪个批次</el-menu-item>
              <el-menu-item index="3-3">分析自己的兴趣和特长</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-promotion"></i>
              <span>志愿选择</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">先选择专业还是先选学校?</el-menu-item>
              <el-menu-item index="4-2">选择大学需要考虑的因素</el-menu-item>
              <el-menu-item index="4-3">选择适合自己的大学</el-menu-item>
              <el-menu-item index="4-4">快速识别高校</el-menu-item>
              <el-menu-item index="4-5">选专业需要考虑的因素</el-menu-item>
              <el-menu-item index="4-6">选择自己适合的专业</el-menu-item>
              <el-menu-item index="4-7">结合考生实际情况报志愿</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-promotion"></i>
              <span>院校信息查询</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">详细信息查询</el-menu-item>
              <el-menu-item index="5-2">去年录取人数查询</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="con_right">
        <Advice v-if="state1"></Advice>
        <SchoolInfo v-if="state2" />
        <ManagerEcharsRank v-if="state3" />
      </div>
    </div>
  </div>
</template>
<script>
import { infoAdvice } from "network/distribute";
import NavBar from "components/NavBar";
import Advice from "components/Advice";
import ManagerEcharsRank from "components/ManagerEcharsRank";
import SchoolInfo from "components/SchoolInfo";
export default {
  name: "About",
  components: { NavBar, Advice, SchoolInfo, ManagerEcharsRank },
  data() {
    return {
      state1: true,
      state2: false,
      state3: false,
    };
  },
  methods: {
    getInfo(val) {
      console.log(val);
      if (val == "5-1") {
        this.state1 = false;
        this.state2 = true;
        this.state3 = false;
      } else if (val == "5-2") {
        this.state1 = false;
        this.state2 = false;
        this.state3 = true;
      } else {
        this.state1 = true;
        this.state2 = false;
        this.state3 = false;
        infoAdvice(val).then((res) => {
          this.$store.commit("changeAdvices", res.data.data);
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.about {
  .content {
    display: flex;
    .con_left {
      width: 20%;
      .el-menu {
        height: 93vh;
      }
    }
    .con_right {
      flex: 1;
    }
  }
}
</style>