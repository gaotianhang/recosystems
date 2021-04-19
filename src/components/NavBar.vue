<template>
  <div class="navbar">
    <div class="default">
      <slot>
        <span @click="$router.push('/index')">天津高考志愿推荐平台</span>
      </slot>
    </div>
    <div class="right">
      <slot name="right">
        <el-button
          type="text"
          icon="el-icon-refresh-right"
          @click="$router.back(-1)"
          >返回</el-button
        >
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.navbar {
  background-color: rgb(226, 226, 226);
  height: 40px;
  line-height: 45px;
  display: flex;
  font-size: 25px;
  border-radius: 0;
  margin-bottom: 0;
  color: black;
  font-weight: 600;
  text-shadow: -3px 1px 5px #868585;
  font-family: STXingkai;
  .default {
    padding-left: 15px;
    flex: 1;
    span {
      cursor: pointer;
    }
  }
  .right {
    text-align: right;
    width: 230px;
    .el-button {
      font-size: 20px;
      margin: 0 20px;
    }
  }
}
</style>