<template>
    <section class="fill" style="background-color: #f5f5f5;">
        <section id="phone_from">
            <h2 class="title text-center">手机号码归属地址查询</h2>

            <el-form ref="form" label-width="120px" style="padding:40px 10px" :model="formData" :rules="rules">
                <el-form-item label="手机号码:" prop="phone">
                    <el-input @keypress="filterNumber" placeholder="请输入查询的手机号码" style="width:400px"
                              v-model="formData.phone"></el-input>
                    <el-button style="margin-left:10px" type="primary" @click="search">查询</el-button>
                </el-form-item>

                <el-form-item label="查询结果:" style="margin-top:40px;">
                    <el-input type="textarea" style="width:400px;" v-model="from" readonly></el-input>
                </el-form-item>
            </el-form>
        </section>
    </section>
</template>

<script>
    import utils from "../common/js/utils";
    import {getPhoneFrom} from "../api/api";

    function isvalidPhone(value) {
        return utils.regex.TELEPHONE_NUM.test(value);
    }

    var validPhone = (rule, value, callback) => {
        if (!value) {
            callback(new Error('请输入电话号码'))
        } else if (!isvalidPhone(value)) {
            callback(new Error('请输入正确的11位手机号码'))
        } else {
            callback()
        }
    }

    export default {
        name: "PhoneFrom",
        data() {
            return {
                formData: {
                    phone: ""
                },
                from: "",
                rules: {
                    phone: [{
                        required: true, message: '请输入正确的电话号码', trigger: 'blur', validator: validPhone
                    }]
                },

                test: []
            }
        },
        methods: {
            search: function () {
                var _this = this;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        console.log(_this.formData.phone);
                        getPhoneFrom({phone: _this.formData.phone}).then((result) => {
                            utils.resolveResult(_this.$message, result, (data) => {
                                _this.from = "运营商：" + data.carrier + "\n归属地：" + data.provinceName + data.cityName;
                            });
                        });
                    }
                });
            },
            filterNumber: function () {
            }
        },
        mounted() {
        },
        created: function () {
            var _this = this;
        }
    }
</script>

<style scoped>
    #phone_from {
        background-color: #fff;
        /*border: 1px solid #ccc;*/
        border: 2px solid rgb(102, 153, 204);
        border-radius: 5px;
        width: 700px;
        height: 400px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        box-shadow: 0 0 5px rgba(0, 0, 0, .1) inset;
    }
</style>