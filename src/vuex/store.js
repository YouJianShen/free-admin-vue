import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import api from "../api/api";

Vue.use(Vuex);

// 应用初始状态
const state = {
    count: 10,
    enum: {
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
        api.getEnum({
            name: "AttributeType"
        }).then(function (data) {
            console.log(data);
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
