<template>
  <el-container>
    <el-header class="c-header">
      <div class="h-left">
        <div class="h-logo">
          <img src="../assets/logo.png" alt="" height="30" width="30" />
          <span>
            EPOCH 弈 博 制 造
          </span>
        </div>
        <div class="h-title">
          <i class="el-icon-message"></i>
          <span>
            136.....@qq.com |
          </span>
          <i class="el-icon-service"></i>
          <span>
            028-66666666
          </span>
        </div>
      </div>
      <div class="h-login">
        <el-button type="" @click="login()">会员登录</el-button>
        <el-button type="success" @click="register()">成为会员</el-button>
      </div>
      <el-drawer
        :visible.sync="drawerOpenStatus"
        @close="drawerClose()"
        :direction="darderOpen"
        :size="darwerW"
      >
        <!-- 登录 -->
        <div class="darwer-content-box" v-if="drawerLogin">
          <p class="code-login">
            <el-link type="primary" @click="loginType = !loginType">{{
              loginType ? "账号登录" : "手机登录"
            }}</el-link>
          </p>
          <h4>登录</h4>
          <!-- 账号密码登录 -->
          <div v-if="!loginType">
            <el-input
              placeholder="账号："
              prefix-icon="el-icon-user-solid"
              v-model="loginData.loginName"
            >
            </el-input>
            <el-input
              placeholder="密码："
              :type="pwdType.pwdTypeLogin"
              prefix-icon="el-icon-s-goods"
              v-model="loginData.password"
            >
              <i
                slot="suffix"
                class="el-input__icon el-icon-view"
                @click="showPwd('L')"
              ></i>
            </el-input>
            <div class="pwd-forget">
              <el-checkbox v-model="loginData.savePwd">记住密码</el-checkbox>
              <el-link type="primary"
                ><i class="el-icon-question"></i>忘记密码</el-link
              >
            </div>
            <el-button type="primary" @click="vipLogin()">登录</el-button>
          </div>
          <!-- 短信登录 -->
          <div v-else>
            <el-input
              placeholder="手机号："
              prefix-icon="el-icon-phone"
              v-model="codeLoginData.phoneNum"
            >
            </el-input>
            <el-input
              placeholder="验证码："
              prefix-icon="el-icon-s-comment"
              v-model="codeLoginData.code"
            >
              <el-link
                slot="append"
                type="primary"
                :underline="false"
                :disabled="sendCodeData.disabled"
                class="send-code-btn"
                @click="sendCodeLogin()"
                >{{ sendCodeData.sendTitle }}</el-link
              >
            </el-input>
            <el-button type="primary" @click="codeVipLogin()">登录</el-button>
          </div>

          <p>EPOCH欢迎您</p>
        </div>
        <!-- 注册 -->
        <div class="darwer-content-box" v-if="drawerRegister">
          <h4>注册</h4>

          <el-input
            placeholder="账号："
            prefix-icon="el-icon-user-solid"
            v-model="registerData.loginName"
          >
          </el-input>

          <el-input
            placeholder="密码："
            :type="pwdType.pwdTypeRegister"
            prefix-icon="el-icon-s-goods"
            v-model="registerData.password"
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-view"
              @click="showPwd('R')"
            ></i>
          </el-input>

          <el-input
            placeholder="确认密码："
            :type="pwdType.pwdTypeSureRegister"
            prefix-icon="el-icon-s-goods"
            v-model="registerData.surepassword"
          >
            <i
              slot="suffix"
              class="el-input__icon el-icon-view"
              @click="showPwd('SR')"
            ></i>
          </el-input>

          <el-input
            placeholder="手机号："
            prefix-icon="el-icon-phone"
            v-model="registerData.phoneNum"
          >
          </el-input>

          <el-input
            placeholder="验证码："
            prefix-icon="el-icon-s-comment"
            v-model="registerData.code"
          >
            <el-link
              slot="append"
              type="primary"
              :underline="false"
              :disabled="sendCodeData.disabled"
              class="send-code-btn"
              @click="sendcode()"
              >{{ sendCodeData.sendTitle }}</el-link
            >
          </el-input>

          <el-button type="primary" @click="vipRegister()">注册</el-button>
          <p>EPOCH欢迎您</p>
        </div>
      </el-drawer>
    </el-header>
    <el-main>
      <div class="m-rotation">
        <el-carousel :interval="4000" height="750px">
          <el-carousel-item v-for="item in imageList" :key="item.homepageId">
            <el-image
              style="width:80%;height:100%"
              :src="item.homepagePath"
              fit="cover"
            ></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="bei-an-info">
        <p>
          © Copyright 2017-2018 Chengdu New Epoch High Tech Development Co.,Ltd.All Rights Reserver.蜀ICP备06006284号-3
        </p>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      slider: [{}],
      drawerLogin: false, //登录
      drawerRegister: false, //注册
      drawerOpenStatus: false,
      darderOpen: "rtl",
      darwerW: "30%",
      pwdType: {
        pwdTypeLogin: "password",
        pwdTypeRegister: "password",
        pwdTypeSureRegister: "password",
      },
      screenWidth: document.body.clientWidth,
      loginType: false,
      loginData: {
        loginName: "",
        password: "",
        savePwd: false,
      },
      codeLoginData: {
        phoneNum: "",
        code: "",
      },
      registerData: {
        loginName: "",
        password: "",
        surepassword: "",
        phoneNum: "",
        code: "",
      },
      sendCodeData: {
        sendCodeTime: 60,
        sendTitle: "发送验证码",
        disabled: false,
      },
      imageList: [], //轮播图
    };
  },
  created() {
    this.queryAllImage();
    this.getVipLoginLocalStorage();
  },
  mounted() {
    this.addlistener();
    this.getScreenWidth();
    // setTimeout(() => {
    //   this.$refs.appCon.style.display = "block"
    // }, 200);
  },
  watch: {
    screenWidth: function() {
      this.getScreenWidth();
    },
    drawerLogin: function(value) {
      value ? (this.drawerOpenStatus = true) : (this.drawerOpenStatus = false);
    },
    drawerRegister: function(value) {
      value ? (this.drawerOpenStatus = true) : (this.drawerOpenStatus = false);
    },
    // 记住账号功能
    "loginData.savePwd": function(value) {
      if (value) {
        localStorage.setItem("vipLoginAccount", JSON.stringify(this.loginData));
      } else {
        localStorage.removeItem("vipLoginAccount");
      }
    },
  },
  methods: {
    // 获取是否保存了账号密码
    getVipLoginLocalStorage() {
      let obj = localStorage.getItem("vipLoginAccount");
      if (obj) {
        this.loginData = JSON.parse(obj);
      }
    },
    /*
     **  @description 监听媒体查询
     **  @param {}
     **  @return
     **  @author shipingan
     */
    addlistener() {
      window.onresize = () => {
        return (() => {
          this.screenWidth = document.body.clientWidth;
        })();
      };
    },
    getScreenWidth() {
      if (this.screenWidth <= 1400 && this.screenWidth >= 460) {
        this.darwerW = "420px";
        this.darderOpen = "rtl";
      } else if (this.screenWidth < 460) {
        this.darwerW = "80%";
        this.darderOpen = "btt";
      } else {
        this.darderOpen = "rtl";
        this.darwerW = "30%";
      }
    },
    /*
     **  @description 登录，注册，遗忘，修改
     **  @param {}
     **  @return
     **  @author shipingan
     */
    drawerClose() {
      //关闭回调
      this.drawerLogin = this.drawerRegister = false;
    },
    login() {
      this.drawerLogin = true;
    },
    vipLogin() {
      let params = {
        ...this.loginData,
      };
      this.ajaxPost("/dapi/nser/loginByPwd", params).then((res) => {
        console.log(res);
        if (res.status == 200) {
          // window.location.href = `views/vipHome.html?account=${this.loginData.loginName}&id=${res.data}`
          this.$router.push({
            path: "vipHome",
            query: {
              account: this.loginData.loginName,
              id: res.data,
            },
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    sendCodeLogin() {
      if (this.codeLoginData.phoneNum == "") {
        this.$message.error("请填手机号");
        return;
      }
      let params = {
        phoneNum: this.codeLoginData.phoneNum,
      };
      this.ajaxPost("/dapi/nser/loginSendSms", params).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: "发送短信成功",
          });
          this.sendCodeData.disabled = true;
          this.sendCodeData.sendTitle = this.sendCodeData.sendCodeTime;
          let timer = setInterval(() => {
            if (this.sendCodeData.sendCodeTime != 0) {
              this.sendCodeData.sendCodeTime--;
              this.sendCodeData.sendTitle = this.sendCodeData.sendCodeTime;
            } else {
              clearInterval(timer);
              this.sendCodeData.sendTitle = "重新发送";
              this.sendCodeData.disabled = false;
              this.sendCodeData.sendCodeTime = 60;
            }
          }, 1000);
        }
      });
    },
    codeVipLogin() {
      if (this.codeLoginData.phoneNum == "" || this.codeLoginData.code == "") {
        this.$message.error("请填写数据");
        return;
      }
      let params = {
        ...this.codeLoginData,
      };
      this.ajaxPost("/dapi/nser/LoginByPhone", params).then((res) => {
        if (res.status == 200) {
          window.location.href = `views/vipHome.html?account=${this.codeLoginData.phoneNum}&id=${res.message}`;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    register() {
      this.drawerRegister = true;
    },
    vipRegister() {
      for (const key in this.registerData) {
        if (this.registerData[key] == "") {
          this.$message.error("请填写完整信息");
          return;
        }
      }
      if (this.registerData.password != this.registerData.surepassword) {
        this.$message.error("两次密码不一致");
        return;
      }
      let params = {
        ...this.registerData,
      };

      this.ajaxPost("/dapi/nser/register", params).then((res) => {
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: "注册成功",
          });
          //复制给登录
          this.loginData.loginName = this.registerData.loginName;
          this.loginData.password = this.registerData.password;
          this.drawerRegister = false;
          setTimeout(() => {
            this.drawerLogin = true;
          }, 200);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 发送验证码
    sendcode() {
      if (this.registerData.loginName == "") {
        this.$message.error("请填写账号");
        return;
      }
      if (this.registerData.phoneNum == "") {
        this.$message.error("请填手机号");
        return;
      }
      let params = {
        loginName: this.registerData.loginName,
        phoneNum: this.registerData.phoneNum,
      };
      this.ajaxPost("/dapi/nser/checkData", params).then((res) => {
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: "发送短信成功",
          });
          this.sendCodeData.disabled = true;
          this.sendCodeData.sendTitle = this.sendCodeData.sendCodeTime;
          let timer = setInterval(() => {
            if (this.sendCodeData.sendCodeTime != 0) {
              this.sendCodeData.sendCodeTime--;
              this.sendCodeData.sendTitle = this.sendCodeData.sendCodeTime;
            } else {
              clearInterval(timer);
              this.sendCodeData.sendTitle = "重新发送";
              this.sendCodeData.disabled = false;
              this.sendCodeData.sendCodeTime = 60;
            }
          }, 1000);
        }
      });
    },
    //显示密码事件
    showPwd(value) {
      switch (value) {
        case "L":
          this.pwdType.pwdTypeLogin == "text"
            ? (this.pwdType.pwdTypeLogin = "password")
            : (this.pwdType.pwdTypeLogin = "text");
          break;
        case "R":
          this.pwdType.pwdTypeRegister == "text"
            ? (this.pwdType.pwdTypeRegister = "password")
            : (this.pwdType.pwdTypeRegister = "text");
          break;
        default:
          this.pwdType.pwdTypeSureRegister == "text"
            ? (this.pwdType.pwdTypeSureRegister = "password")
            : (this.pwdType.pwdTypeSureRegister = "text");
          break;
      }
    },
    /*
     **  @description 查询轮播图
     **  @param {}
     **  @return
     **  @author shipingan
     */
    queryAllImage() {
      $.ajax({
        url: "http://121.40.121.90:5010/dapi/u/findAll",
        type: "post",
        success: (res) => {
          console.log(res);
          if (res.status == 200) {
            this.imageList = res.data;
          }
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
.el-container{
  height: 100%;
}
.m-rotation{
  margin-bottom: 56px;
}
.bei-an-info{
  line-height: 60px;
  font-size: 12px;
}
#app {
  display: none;
}
.c-header {
  background-color: #f6f6f6;
  display: flex;
}
.h-left {
  line-height: 60px;
  flex: 1;
  display: flex;
  max-width: 1000px;
  margin: 0 auto;
  justify-content: space-between;
}
.h-login {
  line-height: 60px;
  padding-left: 30px;
}
.h-logo img {
  vertical-align: middle;
}
.h-title {
  color: #90a94d;
}

@media screen and (max-width: 1000px) {
  .h-title {
    display: none;
  }
  .vip-h-title {
    display: none;
  }
  .h-login {
    padding-left: 0;
  }
}
@media screen and (max-width: 460px) {
  .c-header {
    display: flex;
    flex-direction: column;
    height: 120px !important;
  }
  .h-login {
    text-align: center;
    padding-left: 0;
  }
  .darwer-content-box .el-input {
    margin: 10px 0 !important;
  }
  .el-drawer__header {
    margin: 0 !important;
    padding: 0 !important;
  }
}
/* 轮播 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-main {
  padding: 0;
  margin-top: 10px;
}

/* 登录弹框 */
.darwer-content-box {
  padding: 20px 40px;
  text-align: center;
}
.darwer-content-box .code-login {
  text-align: left;
}
.darwer-content-box h4 {
  color: #67c23a;
  letter-spacing: 10px;
  font-size: 24px;
}
.darwer-content-box .el-input {
  margin: 20px 0;
}
.darwer-content-box .pwd-forget {
  display: flex;
  justify-content: space-between;
}
.darwer-content-box .el-button {
  width: 100%;
  margin: 5px 0;
}

.send-code-btn {
  cursor: pointer;
  width: 70px;
}
</style>
