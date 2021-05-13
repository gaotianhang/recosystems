<template>
  <div class="login">
    <div class="content">
      <div class="header">
        <span>高考数据查询系统</span>
      </div>
      <el-card>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="phone">
            <el-input
              type="text"
              placeholder="请输入手机号"
              v-model="ruleForm.phone"
              autocomplete="off"
              prefix-icon="el-icon-user-solid"
            />
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="ruleForm.pass"
              autocomplete="off"
              prefix-icon="el-icon-lock"
            />
          </el-form-item>
          <el-form-item prop="code">
            <div class="code_main">
              <div>
                <el-input
                  v-model="ruleForm.code"
                  placeholder="验证码"
                  prefix-icon="el-icon-key"
                  maxlength="4"
                  @keyup.enter.native="submitForm('ruleForm')"
                ></el-input>
              </div>
              <div
                class="code_style"
                @click="refreshCode"
                title="看不清？点击切换"
              >
                <Code :identifyCode="identifyCode"></Code>
              </div>
            </div>
          </el-form-item>
          <div class="btn_main">
            <el-button type="success" @click="submitForm('ruleForm')"
              >登录</el-button
            >
            <el-button type="info" @click="$router.push('/register')">
              没有账号？前往注册
            </el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { userLogin } from "network/distribute";
import Code from "components/Code";
import { message, strChange, checkPass } from "utils/data";
export default {
  name: "Login",
  components: { Code },
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
    //手机号校验
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
    //验证码校验
    var validateCode = (rule, value, callback) => {
      if (strChange(value) !== strChange(this.identifyCode)) {
        return callback(new Error("请输入正确的验证码！"));
      } else {
        callback();
      }
    };
    return {
      identifyCodes: "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789",
      identifyCode: "",
      ruleForm: {
        phone: "",
        pass: "",
        code: "",
      },
      rules: {
        pass: [{ validator: checkPassword, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { required: true, validator: validateCode, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    //生成随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    //验证码刷新
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    //登录提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            phone: this.ruleForm.phone,
            password: this.ruleForm.pass,
          };
          userLogin(data).then((res) => {
            if (res.data.state == false) {
              message(res.data.msg, "error");
              this.refreshCode();
            } else {
              message(res.data.msg, "success");
              this.$store.commit("changeisLogin", true);
              this.$store.commit("changePhone", this.ruleForm.phone);
              localStorage.setItem("phone", this.ruleForm.phone);
              localStorage.setItem("id", res.data.data.id);
              setTimeout(() => {
                if (res.data.data.type == "1") {
                  this.$router.push("/admin");
                } else {
                  this.$router.push("/index");
                }
              }, 1000);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
  created() {
    this.refreshCode();
  },
};
</script>

<style lang="less" >
.login {
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
      .code_main {
        display: flex;
        div {
          &:first-child {
            margin-right: 15px;
          }
        }
      }
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