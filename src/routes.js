import Login from "./views/Login.vue";
import NotFound from "./views/404.vue";
import Home from "./views/Home.vue";
import Main from "./views/Main.vue";
import Table from "./views/nav1/Table.vue";
import Form from "./views/nav1/Form.vue";
import user from "./views/nav1/user.vue";
import Page4 from "./views/nav2/Page4.vue";
import Page5 from "./views/nav2/Page5.vue";
import Page6 from "./views/nav3/Page6.vue";
import echarts from "./views/charts/echarts.vue";
import Http from "./views/debug/Http.vue";
import PhoneFrom from "./views/PhoneFrom";
// import cesium_demo from "./views/cesium/cesium-demo.vue";

let routes = [
    {
        path: "/login",
        component: Login,
        name: "",
        hidden: true
    },
    {
        path: "/404",
        component: NotFound,
        name: "",
        hidden: true
    },
    {
        path: "/phone/analysis",
        component: PhoneFrom,
        name: "",
        hidden: true
    },
    // { path: '/main', component: Main },
    {
        path: "/",
        component: Home,
        name: "导航一",
        iconCls: "fa el-icon-message", // 图标样式class
        children: [
            {path: "/main", component: Main, name: "主页", hidden: true},
            {path: "/table", component: Table, name: "Table"},
            {path: "/form", component: Form, name: "Form"},
            {path: "/user", component: user, name: "列表"}
        ]
    },
    {
        path: "/",
        component: Home,
        name: "导航二",
        iconCls: "fa fa-id-card-o",
        children: [
            {path: "/page4", component: Page4, name: "页面4"},
            {path: "/page5", component: Page5, name: "页面5"}
        ]
    },
    {
        path: "/",
        component: Home,
        name: "",
        iconCls: "fa fa-address-card",
        leaf: true, // 只有一个节点
        children: [
            {path: "/page6", component: Page6, name: "导航三"}
        ]
    },
    {
        path: "/",
        component: Home,
        name: "Charts",
        iconCls: "fa fa-bar-chart",
        children: [
            {path: "/echarts", component: echarts, name: "echarts"}
        ]
    },
    {
        path: "/",
        component: Home,
        name: "调试",
        iconCls: "fa fa-config",
        children: [
            {path: "/http", component: Http, name: "接口调试"}
        ]
    },
    // {
    //     path:"/",
    //     component: Home,
    //     name:"Cesium",
    //     iconCls:"fa fa-message",
    //     leaf: true,
    //     children:[
    //         {path:"/cesium-demo",component: cesium_demo, name: "Cesium"}
    //     ]
    // },
    {
        path: "*",
        hidden: true,
        redirect: {path: "/404"}
    }
];

export default routes;
