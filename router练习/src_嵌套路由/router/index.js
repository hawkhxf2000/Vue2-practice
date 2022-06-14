//该文件专门用于创建整个应用的路由器

import VueRouter from "vue-router";

//引入组件
import About from "@/Pages/About";
import Home from "@/Pages/Home";
import News from "@/Pages/News";
import Message from "@/Pages/Message";

//创建路由器
export default new VueRouter({
    routes: [
        {
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home,
            children: [
                {path: 'news', component: News},
                {path: 'message', component: Message},
            ]
        },
    ]
})

