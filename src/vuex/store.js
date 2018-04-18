import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import {getEnum} from "../api/api";

Vue.use(Vuex);

// 应用初始状态
const state = {
    count: 10,
    _enum: {
        attributeType: null
    },
    class: {}
};

// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++;
    },
    DECREMENT(state) {
        state.count--;
    },
    UPDATE_ATTRIBUTE_TYPE(state) {
        getEnum({
            name: "AttributeType"
        }).then(function (res) {
            if (res.status == 200) {
                state._enum.attributeType = res.data;
            }
        });
    }
};

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
});
