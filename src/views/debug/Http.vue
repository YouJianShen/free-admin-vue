<template>
    <el-row>
        <el-form label-width="80px" v-model="params">
            <div class="toolbar">
                <el-form-item label="请求：" class="form-last-item">
                    <el-input v-model="url" placeholder="输入请求后台地址" class="input-with-select">
                        <el-select v-model="params.method" slot="prepend">
                            <el-option label="GET" value="GET">GET</el-option>
                            <el-option label="POST" value="POST">POST</el-option>
                        </el-select>
                        <el-button slot="append" type="primary" @click="doSubmit()">发送</el-button>
                    </el-input>
                </el-form-item>
            </div>

            <el-row style="padding:10px">
                <el-col width="50">
                    <el-form-item class="form-last-item" label="参数："></el-form-item>
                </el-col>
                <el-col :span="24" style="padding:0 20px 20px 20px">
                    <el-table size="small" :data="params.data">
                        <el-table-column label="序号" type="index" width="120"></el-table-column>
                        <el-table-column label="名称">
                            <template scope="scope">
                                <el-input size="medium" v-model="scope.row.name"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="属性值">
                            <template scope="scope">
                                <el-input size="medium" v-model="scope.row.value"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button size="mini" class="el-icon-delete"
                                           @click="deleteParam(scope.row)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-button type="primary" size="medium" @click="addParam()" style="float:right;margin-right:20px">新增属性
                </el-button>
            </el-row>

        </el-form>
    </el-row>

</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                url: "http://",
                params: {
                    method: "GET",
                    data: [{
                        name: "",
                        value: ""
                    }]
                }
            }
        },
        methods: {
            addParam: function () {
                this.params.data.push({
                    name: "",
                    value: ""
                });
            },
            deleteParam: function (row) {
                var index = this.params.data.indexOf(row);
                if (index > -1) {
                    this.params.data.splice(index, 1);
                }
            },
            doSubmit: function () {
                var params = {};
                this.params.data.forEach((value) => {
                    params[value.name] = value.value;
                });
                if (this.params.method === "GET") {
                    axios.get(this.url, {
                        params: params
                    })
                } else {
                    axios.post(this.url, {
                        params: params
                    })
                }
            }
        },
        mounted() {
        }
    }

</script>

<style lang="scss">


    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

    .el-input-group__prepend .el-select .el-input {
        width: 84px;
    }

    .el-table {
        /*text-align: center;*/
    }

    .el-table .el-input {
        text-align: left;
        width: 160px;
    }
</style>