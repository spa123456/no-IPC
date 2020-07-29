<template>
<el-container>
            <el-header class="vip-c-header">
                <div class="h-left">
                    <div class="h-logo">
                        <img src="../assets/logo.png" alt="" height="30" width="30">
                        <span>
                            EPOCH 弈 博 制 造
                        </span>
                    </div>
                    <div>
                        <router-link to="/" :underline="false"> <i class="el-icon-back"></i><span
                                class="vip-h-title">{{loginData.loginName}}</span></router-link>
                    </div>
                </div>
            </el-header>
            <el-main class="vip-main">
                <el-container class="vm-container">
                    <el-header class="v-m-h">
                        <div class="v-m-h-menu" ref="menuBox">
                            <el-link v-for="item in linkList" :type="item.clickStatus?'success':'info'" :key="item.row"
                                :underline="false" @click="getModule(item.row)">{{item.title}}</el-link>
                        </div>
                    </el-header>
                    <el-main class="vip-m-main vmm">
                        <el-button :size="eleSize" class="vmm-more" type="primary" icon="el-icon-arrow-right"
                            style="display: none;z-index: 99999;" @click="showMenu()"></el-button>

                        <div class="modules-item">
                            <!-- info部分 -->
                            <div v-if="iframeHtml=='info'">
                                <el-container class="vip-info-html">
                                    <el-main>
                                        <div class="info-main-datlis">
                                            <div class="user-info conmmon-sty">
                                                <h4>VIP用户信息</h4>
                                                <div class="i-info">
                                                    <el-input :size="eleSize" placeholder="请输入设备安装地址："
                                                        v-model="userInfoData.address">
                                                    </el-input>
                                                    <el-input :size="eleSize" placeholder="请输入姓名："
                                                        v-model="userInfoData.name">
                                                    </el-input>
                                                    <el-input :size="eleSize" placeholder="电话：" disabled
                                                        v-model="userInfoData.phoneNum"></el-input>
                                                    <el-input :size="eleSize" placeholder="身份证号："
                                                        v-model="userInfoData.idNo">
                                                    </el-input>

                                                    <div class="button-box">
                                                        <el-button :size="eleSize" v-if="!hasUserInfo" type="primary"
                                                            @click="setUserInfo()">完成</el-button>
                                                        <el-button :size="eleSize" v-if="!hasUserInfo&&catchUserInfo"
                                                            type="warning"
                                                            @click="hasUserInfo=true;catchUserInfo=false">取消修改
                                                        </el-button>
                                                        <el-button :size="eleSize" v-if="hasUserInfo" type="warning"
                                                            @click="hasUserInfo=false;catchUserInfo=true">修改信息
                                                        </el-button>
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="two-box ">
                                                <div v-if="showChannel" class="channel-add-box conmmon-sty">
                                                    <h4>创建通道</h4>
                                                    <div class="addChannel-item"
                                                        v-for="(item,index) in addChannelEquipment.item" :key="index">
                                                        <div class="left-btn-box">
                                                            <el-button circle type="success">
                                                                {{(index+1)>9?index+1:"0"+(index+1)}}</el-button>
                                                        </div>
                                                        <div class="right-input-box">
                                                            <el-input :size="eleSize" v-model="item.drivewayName"
                                                                placeholder="请输入所在通道名称"></el-input>
                                                            <!-- <el-input :size="eleSize" v-model="item.MAC"
                                                                placeholder="请输入设备编码"></el-input> -->
                                                        </div>
                                                        <div class="left-btn-box">
                                                            <el-button circle type="danger" icon="el-icon-close"
                                                                @click="removeEquipment(item,index)"></el-button>
                                                        </div>
                                                    </div>
                                                    <p class="c-d-b-p-center">
                                                        <el-button type="text" @click="addMoreEquipment">添加更多
                                                        </el-button>
                                                    </p>
                                                    <p class="c-d-b-p-center">
                                                        <el-button :size="eleSize" type="primary"
                                                            @click="suerAddEquipment">确 定
                                                        </el-button>
                                                    </p>
                                                </div>
                                                <div class="explain-info conmmon-sty">
                                                    <h4>详情与说明</h4>
                                                    <p>
                                                        一、填写完整VIP用户资料后可进行余下相关操作噢！
                                                    </p>
                                                    <p>
                                                        二、创建通道、为随后的设备绑定创建基础
                                                    </p>
                                                    <p>
                                                        三、绑定设备后请前往通道设备绑定绑定相应的使用的设备（如：设备主机、人脸识别机）
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </el-main>
                                </el-container>
                            </div>
                            <div v-if="iframeHtml=='baimingdan'">
                                <!-- 用户绑定白名单 -->
                                <div class="b-container">
                                    <div class="b-header">
                                        <div class="b-header-left">
                                            <span class="b-width">
                                                <el-input :size="eleSize" placeholder="输入姓名搜索" v-model="UserName">
                                                    <el-button slot="append" @click="queryUserName()"> 查询用户</el-button>
                                                </el-input>
                                            </span>

                                            <el-button :size="eleSize" type="primary" class="b-add-user"
                                                @click="BMDaddUser()">添加用户
                                            </el-button>

                                        </div>
                                        <div>
                                            <el-button :size="eleSize" v-if="changeDrivewayList.length>0" type="success"
                                                class="b-bangding-user" @click="bangdingUserAndDriveway">
                                                绑定人员通道</el-button>
                                            <el-select :size="eleSize" v-model="changeDrivewayList" multiple
                                                collapse-tags style="margin:0 20px;" placeholder="选择绑定通道">
                                                <el-option v-for="item in JSON.parse(queryDataList) "
                                                    :key="item.drivewayId" :label="item.drivewayName"
                                                    :value="item.drivewayId">
                                                </el-option>
                                            </el-select>
                                            <el-button :size="eleSize" type="primary" @click="queryDrivewayDataList()">
                                                查询通道数据</el-button>
                                            <el-button type="primary" @click="SynchronizeData">同步白名单</el-button>
                                        </div>

                                    </div>
                                    <!-- 白名单人员数据 -->

                                    <div class="b-main">
                                        <!-- 人员数据 -->
                                        <el-table row-key="userId" v-if="showDrivewayStatus" stripe border
                                            :header-cell-style="{ background: '#409eff', color: '#fff' }"
                                            :data="allUserList" size="mini" @selection-change="changeTable">
                                            <!-- 小屏幕展示 -->
                                            <el-table-column align="center" type="expand" v-if="showDrivewayStatus">
                                                <template slot-scope="props">
                                                    <el-form label-position="left" inline class="demo-table-expand">
                                                        <el-form-item label="可通行通道：">
                                                            <el-link type="success">
                                                                {{ props.row.userId |getDrivewayName(that)}}{{props.row.drivewayName}}
                                                            </el-link>
                                                        </el-form-item>
                                                    </el-form>
                                                </template>
                                            </el-table-column>

                                            <el-table-column align="center" type="selection" width="55">
                                            </el-table-column>
                                            <el-table-column align="center" prop="name" label="姓名"></el-table-column>
                                            <el-table-column align="center" prop="sex" label="性别">
                                                <template slot-scope="scope">
                                                    <span v-if="scope.row.sex==1">男</span>
                                                    <span v-if="scope.row.sex==2">女</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column align="center" prop="icNum" label="IC卡号"></el-table-column>
                                            <el-table-column align="center" prop="types" label="人员类型">
                                                <template slot-scope="scope">
                                                    <span v-if="scope.row.types==1">普通用户</span>
                                                    <span v-if="scope.row.types==2">户主用户</span>
                                                    <span v-if="scope.row.types==3">外来人员</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column width="200" align="center" label="操作" v-if="!eleSize">
                                                <template slot-scope="scope">
                                                    <el-button size="mini" type="warning"
                                                        @click="changeUserInfo(scope.row)">修改用户</el-button>
                                                    <el-button @click="removeUser(scope.row)" type="danger" size="mini">
                                                        删除</el-button>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <!-- 通道人员数据 -->

                                        <el-table v-if="showDrivewayStatus1" stripe border
                                            :header-cell-style="{ background: '#409eff', color: '#fff' }"
                                            :data="drivewayDataList" size="mini">
                                            <el-table-column prop="dusername" label="姓名"></el-table-column>
                                            <el-table-column prop="duserIcNum" label="IC卡号"></el-table-column>
                                        </el-table>
                                    </div>
                                    <!-- 添加白名单传参 -->
                                    <el-dialog title="添加用户" :visible.sync="addUserDialog">
                                        <el-form class="dialog-form">
                                            <el-form-item label="用户姓名：" :label-width="formLabelWidth">
                                                <el-input class="int-w" v-model="addUserForm.name"></el-input>
                                            </el-form-item>
                                            <el-form-item label="用户性别：" :label-width="formLabelWidth">
                                                <el-radio-group v-model="addUserForm.sex">
                                                    <el-radio :label="1">男</el-radio>
                                                    <el-radio :label="2">女</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="用户类型：" :label-width="formLabelWidth">
                                                <el-radio-group v-model="addUserForm.types">
                                                    <el-radio :label="1">普通用户</el-radio>
                                                    <el-radio :label="2">户主用户</el-radio>
                                                    <el-radio :label="3">外来人员</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="用户关系：" :label-width="formLabelWidth">
                                                <el-select v-model="addUserForm.relation" placeholder="请选择用户的关系">
                                                    <el-option v-for="item in relationList" :key="item.relation"
                                                        :label="item.name" :value="item.relation"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="用户IC卡号：" :label-width="formLabelWidth">
                                                <el-input class="int-w" v-model="addUserForm.icNum"></el-input>
                                            </el-form-item>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="addUserDialog = false">取 消</el-button>
                                            <el-button type="primary" @click="addUserDialogSure()">确 定</el-button>
                                        </div>
                                    </el-dialog>


                                    <!-- 分页 -->
                                    <div class="b-pagination">
                                        <el-pagination @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange" :current-page="pagination.currentPage"
                                            :page-sizes="[20, 30, 40, 50]" :page-size="pagination.pageSize"
                                            layout="total, sizes, prev, pager, next, jumper" :total="pagination.total">
                                        </el-pagination>
                                    </div>


                                </div>
                            </div>
                            <div v-if="iframeHtml=='tongxing'" class="tongxing">
                                <!-- 通行记录。。。。。。。。。。。。。。。。。。。。。。。。。。。。 -->
                                <!-- 
                                    接口：/find/recorder
                                    请求方式：GET
                                    参数：
                                    根据通道查询 drivewayId
                                    根据用户id查询 dUserId
                                    根据时间查询：开始时间 recorderStartDate
                                                            结束时间 recorderEndDate
                                    分页：start 开始位置
                                            size 每页大小
                                 -->
                                <div class="tongxing-header">
                                    <el-input placeholder="输入姓名查询" size="mini" v-model="tongxing.dUserName"></el-input>
                                    <el-select placeholder="请选择通道" size="mini" v-model="tongxing.drivewayId">
                                        <el-option v-for="item in JSON.parse(queryDataList) " :key="item.drivewayId"
                                            :label="item.drivewayName" :value="item.drivewayId">
                                        </el-option>
                                    </el-select>
                                    <!-- 时间 -->
                                    <el-date-picker size="mini" v-model="changeTime" type="daterange"
                                        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                                        value-format="yyyy-MM-dd HH:mm:ss">
                                    </el-date-picker>
                                    <el-button size="mini" @click="clearParams" type="primary">清空查询数据</el-button>
                                    <el-button size="mini" type="primary" @click="getPassInfoList()">查询</el-button>
                                </div>
                                <div class="tongxing-main">
                                    <el-table size="mini" :data="passList" stripe border
                                        :header-cell-style="{ background: '#409eff', color: '#fff' }">
                                        <el-table-column prop="userName" align="center" label="姓名"></el-table-column>
                                        <el-table-column prop="userIcNum" align="center" label="IC卡号"></el-table-column>
                                        <el-table-column prop="inOrOut" align="center" label="出入方向"></el-table-column>
                                        <el-table-column align="center" label="时间">
                                            <template slot-scope="scope">
                                                {{scope.row.recorderDate|setTimeData(that)}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="drivewayName" align="center" label="通道">
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <div class="tongxing-foolter">
                                    <el-pagination @size-change="txhandleSizeChange"
                                        @current-change="txhandleCurrentChange" :current-page="txfy.page"
                                        :page-sizes="[20, 30, 40, 50]" :page-size="txfy.pageSize"
                                        layout="total, sizes, prev, pager, next, jumper" :total="txfy.total">
                                    </el-pagination>
                                </div>
                            </div>
                            <div v-if="iframeHtml=='sebei'">
                                <el-container class="sebei-box">
                                    <el-main class="sebei-main">
                                        <p v-if="!hasEquipmentDrivews">暂无可绑设备通道。。。</p>
                                        <div v-else>
                                            <el-container>
                                                <el-header class="setbei-change-hedaer">
                                                    <div class="seibei-change-driveway">
                                                        <div>
                                                            <el-select v-model="drivewayId" :size="eleSize"
                                                                placeholder="请选择通道" class="seibei-width"
                                                                @change="changeDriveway()">
                                                                <el-option v-for="item in JSON.parse(queryDataList)"
                                                                    :key="item.drivewayId" :label="item.drivewayName"
                                                                    :value="item.
                                                                drivewayId"></el-option>
                                                            </el-select>
                                                        </div>
                                                        <div>
                                                            <el-input class="seibei-width" :size="eleSize"
                                                                placeholder="绑定该通道的产品序列号" v-model="seibeiID">
                                                                <el-button slot="append" @click="querySeiBeiID('main')">
                                                                    确定
                                                                </el-button>
                                                            </el-input>
                                                        </div>
                                                    </div>
                                                </el-header>

                                                <!-- 其他设备 -->
                                                <el-main class="other-seibei" v-if="noSetEqument">
                                                    <div class="set-other-equment">
                                                        <p>
                                                            <div class="seibei-title">绑定其他硬件设备</div>
                                                        </p>
                                                        <p>
                                                            <el-input v-model="cameraId" class="seibei-width"
                                                                :size="eleSize">
                                                                <template slot="prepend">相机：</template>
                                                                <el-button slot="append"
                                                                    @click="querySeiBeiID('camear')">确定
                                                                </el-button>
                                                            </el-input>
                                                        </p>
                                                    </div>
                                                </el-main>
                                            </el-container>
                                        </div>
                                    </el-main>
                                </el-container>
                            </div>
                        </div>
                    </el-main>
                    <!-- 手机菜单弹框 -->
                    <el-drawer size="60%" :visible.sync="drawerMenu" direction="ltr">
                        <div class="drawerMenu-box">
                            <h4>更多选项</h4>
                            <el-link v-for="item in linkList" :underline="false"
                                :type="item.clickStatus?'success':'info'" :key="item.row" @click="getModule(item.row)">
                                {{item.title}}</el-link>
                        </div>
                    </el-drawer>
                </el-container>
            </el-main>
        </el-container>
</template>
<script>
export default {
       data() {
            return {
                that: this,
                loginId: '',
                eleSize: 'mini', //元素大小
                loginData: {},
                drawerMenu: false,
                screenWidth: document.body.clientWidth, //屏幕宽度
                linkList: [{
                        title: '信息认证',
                        row: 'a',
                        clickStatus: true,
                        html: 'info'
                    },
                    {
                        title: '人员管理',
                        row: 'b',
                        clickStatus: false,
                        html: 'baimingdan'
                    },
                    {
                        title: '通行记录',
                        row: 'c',
                        clickStatus: false,
                        html: 'tongxing'
                    },
                    {
                        title: '设备绑定',
                        row: 'd',
                        clickStatus: false,
                        html: 'sebei'
                    },
                ],
                iframeHtml: 'info',
                hasUserInfo: false,
                catchUserInfo: false,
                showChannel: false, //是否显示绑定设备通道
                userInfoData: {
                    address: '',
                    name: '',
                    idNo: '',
                    phoneNum: ''
                },
                addChannelEquipment: {
                    item: [{
                        drivewayName: "",
                    }],
                },
                queryDataList: '[]', //查询到已经又的通道
                hasEquipmentDrivews: false, //是否有通道
                //设备绑定
                drivewayId: '', //选中的通道ID
                seibeiID: '', //通道对应的设备序列号
                noSetEqument: '', //师傅绑定了主机
                cameraId: '', //相机ID
                //白名单
                UserName: '',
                allUserList: [], //全部人员信息
                addUserDialog: false, //添加弹框
                formLabelWidth: '150px',
                addUserForm: {
                    loginId: '',
                    name: '',
                    sex: 1,
                    types: 1,
                    icNum: '', //1普通2户主3外部人员
                    relation: '', //关系
                }, //添加用户白名单
                relationList: [{
                        relation: 1,
                        name: '户主'
                    },
                    {
                        relation: 2,
                        name: '父母'
                    },
                    {
                        relation: 3,
                        name: '配偶'
                    },
                    {
                        relation: 4,
                        name: '子女'
                    },
                    {
                        relation: 5,
                        name: '朋友'
                    },
                    {
                        relation: 6,
                        name: '亲属'
                    },
                    {
                        relation: 7,
                        name: '租客'
                    },
                ],
                changeDrivewayList: [], //选中的通道--绑定数据
                changeUserList: [],
                //fenye
                pagination: {
                    total: 100,
                    pageSize: 20,
                    currentPage: 1
                },
                drivewayDataList: [], //所在通道的人员表
                showDrivewayStatus: true, //是否展示同代表
                showDrivewayStatus1: false,
                tongxing: {
                    dUserName: '',
                    drivewayId: '',
                    recorderStartDate: '',
                    recorderEndDate: '',
                },
                txfy: {
                    total: 0,
                    pageSize: 20,
                    page: 1
                },
                changeTime: [],
                passList: [],
            }
        },
        created() {
            this.getQueryUrl("loginId", 'id')
            this.getEquipment()
        },
        filters: {
            getDrivewayName(userId, that) {
                let drivewayName = ''
                that.queryDrivewayDataList(userId).then(() => {
                    that.drivewayDataList.map(item => {
                        let name = JSON.parse(that.queryDataList).find(k => k
                            .drivewayId == item.drivewayId).drivewayName
                        drivewayName += name + '、'
                    })
                    let OBJ = that.allUserList.find(kid => kid.userId == userId)
                    that.$set(OBJ, "drivewayName", drivewayName)
                })
            },
            setTimeData(time,that) {
                return that.moment(time).format('LLL')
            }
        },
        watch: {
            screenWidth: function (value) {
                this.getScreenWidth(value)
            },
            // changeDrivewayList: function (value) {
            //     console.log(value);
            // }
        },
        mounted() {
            this.addlistenerScreen()
            // setTimeout(() => {
            //     this.$refs.appCon.style.display = "block"
            // }, 200);
        },
        methods: {
            /*
             **  @description 分页
             **  @param {} 
             **  @return 
             **  @author shipingan
             */
            handleSizeChange(val) {
                this.pagination.pageSize = val
                this.getAllUser()
            },
            handleCurrentChange(val) {
                this.pagination.currentPage = val
                this.getAllUser()
            },
            txhandleSizeChange(val) {
                this.txfy.pageSize = val
                this.getPassInfoList()
            },
            txhandleCurrentChange(val) {
                this.txfy.page = val
                this.getPassInfoList()
            },
            getQueryUrl(who, value) {
                let arr = window.location.search.substring(1).split('&')
                arr.some(item => {
                    let data = item.split('=')
                    if (data[0] == value) {
                        this[who] = data[1]
                        this.getUser()
                        return
                    }
                })
            },
            /*
             **  @description 获取VIP用户信息
             **  @param {} 
             **  @return 
             **  @author shipingan
             */
            getUser() {
                let params = {
                    loginId: this.loginId
                }
                this.ajaxPost('/dapi/nser/queryUser', params).then(res => {
                    if (res.status == 200) {
                        this.loginData = res.data
                        this.userInfoData.phoneNum = res.data.phoneNum
                        this.userInfoData.address = res.data.address
                        this.userInfoData.name = res.data.name
                        this.userInfoData.idNo = res.data.idNo
                        if (this.userInfoData.idNo != "") {
                            this.hasUserInfo = true
                            this.catchUserInfo = true
                            this.showChannel = true
                        }
                    }
                })
            },
            showMenu() {
                this.drawerMenu = true
            },
            addlistenerScreen() {
                window.onresize = () => {
                    return (() => {
                        this.screenWidth = document.body.clientWidth
                    })();
                }
                this.getScreenWidth(this.screenWidth)
            },
            /*
             **  @description 屏幕事件
             **  @param {} 
             **  @return 
             **  @author shipingan
             */
            getScreenWidth(value) {
                if (value >= 460) {
                    this.drawerMenu = false
                    this.eleSize = ""
                } else {
                    this.eleSize = "mini"
                }
            },
            /*
             **  @description 获取菜单点击
             **  @param {} 
             **  @return 
             **  @author shipingan
             */
            getModule(val) {
                console.log(this.queryDataList);
                if (val == 'b') {
                    this.getAllUser()
                }
                if (val == 'c') {
                    this.getPassInfoList()
                }
                this.linkList.map(item => {
                    item.clickStatus = false
                })
                let obj = this.linkList.find(item => item.row == val)
                obj.clickStatus = true
                this.iframeHtml = obj.html
                this.drawerMenu = false
            },
            /*
             **  @description 上传用户信息
             **  @param {} 
             **  @return 
             **  @author shipingan
             */
            setUserInfo() {
                if (this.userInfoData.address == "") {
                    this.$message.error("请填写地址")
                    return
                }
                if (this.userInfoData.name == "") {
                    this.$message.error("请填写姓名")
                    return
                }
                if (this.userInfoData.idNo == "") {
                    this.$message.error("请填写身份证号")
                    return
                }
                let params = {}
                Object.assign(params, {
                    loginId: this.loginId
                }, {
                    ...this.userInfoData
                })
                this.ajaxPost('/dapi/nser/verified', params).then(res => {
                    if (res.status == 200) {
                        this.getUser()
                        this.$message({
                            type: 'success',
                            message: res.data.resMsg
                        })
                    }
                }).catch(err=>{
                    this.$message.error('服务器异常')
                })
            },
            /*
             **  @description 添加更多
             **  @param {} 
             **  @return 
             **  @author shipingan
             */
            addMoreEquipment() {
                let key = this.addChannelEquipment.item.some(val => {
                    if (val.drivewayName == "") {
                        this.$message.error('请将已有数据填写完整')
                        return true
                    }
                })
                if (key) {
                    return
                }
                let obj = {
                    drivewayName: ""
                }
                this.addChannelEquipment.item.push(obj)
            },
            //移除
            removeEquipment(item,index) {
                /*
                删除通道接口：dapi/nhw/driveway/delete
                请求方式：POST
                参数： drivewayId 通道id
                */
                console.log(index);
                this.ajaxAll('/dapi/nhw/driveway/delete', {
                    data: {
                        drivewayId: item.drivewayId
                    },
                    type: 'POST'
                }).then(res => {
                    if (res.status == 200) {
                        this.$message({
                            type: "success",
                            message: '删除成功'
                        })
                        if (index==0) {
                            console.log('OK');
                        }
                        this.getEquipment()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            /*
             **  @description 确定添加
             **  @param {} 
             **  @return 
             **  @author shipingan
             */
            suerAddEquipment() {

                let arr = this.addChannelEquipment.item.map(item => {
                    return item.drivewayName
                })
                //过滤掉已有的数据
                if (this.queryDataList.length > 0) {
                    JSON.parse(this.queryDataList).map(item => {
                        if (arr.includes(item.drivewayName)) {
                            arr = arr.filter(val => val != item.drivewayName)
                        }
                    })
                }
                let params = {
                    drivewayArea: this.loginId,
                    drivewayName: arr
                }
                this.ajaxPost('/dapi/nhw/driveway/add', params).then(res => {
                    if (res.status == 200) {
                        this.$message({
                            type: 'success',
                            message: res.message
                        })
                        this.getEquipment()
                    } else {
                        this.$message.error(res.message)
                    }
                }).catch(() => {
                    this.$message.error('请求异常')
                })
            },
            /*
             **  @description 获取用户已添加的通道信息
             **  @param {} 
             **  @return 
             **  @author shipingan
             */
            getEquipment() {
                this.ajaxAll('/dapi/nhw/driveway/find', {
                    data: {
                        drivewayArea: this.loginId
                    },
                    type: 'GET'
                }).then(res => {
                    if (res.status == 200) {
                        this.queryDataList = JSON.stringify(res.data)
                        if (res.data.length > 0) {
                            this.drivewayId = res.data[0].drivewayId
                            this.changeDriveway()
                        }
                        this.addChannelEquipment.item = res.data
                        if (res.data.length > 0) {
                            this.hasEquipmentDrivews = true
                        }
                    }else{
                        Object.assign(this.$data.addChannelEquipment,this.$options.data().addChannelEquipment)
                    }

                }).catch(err => {
                    this.$message.error('服务器异常:' + err)
                })
            },
            /*
             **  @description 通道选中
             **  @param {} 
             **  @return 
             **  @author shipingan
             */
            changeDriveway() {
                let OBJ = JSON.parse(this.queryDataList).find(item => item.drivewayId == this.drivewayId)
                this.seibeiID = OBJ.drivewayBoard
                this.cameraId = OBJ.drivewayCamera
                OBJ.drivewayBoard ? this.noSetEqument = true : this.noSetEqument = false
            },
            /*
             **  @description 硬件查询
             **  @param {} 
             **  @return 
             **  @author shipingan
             */
            querySeiBeiID(who) {
                if (this.drivewayId == "") {
                    this.$message.error('请选择通道')
                    return
                }

                if (who == "main" && (this.seibeiID == null || this.seibeiID == "")) {
                    this.$message.error('请输入设备编码')
                    return
                }
                if (who == "camear" && (this.cameraId == null || this.cameraId == "")) {
                    this.$message.error('请输入相机编码')
                    return
                }
                let findParams = {
                    hardwareSn: ''
                }
                switch (who) {
                    case 'main':
                        findParams.hardwareSn = this.seibeiID
                        break;
                    case 'camear':
                        findParams.hardwareSn = this.cameraId
                        break;
                    default:
                        break;
                }

                this.ajaxAll('/dapi/nhw/hardware/findBySn', {
                    data: {
                        ...findParams
                    },
                    type: 'GET'
                }).then(res => {
                    if (res.status == 200) {
                        let options = {
                            drivewayId: this.drivewayId,
                            boardId: "",
                            cameraId: ""
                        }
                        if (res.data.hardwareIsUsed == 1) {
                            this.$message.error('设备已被绑定')
                            return
                        }
                        switch (who) {
                            case 'main':
                                options.boardId = this.seibeiID
                                res.data.hardwareType == 1 ? this.setEqument(options) : this.$message
                                    .error(
                                        "请输入闸道控制板编码")
                                break;
                            case 'camear':
                                options.cameraId = this.cameraId
                                res.data.hardwareType == 2 || res.data.hardwareType == 3 ? this
                                    .setEqument(options) : this.$message
                                    .error(
                                        "请输入相机编码")
                                break;
                            default:
                                break;
                        }

                    } else if (res.status == 2) {
                        this.$message.error(res.message)
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            /*
             **  @description 硬件绑定
             **  @param {} 
             **  @return 
             **  @author shipingan
             */
            setEqument(options) {
                this.ajaxAll('/dapi/nhw/driveway/addHd', {
                    data: {
                        ...options
                    },
                    type: "POST"
                }).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        this.$message({
                            type: "success",
                            message: res.message
                        })
                        this.getEquipment()
                    }
                })
            },
            // ///////////////////////////////////////////白名单
            /*
             **  @description 查询ALL用户数据List
             **  @param {} 
             **  @return 
             **  @author shipingan
             */
            getAllUser() {
                Object.assign(this.$data.addUserForm, this.$options.data().addUserForm)
                this.ajaxAll('/dapi/nser/queryAllNetUser', {
                    data: {
                        loginId: this.loginId,
                        currentPage: this.pagination.currentPage,
                        pageSize: this.pagination.pageSize,
                        keyWord:this.UserName
                    },
                    type: 'GET'
                }).then(res => {
                    if (res.status == 200) {
                        this.pagination.total = res.rowCount
                        this.allUserList = res.data
                    }
                })
            },
            //通过姓名查询
            queryUserName() {
                this.getAllUser()
                this.showDrivewayStatus1 = false
                setTimeout(() => {
                    this.showDrivewayStatus = true
                }, 100);
            },
            /*
             **  @description 设置通行区域
             **  @param {} 
             **  @return 
             **  @author shipingan
             */
            setPassDriveway(row) {
                console.log(row);
            },
            BMDaddUser() {
                this.addUserDialog = true
            },
            addUserDialogSure() {
                this.addUserForm.loginId = this.loginId
                let url = ''
                // 如果存在userId  则修改
                if (this.addUserForm.userId != undefined) {
                    url = '/dapi/nser/updateUser'
                } else {
                    url = '/dapi/nser/saveUser'
                }
                this.ajaxAll(url, {
                    data: {
                        ...this.addUserForm
                    },
                    type: "POST"
                }).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        this.$message({
                            type: "success",
                            message: res.message
                        })
                        this.getAllUser()
                        this.addUserDialog = false
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            /*
             **  @description 修改用户
             **  @param {} 
             **  @return 
             **  @author shipingan
             */
            changeUserInfo(row) {
                this.addUserForm = {
                    ...row
                }
                this.addUserDialog = true
            },
            /*
             **  @description 删除用户
             **  @param {} 
             **  @return 
             **  @author shipingan
             */
            removeUser(row) {
                this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ajaxAll('/dapi/nser/deleteUser', {
                        data: {
                            userId: row.userId
                        },
                        type: 'POST'
                    }).then(res => {
                        if (res.status == 200) {
                            this.$message({
                                type: "success",
                                message: res.message
                            })
                            this.getAllUser()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //------------------------------------通道绑定
            changeTable(row) {
                this.changeUserList = row
            },
            bangdingUserAndDriveway() {
                console.log(this.changeUserList);
                if (this.changeUserList.length == 0) {
                    this.$message.error("请勾选需要绑定通道的人员。。。")
                    return
                }
                let params = {
                    drivewayList: JSON.stringify(this.changeDrivewayList),
                    userList: JSON.stringify(this.changeUserList),
                }
                this.ajaxAll('/dapi/nhw/driveway/user/add', {
                    data: {
                        ...params
                    },
                    type: 'POST',
                }).then(res => {
                    if (res.status==200) {
                        this.$message({
                            type:'success',
                            message:"绑定成功/请同步数据"
                        })
                        this.getAllUser()
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            /*
            **  @description 查询通道中的人员数据
            **  @param {} 接口：/driveway/user/find
                        请求方式：GET
                        参数：
                        根据通道查询 drivewayId
                        根据用户id查询 dUserId
                        根据用户名称查询 dUsername
                        根据门禁卡号查询 dUserIcNum
                        根据16进制门禁卡查询 dUserIcHex
            **  @return 
            **  @author shipingan
            */
            async queryDrivewayDataList(reqValue) {
                //判断有几条通道
                if (this.changeDrivewayList.length != 1 && !reqValue) {
                    this.$message.error('请只选择一条通道查询。。。')
                    return
                }
                let params
                if (reqValue) {
                    params = {
                        dUserId: reqValue
                    }
                } else {
                    params = {
                        drivewayId: this.changeDrivewayList[0] || ""
                    }

                }
                await this.ajaxAll('/dapi/nhw/driveway/user/find', {
                    data: {
                        ...params
                    },
                    type: 'GET',
                }).then(res => {
                    if (res.status == 200) {
                        this.drivewayDataList = res.data
                        if (!reqValue) {
                            this.showDrivewayStatus = false
                            setTimeout(() => {
                                this.showDrivewayStatus1 = true
                            }, 10);
                        }
                    } else {
                        this.drivewayDataList = []
                        // this.$message.error(res.message)
                    }
                })
            },
            /*
             **  @description 同步数据
             **  @param {} 
             **  @return 
             **  @author shipingan
             */
            SynchronizeData() {
                this.ajaxAll('/dapi/nhw/handSelf/whitelist', {
                    data: {
                        areaId: this.loginId
                    },
                    type: 'POST'
                }).then(res => {
                    console.log(res);
                })
                this.$notify({
                    title: '同步中',
                    dangerouslyUseHTMLString: true,
                    message: `<el-progress type="circle" :percentage="0"></el-progress>`
                });
            },
            // 通行记录。。。。。。。。。。。。。。。。。。。。。。。
            /*
             接口：/find/recorder
            请求方式：GET
            参数：
            根据通道查询 drivewayId
            根据用户id查询 dUserId
             根据时间查询：开始时间 recorderStartDate
                                     结束时间 recorderEndDate
             分页：start 开始位置
                     size 每页大小
            */
            getPassInfoList() {
                console.log(this.changeTime);
                if (this.changeTime && this.changeTime.length > 0) {
                    this.tongxing.recorderStartDate = this.changeTime[0]
                    this.tongxing.recorderEndDate = this.changeTime[1].replace('00:00:00', '23:59:59')
                } else {
                    this.tongxing.recorderStartDate = ''
                    this.tongxing.recorderEndDate = ''
                }
                let params = {
                    ...this.tongxing,
                    ...this.txfy
                }
                this.ajaxAll('/dapi/nhw/find/recorder', {
                    data: params,
                    type: "GET"
                }).then(res => {
                    if (res.status == 200) {
                        this.txfy.total = res.data.count
                        this.passList = res.data.list
                    } else {
                        this.passList = []
                        this.txfy.total = 0
                    }
                })
            },
            /*
            **  @description 清空查询数据
            **  @param {} 
            **  @return 
            **  @author shipingan
            */
            clearParams(){
                Object.assign(this.$data.tongxing,this.$options.data().tongxing)
            }
        }
   
}
</script>
<style lang='less' scoped>
.b-container {
}
.b-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}
.b-header-left{
  display: flex;
}
.b-main {
  padding: 0 20px;
}

.b-width {
  width: 300px;
  margin-right: 10px;
}
.b-add-user,
.b-bangding-user {
  /* margin:0 10px !important; */
}
.dialog-form {
}
.b-pagination {
  text-align: center;
  margin-top: 20px;
}
.dialog-form .int-w {
  width: 217px;
}

// aaaaaaaaaaaaaaaaaaaaaa
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
  .h-login{
    padding-left: 0;
  }
}
@media screen and (max-width: 460px) {
  .b-width {
    width: calc(100% - 40px);
  }
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
    margin: 10px 0!important;
  }
  .el-drawer__header{
      margin: 0!important;
      padding: 0!important;
  }
  .seibei-change-driveway .seibei-width,
  .other-seibei .seibei-width {
    width: 300px;
    margin: 10px;
  }
  .sebei-main .other-seibei {
    margin-top: 60px;
  }
    .v-m-h-menu {
    text-align: center;
  }
  .h-logo {
    flex: 1;
    text-align: center;
  }
  .v-m-h {
    display: none;
  }
  .vmm-more {
    display: block !important;
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
.darwer-content-box .code-login{
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

// sheb
.sebei-box {
  padding: 10px;
}
.sebei-box > p {
  text-align: center;
}
.sebei-main {
  margin: 0;
  padding: 0 !important;
}
.setbei-change-hedaer {
  display: flex;
}

/* .sebei-main .other-seibei {
  padding: 0 20px;
} */

.seibei-change-driveway {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.seibei-change-driveway .seibei-width,
.other-seibei .seibei-width {
  width: 300px;
  margin: 0 20px;
}
/* 其他设备 */
.seibei-title {
  box-sizing: border-box;
  margin: 0 0 20px 20px;
  padding-left: 10px;
  border-left: 10px solid rgb(9, 131, 84);
}
.set-other-equment{
    text-align: left;
}
// bx
.tongxing {
}
.tongxing-header {
  display: flex;
  padding: 20px;
}
.tongxing-header .el-input {
  width: 200px;
}
.tongxing-header .el-select {
  margin: 0 20px;
}
.tongxing-header .el-button {
  margin-left: 20px;
}
.tongxing-main {
  margin: 0 20px;
  margin-bottom: 60px;
}
.tongxing-foolter {
  text-align: center;
  margin: 20px;
  position: fixed;
  padding-top: 20px;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 11111;
}
.vip-info-html {
  height: 100%;
}
.vip-info-html > .el-main {
  padding: 0;
}
.info-main-datlis {
  display: flex;
}
.two-box {
  display: flex;
  flex: 2;
}
@media screen and (max-width: 1200px) {
  .two-box {
    flex-direction: column;
  }
}
@media screen and (max-width: 800px) {
  .info-main-datlis {
    flex-direction: column;
  }
}
.channel-add-box {
  flex: 1;
}
h4 {
  margin-bottom: 10px;
  /* border-bottom: 1px solid #ccc; */
}
.info-main-datlis .conmmon-sty {
  box-shadow: 0 0 10px #ccc;
  /* background-color: #ebebeb; */
  padding: 10px;
  margin: 10px;
}
.info-main-datlis > .user-info {
  /* max-width: 370px; */
  flex: 1;
}
.two-box > .channel-add-box {
  flex: 2;
}
.two-box > .explain-info {
  flex: 1;
}
.explain-info > p {
  font-size: 14px;
  color: rgb(2, 49, 21);
  margin: 10px;
}
.i-info ,.addChannel-item{
  text-align: center;
}
.i-info > .el-input,
.addChannel-item > .el-input {
  margin: 10px 0;
  width: 80%;
}
.i-info .el-button {
  width: 80%;
  margin: 10px 0;
  flex: 1;
}
.button-box {
  width: 80%;
  margin: 0 auto;
  display: flex;
}
.addChannel-item{
  box-shadow: 0 0 5px #ccc;
  margin-bottom: 5px;
  display: flex;
}
.addChannel-item>.left-btn-box{
  padding: 10px;
}
.left-btn-box>.el-button{
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.addChannel-item>.right-input-box{
  flex: 1;
  padding: 20px;
}
.right-input-box>.el-input{
  margin: 5px;
}
.c-d-b-p-center{
  text-align: center;
}
// vip home
.vip-c-header {
  background-color: #f6f6f6;
  display: flex;
}
.vip-main {
  padding: 0 !important;
  margin: 0 !important;
  height: calc(100vh - 80px);
}

.vm-container {
  height: 100%;
}
.v-m-h {
  display: flex;
  height: 40px !important;
  line-height: 40px !important;
}
.v-m-h-menu {
  max-width: 1000px;
  margin: 0 auto;
  flex: 1;
}
.v-m-h-menu .el-link {
  margin-right: 20px;
  font-size: 16px;
}
.vmm {
  box-shadow: 0 0 10px #ccc;
  padding: 0!important;
}
.vmm-more {
  position: fixed;
  top: 150px;
  left: 0;
  padding: 10px !important;
}
.drawerMenu-box {
  text-align: center;
  display: flex;
  flex-direction: column;
}
.drawerMenu-box h4 {
  margin-bottom: 10px;
}
.drawerMenu-box .el-link {
  box-shadow: 0 0 10px #ccc;
  padding: 18px;
  margin: 5px 0;
}
/* 路由界面 */
.modules-item {
  height: 100%;
}
.modules-item>div {
  height: 100%;
}
.iframe-itme {
  width: 100%;
  height: 100%;
}
/* 滚动条 */

/* 设置滚动条的样式 */
.iframe-itme{
    overflow: scroll;
}


</style>