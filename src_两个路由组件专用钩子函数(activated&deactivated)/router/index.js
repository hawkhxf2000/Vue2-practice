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
                            component: MessageContent,
                            //props的第一种写法，作为对象，该对象中的所有k-v都会以props的形式传给MessageContent组件,但只能写死，不能改变
                            // props:{id:001,title:message1}

                            //props的第二种写法,值为boolean值。若boolean为真，就会把该路由组建收到的所有params参数，以props的形式传给MessageContent组件
                            props:true

                            //props的第三种写法，值为函数,可以传递query或params的参数
                            // props($route){
                            //     return {id:$route.query.id, title:$route.query.title}
                            // }
                        },
                    ]
                },
            ]
        },
    ]
})

