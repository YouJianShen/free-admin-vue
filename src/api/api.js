import axios from "axios";

let base = "";

export const requestLogin = (params) => axios.post(`${base}/login`, params).then((res) => res.data);

export const getUserList = (params) => axios.get(`${base}/user/list`, {params: params});

export const getUserListPage = (params) => axios.get(`${base}/user/listpage`, {params: params});

export const removeUser = (params) => axios.get(`${base}/user/remove`, {params: params});

export const batchRemoveUser = (params) => axios.get(`${base}/user/batchremove`, {params: params});

export const editUser = (params) => axios.get(`${base}/user/edit`, {params: params});

export const addUser = (params) => axios.get(`${base}/user/add`, {params: params});

export const testAxios = (params) => axios.get(`${base}/test`, {params: params});