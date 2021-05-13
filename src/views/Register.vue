<template>
  <div class="register">
    <div class="content">
      <div class="header">
        <span>高考数据查询系统</span>
      </div>
      <el-card>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="name">
            <el-input
              type="text"
              placeholder="请输入用户名"
              v-model="ruleForm.name"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item prop="phone">
            <el-input
              type="text"
              v-model="ruleForm.phone"
              maxlength="11"
              placeholder="请输入手机号"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              placeholder="请输入密码"
              autocomplete="off"
            />
          </el-form-item>
          <div class="btn_main">
            <el-button
              type="success"
              class="btn"
              @click="submitForm('ruleForm')"
            >
              注册
            </el-button>
            <el-button
              type="warning"
              class="btn"
              @click="$router.push('/login')"
            >
              已有账号？前往登录
            </el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { userRegister } from "network/distribute";
import { message, checkPass } from "utils/data";
export default {
  name: "Register",
  data() {
    //密码校验
    var checkPassword = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("请输入密码"));
      } else if (!checkPass(value)) {
        return callback(
          new Error("密码格式为字母开头，只能包含字母、数字和下划线，6-18位")
        );
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      let reg = /^1[3456789]\d{9}$/;
      if (value == "") {
        return callback(new Error("请输入手机号"));
      } else if (!reg.test(value)) {
        return callback(new Error("手机格式错误"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        pass: "",
        phone: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        pass: [{ validator: checkPassword, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
      },
    };
  },
  methods: {
    //注册用户
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            username: this.ruleForm.name,
            password: this.ruleForm.pass,
            phone: this.ruleForm.phone,
          };
          userRegister(data).then((res) => {
            if (res.data.state == false) {
              message(res.data.msg, "error");
            } else {
              message(res.data.msg, "success");
              setTimeout(() => {
                this.$router.push("/login");
              }, 1000);
            }
            console.log(res);
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" >
.register {
  background: url("~assets/images/login/bg.jpg") no-repeat;
  background-size: cover;
  height: 100%;
  .content {
    width: 400px;
    margin: 0 auto;
    padding-top: 100px;
    .header {
      text-align: center;
      padding-bottom: 30px;
      span {
        color: rgb(102, 100, 100);
        font-weight: 600;
        font-size: 40px;
        text-shadow: -3px 1px 5px #868585;
        font-family: STXingkai;
      }
    }
    .el-card {
      .btn_main {
        text-align: center;
        button {
          margin-bottom: 10px;
          width: 48%;
        }
      }
    }
  }
}
</style>