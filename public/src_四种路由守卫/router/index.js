//该文件专门用于创建整个应用的路由器

import VueRouter from "vue-router";

//引入组件
import About from "@/Pages/About";
import Home from "@/Pages/Home";
import News from "@/Pages/News";
import Message from "@/Pages/Message";
import MessageContent from "@/Pages/MessageContent";

//创建路由器
const router = new VueRouter({
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
                {
                    name: 'news',
                    path: 'news',
                    component: News,
                    meta: {isAuth: true},
                    //独享路由守卫
                    beforeEnter: (to,from,next)=>{
                        if(localStorage.getItem('school') === 'vanier'){
                            next()
                        }else{
                            alert("You don't have authority to check this item")
                        }
                    }
                },
                {
                    name: 'message',
                    path: 'message',
                    component: Message,
                    meta: {isAuth: true}, //使用to对象中的meta属性储存一些我们想要添加的内容，这里使用isAuth来标记此组件需要身份校验
                    children: [
                        {
                            name: 'content',
                            // path: 'message-content',
                            path: 'message-content/:id/:title',  //使用params传参时需要用占位符:id,:title占位
                            component: MessageContent,
                            //props的第一种写法，作为对象，该对象中的所有k-v都会以props的形式传给MessageContent组件,但只能写死，不能改变
                            // props:{id:001,title:message1}

                            //props的第二种写法,值为boolean值。若boolean为真，就会把该路由组建收到的所有params参数，以props的形式传给MessageContent组件
                            props: true

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

//前置全局路由守卫，在初始化和每次路由切换之前执行
router.beforeEach((to, from, next) => {
    if(to.meta.isAuth === true){  //利用meta中的isAuth属性来判断组件是否需要进行授权认证
        if(localStorage.getItem('school') === 'vanier'){
            next()
        }else{
            alert("You don't have authority to check this item")
        }
    }else{
        next()
    }
})

//后置全局路由守卫，在初始化时和每次路由切换后执行
router.afterEach((to,from)=>{
    document.title = to.name  //切换路由后将窗口的title改为当前路由的名字
})

export default router

