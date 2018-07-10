import axios from "axios";


var host = window.location.origin;
var http = host + "/"

export const requestLogin = (params) => axios.post(`${http}/login`, params).then((res) => res.data);

export const getUserList = (params) => axios.get(`${http}/user/list`, {params: params});

export const getUserListPage = (params) => axios.get(`${http}/user/listpage`, {params: params});

export const removeUser = (params) => axios.get(`${http}/user/remove`, {params: params});

export const batchRemoveUser = (params) => axios.get(`${http}/user/batchremove`, {params: params});

export const editUser = (params) => axios.get(`${http}/user/edit`, {params: params});

export const addUser = (params) => axios.get(`${http}/user/add`, {params: params});

export const testAxios = (params) => axios.get(`${http}/test`, {params: params});

// 获取枚举类型
export const getEnum = (params) => axios.get(`${http}/enum`, {params: params});

// 添加栏目
export const createClass = (params) => axios.post(`${http}/createClass`, {params: params});

//手机号码归属地址查询
export const getPhoneFrom = (params) => axios.get(`${http}/phone/search`, {params: params});

