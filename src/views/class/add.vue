<template>
    <el-row>
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
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="medium" @click.native="isClassEditShow = false;">取消</el-button>
            <el-button size="medium" type="primary">提交</el-button>
        </div>
    </el-row>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        data(){
            return {
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
                classFormRules: {
                    name: {required: true, message: '请输入栏目名称', trigger: 'blur'}
                }
            }
        },
        methods: {
            ...mapGetters([
                "getEnum"
            ]),
            ...mapActions([
                "updateAttribute"
            ])
        },
        mounted() {

        }
    }
</script>

<style lang="sass">

</style>