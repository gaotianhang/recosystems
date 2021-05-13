<template>
  <div class="details">
    <nav-bar> </nav-bar>
    <div class="container">
      <h1 class="page-header">详细信息</h1>
      <ul class="list-group">
        <li class="list-group-item">
          <span>成绩</span><span>{{ info.tzcj }}</span>
        </li>
        <li class="list-group-item">
          <span>院校名称</span><span>{{ info.yxmc }}</span>
        </li>
        <li class="list-group-item">
          <span>批次名称</span><span>{{ info.pcmc }}</span>
        </li>
        <li class="list-group-item">
          <span>专业名称</span><span>{{ info.zszymc }}</span>
        </li>
        <li class="list-group-item">
          <span>是否定向</span><span>{{ info.jhxzmc }}</span>
        </li>
        <li class="list-group-item">
          <span>专业限制</span><span>{{ info.kskmyq }}</span>
        </li>
        <li class="list-group-item">
          <span>学制名称</span><span>{{ info.xzmc }}</span>
        </li>
        <li class="list-group-item">
          <span>学费(元)</span><span>{{ info.sfbz }}</span>
        </li>
        <li class="list-group-item">
          <span>学历层次</span><span>{{ info.xlcc }}</span>
        </li>
        <li class="list-group-item">
          <span>是否985</span><span>{{ info.is985 }}</span>
        </li>
        <li class="list-group-item">
          <span>是否211</span><span>{{ info.is211 }}</span>
        </li>
        <li class="list-group-item">
          <span>双一流</span><span>{{ info.syl }}</span>
        </li>
        <li class="list-group-item">
          <span>民办/公办</span><span>{{ info.bxx }}</span>
        </li>
        <li class="list-group-item">
          <span>院校类型</span><span>{{ info.yxlx }}</span>
        </li>
        <li class="list-group-item">
          <span>离津距离(km)</span><span>{{ info.ljjl }}</span>
        </li>
        <li class="list-group-item" v-if="info.xxdz != ''">
          <span>学校地址</span><span>{{ info.xxdz }}</span>
        </li>
        <li class="list-group-item" v-if="info.yx != ''">
          <span>邮箱</span><span>{{ info.yx }}</span>
        </li>
        <li class="list-group-item">
          <span>官网</span>
          <a :href="info.xxzy" target="_blank">{{ info.xxzy }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import NavBar from "components/NavBar";
import { infoDetails } from "network/distribute";
export default {
  name: "Details",
  components: { NavBar },
  data() {
    return {
      info: {},
    };
  },
  methods: {
    findStudent(id) {
      infoDetails(id).then((res) => {
        this.info = res.data.data;
      });
    },
  },
  created() {
    this.findStudent(this.$route.query.id);
  },
};
</script>
<style scoped lang='less'>
.details {
  background: url("~assets/images/login/bg.jpg") no-repeat;
  background-size: cover;
  width: 100%;
  .container {
    img {
      width: 60px;
      height: auto;
    }
    .page-header {
      font-weight: 600;
      color: skyblue;
    }
  }
}
a {
  text-decoration: none;
  font-size: 15px;
  font-weight: 650;
  color: rgb(105, 105, 105);
}
ul {
  span {
    &:first-child {
      display: inline-block;
      width: 200px;
      font-size: 20px;
      font-weight: 700;
    }
    &:last-child {
      font-size: 15px;
      font-weight: 650;
      color: rgb(105, 105, 105);
    }
  }
}
</style>