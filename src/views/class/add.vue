<template>
    <div>
        <el-form :model="classInfoModel" :rules="rules" label-width="80px" ref="form">
            <el-form-item label="名称" prop="name">
                <el-input v-model="classInfoModel.name" placeholder="栏目名称"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="classInfoModel.ClassDesc" type="text" placeholder="栏目描述"></el-input>
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
                        <el-select size="mini" v-model="scope.row.type" placeholder="字段类型">
                            <el-option :value="item" v-for="item in getEnum()['attributeType']">{{item}}</el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="字段长度" prop="length">
                    <template slot-scope="scope">
                        <el-input size="mini" name='length' v-model="scope.row.length"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="允许为空" width="160" prop="allowNull">
                    <template scope="scope">
                        <el-radio v-model="scope.row.allowNull" label="true">是</el-radio>
                        <el-radio v-model="scope.row.allowNull" label="false">否</el-radio>
                    </template>
                </el-table-column>
                <el-table-column label="默认值" prop="defaultValue">
                    <template slot-scope="scope">
                        <el-input size="mini" name='defaultValue' v-model="scope.row.defaultValue"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <el-form-item>
                <el-button @click="addProps()" size="small" type="primary">添加属性</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    import utils from '../../utils';
    import {createClass} from "../../api/api";

    export default {
        data() {
            let validateAttribute = function () {
                console.log(arguments);
            };
            return {
                isClassEditShow: false,
                attrDefault: {
                    belongsId: "",
                    name: "",
                    type: "STRING",
                    length: "50",
                    allowNull: "true",
                    defaultValue: ""
                },
                classInfoModel: {
                    name: "默认",
                    ClassDesc: "默认",
                    parentId: "默认",
                    attributes: [{
                        belongsId: "1",
                        name: "1",
                        type: "STRING",
                        length: "50",
                        allowNull: "true",
                        defaultValue: ""
                    }, {
                        belongsId: "2",
                        name: "2",
                        type: "STRING",
                        length: "150",
                        allowNull: "false",
                        defaultValue: ""
                    }]
                },
                rules: {
                    name: {required: true, message: '请输入栏目名称', trigger: 'blur'},
                    attributes: {validator: validateAttribute, trigger: "blur"}
                }
            }
        },
        methods: {
            ...mapGetters([
                "getEnum"
            ]),
            ...mapActions([
                "updateAttribute"
            ]),
            addProps: function () {
                console.log(this.classInfoModel.attributes);
                console.log(this.attrDefault);
                this.classInfoModel.attributes.push(Object.assign({}, this.attrDefault));
            },
            submit: function (callback) {
                this.$refs.form.validate((valid) => {
                   if(valid){
                       createClass(this.classInfoModel).then(callback);
                   }
                });
            }
        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    .dialog-footer {
        text-align: right;
    }
</style>