import Vue from 'vue';
import Vuex from 'vuex';
import { collList } from "network/distribute";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    checkboxGroup: [],
    checkboxXxlx: [],
    adviceInfo: ' <h1>高考志愿填报指导</h1>',
    activeName: '1',
    count: 0,
    collec: [],
    tableData: [],
    totalData: {
      top: [],
      middle: [],
      bottom: []
    },
    searchData: {
      fsd: "",
      yxmc: "",
      zymc: "",
      ljjl: "",
      yxlx: ""
    },
    isLogin: localStorage.getItem('phone') ? true : false,
    phone: localStorage.getItem('phone'),
    projects:
      [
        { code: "0", name: "物理" },
        { code: "0", name: "化学" },
        { code: "0", name: "生物" },
        { code: "0", name: "政治" },
        { code: "0", name: "地理" },
        { code: "0", name: "历史" },
      ]
  },
  mutations: {
    addColl(state, arr) {
      state.collec = arr
    },
    changeisLogin(state, msg) {
      state.isLogin = msg
    },
    addSearch(state, msg) {
      state.tableData = msg
    },
    selectData(state, msg) {
      state.searchData = msg;
    },
    addTotalData(state, msg) {
      state.totalData = msg;
    },
    changeCount(state, msg) {
      state.count = msg
    },
    changeActive(state, msg) {
      state.activeName = msg
    },
    changeAdvices(state, msg) {
      state.adviceInfo = msg
    },
    changePhone(state, msg) {
      state.phone = msg;
    },
    changeProjects(state, msg) {
      state.projects = msg;
    }
  },
  actions: {
    updataCount({ commit }) {
      collList(localStorage.getItem("id")).then((res) => {
        commit("changeCount", res.data.data.length)
      });
    }
  },
  modules: {
  },
});
