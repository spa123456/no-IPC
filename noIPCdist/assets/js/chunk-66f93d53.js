(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-66f93d53"],{"59ac":function(e,t,s){},"7da8":function(e,t,s){"use strict";var a=s("59ac"),i=s.n(a);i.a},"99af":function(e,t,s){"use strict";var a=s("23e7"),i=s("d039"),n=s("e8b5"),o=s("861d"),r=s("7b0b"),d=s("50c4"),c=s("8418"),l=s("65f0"),p=s("1dde"),u=s("b622"),g=s("2d00"),h=u("isConcatSpreadable"),f=9007199254740991,w="Maximum allowed index exceeded",m=g>=51||!i((function(){var e=[];return e[h]=!1,e.concat()[0]!==e})),v=p("concat"),D=function(e){if(!o(e))return!1;var t=e[h];return void 0!==t?!!t:n(e)},y=!m||!v;a({target:"Array",proto:!0,forced:y},{concat:function(e){var t,s,a,i,n,o=r(this),p=l(o,0),u=0;for(t=-1,a=arguments.length;t<a;t++)if(n=-1===t?o:arguments[t],D(n)){if(i=d(n.length),u+i>f)throw TypeError(w);for(s=0;s<i;s++,u++)s in n&&c(p,u,n[s])}else{if(u>=f)throw TypeError(w);c(p,u++,n)}return p.length=u,p}})},cf05:function(e,t,s){e.exports=s.p+"assets/img/logo.png"},dd7b:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",[a("el-header",{staticClass:"c-header"},[a("div",{staticClass:"h-left"},[a("div",{staticClass:"h-logo"},[a("img",{attrs:{src:s("cf05"),alt:"",height:"30",width:"30"}}),a("span",[e._v(" EPOCH 弈 博 制 造 ")])]),a("div",{staticClass:"h-title"},[a("i",{staticClass:"el-icon-message"}),a("span",[e._v(" 136.....@qq.com | ")]),a("i",{staticClass:"el-icon-service"}),a("span",[e._v(" 028-66666666 ")])])]),a("div",{staticClass:"h-login"},[a("el-button",{attrs:{type:""},on:{click:function(t){return e.login()}}},[e._v("会员登录")]),a("el-button",{attrs:{type:"success"},on:{click:function(t){return e.register()}}},[e._v("成为会员")])],1),a("el-drawer",{attrs:{visible:e.drawerOpenStatus,direction:e.darderOpen,size:e.darwerW},on:{"update:visible":function(t){e.drawerOpenStatus=t},close:function(t){return e.drawerClose()}}},[e.drawerLogin?a("div",{staticClass:"darwer-content-box"},[a("p",{staticClass:"code-login"},[a("el-link",{attrs:{type:"primary"},on:{click:function(t){e.loginType=!e.loginType}}},[e._v(e._s(e.loginType?"账号登录":"手机登录"))])],1),a("h4",[e._v("登录")]),e.loginType?a("div",[a("el-input",{attrs:{placeholder:"手机号：","prefix-icon":"el-icon-phone"},model:{value:e.codeLoginData.phoneNum,callback:function(t){e.$set(e.codeLoginData,"phoneNum",t)},expression:"codeLoginData.phoneNum"}}),a("el-input",{attrs:{placeholder:"验证码：","prefix-icon":"el-icon-s-comment"},model:{value:e.codeLoginData.code,callback:function(t){e.$set(e.codeLoginData,"code",t)},expression:"codeLoginData.code"}},[a("el-link",{staticClass:"send-code-btn",attrs:{slot:"append",type:"primary",underline:!1,disabled:e.sendCodeData.disabled},on:{click:function(t){return e.sendCodeLogin()}},slot:"append"},[e._v(e._s(e.sendCodeData.sendTitle))])],1),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.codeVipLogin()}}},[e._v("登录")])],1):a("div",[a("el-input",{attrs:{placeholder:"账号：","prefix-icon":"el-icon-user-solid"},model:{value:e.loginData.loginName,callback:function(t){e.$set(e.loginData,"loginName",t)},expression:"loginData.loginName"}}),a("el-input",{attrs:{placeholder:"密码：",type:e.pwdType.pwdTypeLogin,"prefix-icon":"el-icon-s-goods"},model:{value:e.loginData.password,callback:function(t){e.$set(e.loginData,"password",t)},expression:"loginData.password"}},[a("i",{staticClass:"el-input__icon el-icon-view",attrs:{slot:"suffix"},on:{click:function(t){return e.showPwd("L")}},slot:"suffix"})]),a("div",{staticClass:"pwd-forget"},[a("el-checkbox",{model:{value:e.loginData.savePwd,callback:function(t){e.$set(e.loginData,"savePwd",t)},expression:"loginData.savePwd"}},[e._v("记住密码")]),a("el-link",{attrs:{type:"primary"}},[a("i",{staticClass:"el-icon-question"}),e._v("忘记密码")])],1),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.vipLogin()}}},[e._v("登录")])],1),a("p",[e._v("EPOCH欢迎您")])]):e._e(),e.drawerRegister?a("div",{staticClass:"darwer-content-box"},[a("h4",[e._v("注册")]),a("el-input",{attrs:{placeholder:"账号：","prefix-icon":"el-icon-user-solid"},model:{value:e.registerData.loginName,callback:function(t){e.$set(e.registerData,"loginName",t)},expression:"registerData.loginName"}}),a("el-input",{attrs:{placeholder:"密码：",type:e.pwdType.pwdTypeRegister,"prefix-icon":"el-icon-s-goods"},model:{value:e.registerData.password,callback:function(t){e.$set(e.registerData,"password",t)},expression:"registerData.password"}},[a("i",{staticClass:"el-input__icon el-icon-view",attrs:{slot:"suffix"},on:{click:function(t){return e.showPwd("R")}},slot:"suffix"})]),a("el-input",{attrs:{placeholder:"确认密码：",type:e.pwdType.pwdTypeSureRegister,"prefix-icon":"el-icon-s-goods"},model:{value:e.registerData.surepassword,callback:function(t){e.$set(e.registerData,"surepassword",t)},expression:"registerData.surepassword"}},[a("i",{staticClass:"el-input__icon el-icon-view",attrs:{slot:"suffix"},on:{click:function(t){return e.showPwd("SR")}},slot:"suffix"})]),a("el-input",{attrs:{placeholder:"手机号：","prefix-icon":"el-icon-phone"},model:{value:e.registerData.phoneNum,callback:function(t){e.$set(e.registerData,"phoneNum",t)},expression:"registerData.phoneNum"}}),a("el-input",{attrs:{placeholder:"验证码：","prefix-icon":"el-icon-s-comment"},model:{value:e.registerData.code,callback:function(t){e.$set(e.registerData,"code",t)},expression:"registerData.code"}},[a("el-link",{staticClass:"send-code-btn",attrs:{slot:"append",type:"primary",underline:!1,disabled:e.sendCodeData.disabled},on:{click:function(t){return e.sendcode()}},slot:"append"},[e._v(e._s(e.sendCodeData.sendTitle))])],1),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.vipRegister()}}},[e._v("注册")]),a("p",[e._v("EPOCH欢迎您")])],1):e._e()])],1),a("el-main",[a("div",{staticClass:"m-rotation"},[a("el-carousel",{attrs:{interval:4e3,height:"750px"}},e._l(e.imageList,(function(e){return a("el-carousel-item",{key:e.homepageId},[a("el-image",{staticStyle:{width:"80%",height:"100%"},attrs:{src:e.homepagePath,fit:"cover"}})],1)})),1)],1),a("div",{staticClass:"bei-an-info"},[a("p",[e._v(" © Copyright 2017-2018 Chengdu New Epoch High Tech Development Co.,Ltd.All Rights Reserver.蜀ICP备06006284号-3 ")])])])],1)},i=[],n=(s("99af"),s("5530")),o=s("1157"),r=s.n(o),d={data:function(){return{slider:[{}],drawerLogin:!1,drawerRegister:!1,drawerOpenStatus:!1,darderOpen:"rtl",darwerW:"30%",pwdType:{pwdTypeLogin:"password",pwdTypeRegister:"password",pwdTypeSureRegister:"password"},screenWidth:document.body.clientWidth,loginType:!1,loginData:{loginName:"",password:"",savePwd:!1},codeLoginData:{phoneNum:"",code:""},registerData:{loginName:"",password:"",surepassword:"",phoneNum:"",code:""},sendCodeData:{sendCodeTime:60,sendTitle:"发送验证码",disabled:!1},imageList:[]}},created:function(){this.queryAllImage(),this.getVipLoginLocalStorage()},mounted:function(){this.addlistener(),this.getScreenWidth()},watch:{screenWidth:function(){this.getScreenWidth()},drawerLogin:function(e){this.drawerOpenStatus=!!e},drawerRegister:function(e){this.drawerOpenStatus=!!e},"loginData.savePwd":function(e){e?localStorage.setItem("vipLoginAccount",JSON.stringify(this.loginData)):localStorage.removeItem("vipLoginAccount")}},methods:{getVipLoginLocalStorage:function(){var e=localStorage.getItem("vipLoginAccount");e&&(this.loginData=JSON.parse(e))},addlistener:function(){var e=this;window.onresize=function(){return function(){e.screenWidth=document.body.clientWidth}()}},getScreenWidth:function(){this.screenWidth<=1400&&this.screenWidth>=460?(this.darwerW="420px",this.darderOpen="rtl"):this.screenWidth<460?(this.darwerW="80%",this.darderOpen="btt"):(this.darderOpen="rtl",this.darwerW="30%")},drawerClose:function(){this.drawerLogin=this.drawerRegister=!1},login:function(){this.drawerLogin=!0},vipLogin:function(){var e=this,t=Object(n["a"])({},this.loginData);this.ajaxPost("/dapi/nser/loginByPwd",t).then((function(t){console.log(t),200==t.status?e.$router.push({path:"vipHome",query:{account:e.loginData.loginName,id:t.data}}):e.$message.error(t.message)}))},sendCodeLogin:function(){var e=this;if(""!=this.codeLoginData.phoneNum){var t={phoneNum:this.codeLoginData.phoneNum};this.ajaxPost("/dapi/nser/loginSendSms",t).then((function(t){if(console.log(t),200==t.status){e.$message({type:"success",message:"发送短信成功"}),e.sendCodeData.disabled=!0,e.sendCodeData.sendTitle=e.sendCodeData.sendCodeTime;var s=setInterval((function(){0!=e.sendCodeData.sendCodeTime?(e.sendCodeData.sendCodeTime--,e.sendCodeData.sendTitle=e.sendCodeData.sendCodeTime):(clearInterval(s),e.sendCodeData.sendTitle="重新发送",e.sendCodeData.disabled=!1,e.sendCodeData.sendCodeTime=60)}),1e3)}}))}else this.$message.error("请填手机号")},codeVipLogin:function(){var e=this;if(""!=this.codeLoginData.phoneNum&&""!=this.codeLoginData.code){var t=Object(n["a"])({},this.codeLoginData);this.ajaxPost("/dapi/nser/LoginByPhone",t).then((function(t){200==t.status?window.location.href="views/vipHome.html?account=".concat(e.codeLoginData.phoneNum,"&id=").concat(t.message):e.$message.error(t.message)}))}else this.$message.error("请填写数据")},register:function(){this.drawerRegister=!0},vipRegister:function(){var e=this;for(var t in this.registerData)if(""==this.registerData[t])return void this.$message.error("请填写完整信息");if(this.registerData.password==this.registerData.surepassword){var s=Object(n["a"])({},this.registerData);this.ajaxPost("/dapi/nser/register",s).then((function(t){200==t.status?(e.$message({type:"success",message:"注册成功"}),e.loginData.loginName=e.registerData.loginName,e.loginData.password=e.registerData.password,e.drawerRegister=!1,setTimeout((function(){e.drawerLogin=!0}),200)):e.$message.error(t.message)}))}else this.$message.error("两次密码不一致")},sendcode:function(){var e=this;if(""!=this.registerData.loginName)if(""!=this.registerData.phoneNum){var t={loginName:this.registerData.loginName,phoneNum:this.registerData.phoneNum};this.ajaxPost("/dapi/nser/checkData",t).then((function(t){if(200==t.status){e.$message({type:"success",message:"发送短信成功"}),e.sendCodeData.disabled=!0,e.sendCodeData.sendTitle=e.sendCodeData.sendCodeTime;var s=setInterval((function(){0!=e.sendCodeData.sendCodeTime?(e.sendCodeData.sendCodeTime--,e.sendCodeData.sendTitle=e.sendCodeData.sendCodeTime):(clearInterval(s),e.sendCodeData.sendTitle="重新发送",e.sendCodeData.disabled=!1,e.sendCodeData.sendCodeTime=60)}),1e3)}}))}else this.$message.error("请填手机号");else this.$message.error("请填写账号")},showPwd:function(e){switch(e){case"L":"text"==this.pwdType.pwdTypeLogin?this.pwdType.pwdTypeLogin="password":this.pwdType.pwdTypeLogin="text";break;case"R":"text"==this.pwdType.pwdTypeRegister?this.pwdType.pwdTypeRegister="password":this.pwdType.pwdTypeRegister="text";break;default:"text"==this.pwdType.pwdTypeSureRegister?this.pwdType.pwdTypeSureRegister="password":this.pwdType.pwdTypeSureRegister="text";break}},queryAllImage:function(){var e=this;r.a.ajax({url:"http://121.40.121.90:5010/dapi/u/findAll",type:"post",success:function(t){console.log(t),200==t.status&&(e.imageList=t.data)}})}}},c=d,l=(s("7da8"),s("2877")),p=Object(l["a"])(c,a,i,!1,null,"4914266a",null);t["default"]=p.exports}}]);