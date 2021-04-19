<template>
  <div class="advice">
    <el-card>
      <div v-html="$store.state.adviceInfo" class="adv_main"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Advice",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.advice {
  .el-card {
    margin: 10px;
  }
}
</style>