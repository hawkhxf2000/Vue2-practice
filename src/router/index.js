//该文件专门用于创建整个应用的路由器

import VueRouter from "vue-router";

//引入组件
import About from "@/Pages/About";
import Home from "@/Pages/Home";
import News from "@/Pages/News";
import Message from "@/Pages/Message";
import MessageContent from "@/Pages/MessageContent";

//创建路由器
export default new VueRouter({
    routes: [
        {
            name: 'about',
            path: '/about',
            component: About
        },
        {
            name: 'home',
            path: '/home',
            component: Home,
            children: [
                {path: 'news', component: News},
                {
                    name: 'message',
                    path: 'message',
                    component: Message,
                    children: [
                        {
                            name: 'content',
                            // path: 'message-content',
                            path:'message-content/:id/:title',  //使用params传参时需要用占位符:id,:title占位
                            component: MessageContent
                        },
                    ]
                },
            ]
        },
    ]
})

