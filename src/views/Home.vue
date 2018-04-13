<template>
    <el-row class="container">
        <el-col class="menu" :style="collapsed?'width:60px':'width:230px'">
            <el-row class="user-logo">{{collapsed ? '' : sysName}}</el-row>
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo"
                     unique-opened router :collapse="collapsed">
                <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                    <el-submenu :index="index+''" v-if="!item.leaf">
                        <template slot="title">
                            <i :class="item.iconCls"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                        <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path"
                                      v-if="!child.hidden">{{child.name}}
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
                        <i :class="item.iconCls"></i>
                        <span slot="title">{{item.children[0].name}}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </el-col>
        <section class="region" :style="collapsed?'left:60px':'left:230px'">
            <div class="menu-head">
                <el-col :span="10">
                    <div class="tools-ellipsis" @click="collapse">
                        <i class="fa fa-align-justify"></i>
                    </div>
                </el-col>
                <el-col :span="10">
                    <el-button size="small" circle @click="handleCLassAdd"><i class="el-icon-edit"></i></el-button>
                </el-col>
                <el-col :span="4" class="userinfo">
                    <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner"><img
                            :src="this.sysUserAvatar"/> {{sysUserName}}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>我的消息</el-dropdown-item>
                            <el-dropdown-item>设置</el-dropdown-item>
                            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </div>
            <div class="region" style="top:60px;overflow-y:auto;">
                <section class="content-container">
                    <div class="grid-content bg-purple-light">
                        <el-col :span="24" class="breadcrumb-container">
                            <strong class="title">{{$route.name}}</strong>
                            <el-breadcrumb separator="/" class="breadcrumb-inner">
                                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                    {{ item.name }}
                                </el-breadcrumb-item>
                            </el-breadcrumb>
                        </el-col>
                        <el-col :span="24" class="content-wrapper">
                            <transition name="fade" mode="out-in">
                                <router-view></router-view>
                            </transition>
                        </el-col>
                    </div>
                </section>
            </div>
        </section>

        <!--栏目新增-->
        <el-dialog title="新增栏目" :visible.sync="isClassEditShow">
            <el-form :model="classInfoModel" :rules="classFormRules" label-width="80px" ref="classEditForm">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="classInfoModel.name" placeholder="栏目名称"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="classInfoModel.ClassDesc" type="text" placeholder="栏目描述"></el-input>
                </el-form-item>
                <el-form-item label="栏目属性">
                    <el-button size="small" type="primary">添加属性</el-button>
                </el-form-item>
                <el-table size='small' :data="classInfoModel.attributes">
                    <el-table-column label="序号" type="index" width="60"></el-table-column>
                    <el-table-column label="属性名称" prop="name">
                        <template scope="scope">
                            <el-input size="mini" v-model="scope.row.name"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="类型" prop="type">
                        <template scope="scope">
                            <el-select v-model="scope.row.type" placeholder="字段类型">

                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="字段长度" prop="length"></el-table-column>
                    <el-table-column label="允许为空" width="160" prop="allowNull">
                        <template scope="scope">
                            <el-radio v-model="scope.row.allowNull" label="true">是</el-radio>
                            <el-radio v-model="scope.row.allowNull" label="false">否</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column label="默认值" prop="defaultValue"></el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="medium" @click.native="isClassEditShow = false;">取消</el-button>
                <el-button size="medium" type="primary" @click="addClassOnSubmit">提交</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
    export default {
        data() {
            return {
                sysName: 'VUEADMIN',
                collapsed: false,
                sysUserName: '',
                sysUserAvatar: '',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                //栏目新增
                isClassEditShow: false,
                classInfoModel: {
                    name: "默认",
                    ClassDesc: "默认",
                    parentId: "默认",
                    attributes: [{
                        belongsId: "默认",
                        name: "默认",
                        type: "STRING",
                        length: "默认",
                        allowNull: "true",
                        defaultValue: "默认"
                    }]
                },
                attributeType:{},
                classFormRules: {
                    name: {required: true, message: '请输入栏目名称', trigger: 'blur'}
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            handleopen() {
                //console.log('handleopen');
            },
            handleclose() {
                //console.log('handleclose');
            },
            handleselect: function (a, b) {
            },
            //退出登录
            logout: function () {
                var _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    sessionStorage.removeItem('user');
                    _this.$router.push('/login');
                }).catch(() => {

                });
            },
            //折叠导航栏
            collapse: function () {
                this.collapsed = !this.collapsed;
            },
            showMenu(i, status) {
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
            },
            handleCLassAdd: function () {
                this.isClassEditShow = true;
            },
            addClassOnSubmit: function () {
                alert("a");
            }
        },
        mounted() {
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.sysUserName = user.name || '';
                this.sysUserAvatar = user.avatar || '';
            }
        }
    }

</script>

<style lang="scss">
    @import "../styles/global";

    .menu {
        background: #eef1f6;
        position: relative;
        z-index: 3;
        @extend .transition;
        .user-logo {
            height: 100px;
            background: #20a0ff;
            height: 60px;
            color: #fff;
            text-align: center;
            line-height: 60px;
            font-size: 20px;
            overflow: hidden;
        }
    }

    .el-menu-vertical-demo {
        width: 100% !important;
    }

    .menu-left-collapse {
        width: 60px;
    }

    section.region {
        height: 100%;
        background: #fff;
        @extend .transition;
    }

    .menu-head {
        height: 60px;
        line-height: 60px;
        background: $normal-blue;
        color: #fff;
        position: relative;
        z-index: 1;
        border-left: 1px solid #f5f5f5;
        @extend .shadow;
        .userinfo {
            text-align: right;
            padding-right: 35px;
            float: right;
            .userinfo-inner {
                cursor: pointer;
                color: #fff;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    margin: 10px 0px 10px 10px;
                    float: right;
                }
            }
        }
        .tools-ellipsis {
            padding: 0px 23px;
            width: 60px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
            @extend .transition;
        }
        .tools-ellipsis:hover {
            background: rgba(0, 0, 0, .3);
        }
    }

    .content-container {
        padding: 20px;
        .breadcrumb-container {
            //margin-bottom: 15px;
            .title {
                width: 200px;
                float: left;
                color: #475669;
            }
            .breadcrumb-inner {
                float: right;
            }
        }
        .content-wrapper {
            background-color: #fff;
            box-sizing: border-box;
        }
    }


</style>