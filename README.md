# Vue项目知识

## 安装Vue 2 脚手架并生成项目

- 安装脚手架：

~~~vue
npm install -g @vue/cli
~~~

- 升级依赖包

~~~
npm update -g @vue/cli
~~~

- 创建项目

~~~
vue create XXX(项目名)
~~~

在创建过程中可能会因为window10的电子签名规则导致script脚本无法运行，需要到powershell里面去改签名规则

~~~
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned CurrentUser
~~~

- 启动脚手架
  进入项目文件夹，在终端输入：

~~~
npm run serve
~~~

## 关闭Eslint警告信息

在vue.config.js中加入下面语句

~~~vue.config.js
module.exports = {
    lintOnSave: false
}
~~~

## ref标签

在标签原生DOM上使用ref替代id标签，可以直接在组件js中使用this.$refs.ref名来获得原生DOM，如果在子组件上使用ref,可以获得子组件

~~~html
<h1 ref="title">学习ref</h1>
<School ref="compSchool"></School>
~~~

~~~js
console.log(this.$refs.title, this.$refs.compSchool)
~~~

## 利用组件的props传参（父组件向子组件传值）

父组件

~~~vue

<Student name="张三" sex="男" age="18"/>
~~~

子组件

~~~vue
export default {
......
props:['name','sex','age']
}
~~~

### 父组件中传值方法：

在传递非字符串的参数时，需要使用v-bind或:来绑定对应变量，从而使其成为JS表达式而非字符串。比如：

~~~vue

<Student name='张三' sex='男' :age='18'/>
~~~

另外也可以用对象形式一次性传递多个参数，如上面的三个参数可以改为：
父组件

~~~vue

<Student v-bind="student"/>

<script>
export default {
  data() {
    return {
      student: {
        name: '张三',
        sex: '男',
        age: 18
      }
    }
  }
}
</script>
~~~

### 三种props的接收方式

- 简单模式

~~~
props:['name','sex','age']  //简单接收
~~~

- 接收数据同时进行类型限制

~~~
props:{
    name:String,
    sex: String,
    age: Number
  }
~~~

- 最完整模式

~~~
  props:{
    name:{
      type: String,  //限定类型
      required: true  //限定必要性
    },
    age:{
      type: Number,
      default: 20   //设定默认值，不能跟required同时使用
    },
    sex:{
      type: String,
      default: '男'
    }
  }
~~~

如果内部也有一个与props内变量名相同的变量，系统会报错，而且Props传入的数据优先级更高，如果有可能会修改传入数据，需要在子组件内重新声明一个
不同名变量，再将props传入的数据赋值给新变量

## mixin混合（复用配置）

当多个组件具有同样的配置(方法，数据，计算属性等)时，可以使用mixin将同样的配置抽离出来，在多个组件应用
mixin.js

~~~
export const mixin={
    methods:{
        showName(){
            alert(this.name)
        }
    },
    data(){
        return{
            x:100,
            y:200
        }
    }
}
~~~

组件中：(mixins配置项即使只有一个mixin配置项也必须用数组形式)

~~~vue
import {mixin} from "@/mixin";

export default {
name: "School",
......
mixins: [mixin]
}
~~~

如果mixin中有变量与组件中的变量名相同，数据以组件中的数据为准
如果mixin与组件都有相同的生命周期钩子函数，则两个钩子函数都执行

### 全局引入

在main.js中引入

~~~js
import Vue from 'vue'
import App from './App.vue'
import {mixin} from "@/mixin";

Vue.config.productionTip = false
Vue.mixin(mixin)
new Vue({
    render: h => h(App),
}).$mount('#app')
~~~

## 插件plugin

插件是用来增强Vue的，相当于给Vue增加一些预先定义的方法。
构建插件的方法：
plugins.js

~~~js
export default {
    install(Vue) {
        console.log(Vue) //形参Vue传递一个Vue的构造函数

        //全局过滤器，返回Value值前4位
        Vue.filter('mySlice', function (value) {
            return value.slice(0, 4)
        })

        //定义全局指令
        Vue.directives('fbind', {
                bind(el, binding) {
                    el.value = binding.value
                },
                inserted(el) {
                    el.focus()
                },
                update(el, binding) {
                    el.value = binding.value
                    el.focus()
                }
            }
        )

        //定义全局mixin
        Vue.mixin({
            showName() {
                alert(this.name)
            }
        })

        //在原型对象上绑定方法
        Vue.prototype.hello = () => {
            alert("你好！")
        }
    }
}
~~~

引入插件：
main.js

~~~js
......
import plugins from "@/plugins"

......
Vue.use(plugins)
~~~

## 利用组件的自定义事件进行子组件向父组件传值

### 第一种方法： 通过父组件给子组件绑定一个自定义事件，实现子组件向父组件传值

template部分

~~~vue

<Student @getStudentName="getStudentName"/>
~~~

javascript部分

~~~vue
methods:{
getStudentName(name){
this.studentName = name
}
},
~~~

子组件部分：
template部分：

~~~vue

<button @click="sendStudentName">将学生名字传递给App</button>
~~~

javascript部分

~~~vue
methods:{
sendStudentName(){
this.$emit('getStudentName',this.name)
}
}
~~~

### 第二种方法： 直接拿到子组件实例，使用$on在父组件挂载时在子组件上绑定自定义事件，使用更加灵活

template部分

~~~html

<Student ref="student"/>
~~~

javascript部分

~~~vue
methods:{
getStudentName(name){
this.studentName = name
}
},
mounted() {
// this.$refs.student.$on('getStudentName',this.getStudentName)  //这种方法更为灵活，可以实现很多功能，比如设置定时器，设置延迟挂载等
this.$refs.student.$once('getStudentName',this.getStudentName) //自定义事件仅执行一次
}

~~~

子组件部分：
template部分：

~~~html

<button @click="sendStudentName">将学生名字传递给App</button>
~~~

javascript部分

~~~js
methods:{
    sendStudentName()
    {
        this.$emit('getStudentName', this.name)
    }
}
~~~

传递多个参数：
第一种方法： 在$emit事件中写相应数据，在父组件的方法中对应接收形参,

~~~vue
//子组件端
methods:{
sendStudentName(){
this.$emit('getStudentName',this.name,666,777,888)
}
}
~~~

~~~vue
//父组件端
method:{
methods:{
getStudentName(name,a,b,c){  //a,b,c收到的数据即为传过来的666,777,888
this.studentName = name,
}
},
~~~

这里也可以使用ES6的扩展符方法简化

~~~js
getStudentName(name, ...)
{  //...会接收传过来的数据并形成一个数组[666,777,888]
~~~

### 自定义事件解绑

在子组件中使用$off指令对事件进行解绑

~~~vue
this.$off('getStudentName',this.getStudentName)
~~~

也可以解绑所有自定义事件

~~~vue
this.$off()
~~~

或者暴力的使用$destroy方法直接摧毁子组件

~~~vue
this.$destroy()
~~~

## 全局事件总线(任意组件间通讯)

- 在main.js安装全局事件总线

~~~vue
new Vue({
render: h => h(App),
beforeCreate() {
Vue.prototype.$bus = this  //安装全局事件总线
}
}).$mount('#app')
~~~

- 在组件间传递数据
  发送方代码：

~~~vue
methods:{
sendStudentName(){
this.$bus.$emit('hello',666)
}
}
~~~

接收方代码：

~~~vue
mounted() {
this.$bus.$on('hello',(data)=>{
console.log('我是school组件,我收到了数据',data)
})
}
~~~

在接收组件被销毁之前最好解绑自定义事件，释放$bus的资源

~~~vue
//在组件销毁之前解绑hello事件
beforeDestroy() {
this.$bus.$off('hello')
}
~~~

## $nextTick()钩子函数

$nextTIck钩子函数可以将函数中的回调延迟到下次DOM更新循环之后再执行

~~~html
  <input type="text" v-model:value="someWords" ref="input">
<button @click="addWord">点我添加一些文字</button>
~~~

~~~js
data()
{
    return {
        someWords = '',
        isShow: true
    }
}
methods: {
    addWord()
    {
        if (this.isShow === true) {
            this.someWords = '我将获取焦点'
            // this.isShow = !this.isShow
        } else {
            this.isShow = true
        }
        // this.$refs.input.focus() //如果不使用$nextTick(),输入框无法马上获得焦点
        this.$nextTick(() => {
            this.$refs.input.focus()
        })
    }
}
~~~

## 动画与过渡效果

### 单个元素实现动画效果

在模板内使用transition标签包裹要实现动画效果的部分

~~~html
<!--name定义css类选择器中的头部（第一个单词，如不设置name则默认为V-开头）-->
<!--appear定义DOM加载时是否呈现动画效果，写appear代表开启，不写代表关闭-->
<transition name="fade" appear>
    <h1 v-show="isShow">{{ msg }}</h1>
</transition>
~~~

- 使用动画效果

~~~css
/*这里的fade与模板中的transition标签的name属性对应*/
.fade-enter-active {
    animation: slideInLeft-enter 0.5s linear;
}

.fade-leave-active {
    animation: slideInLeft-enter 0.5s reverse;
}

@keyframes slideInLeft-enter {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0px);
    }
}
~~~

- 使用过渡效果

~~~css
h1 {
    background-color: orange;
    /*第一种写法，谁要呈现动态效果就在谁身上加过渡效果*/
    /*transition: 0.5s linear;*/
}

/*进入的起点，退出的终点。*/
.fade-enter, .fade-leave-to {
    transform: translateX(-100%);
}

/*第二种写法：利用-active类来实现过渡效果*/
.fade-enter-active, .fade-leave-active {
    transition: 0.5s linear;

}

/*进入的终点，退出的起点*/
.fade-enter-to, .fade-leave {
    transform: translateX(0);
}
~~~

### 多个元素实现动画效果

使用<transition-group>标签来实现多个元素的动画效果，注意在元素中需要加入key属性来区分元素的不同

~~~html

<transition-group name="fade" appear>
    <h1 v-show="isShow" key="1">{{ msg }}</h1>
    <h1 v-show="isShow" key="2">Vanier</h1>
</transition-group>
~~~

### 集成第三方动画库（animate.css)

- 安装animate.css

~~~
npm install animate.css --save
~~~

- 导入animate.css  
  直接在需要使用的组件中导入

~~~js
<script>
    import 'animate.css'
~~~

- 在模板中直接使用animate.css的类
- ~~~html
  <!-- 配置三个属性:name，enter-active-class与leave-active-class-->
  <transition
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__bounceInDown"
        leave-active-class="animate__bounceOutUp">
      <h1 v-show="isShow" key="1">{{ msg }}</h1>
    </transition>
  ~~~

## 插槽

组件调用时可能需要在复用同一个子组件的结构时需要显示一些不同的内容. 而插槽就是在子组件设置一个空位，让组件调用者可以在调用时插入一些定制化的结构（先挖坑再填）

### 默认插槽

子组件端

~~~vue
<!--Category子组件-->
<template>
  <div class="container">
    <h3>{{title}}分类</h3>
    <!--  插槽中可以设置默认值,如果组件调用者没有传入结构,则显示默认值-->
    <slot>我是默认值</slot>
  </div>
</template>
~~~

组件调用端

~~~vue
<!--App组件-->
<Category title="美食">
<!--将img插入插槽中,在子组件内显示-->
<img src="https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg" alt="">
</Category>
~~~

### 具名插槽

当一个子组件中可能存在多个插槽时,需要对插槽命名以便于在组件调用方准确插入适当的结构  
子组件端

~~~vue

<template>
  <div class="container">
    <h3>{{title}}分类</h3>
    <!--  在slot中使用name属性标识-->
    <slot name="center">我是默认值</slot>
    <slot name="footer"></slot>
  </div>
</template>
~~~

组件调用端

~~~vue

<Category title="美食">
<!--在组件调用端使用v-slot来对接同名的slot,将内容插入对应的slot-->
<template v-slot:center>
  <img src="https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg" alt="">
</template>

<template v-slot:footer>
  <a href="">所需食材</a>
  <a href="">烹饪流程</a>
</template>
</Category>
~~~

### 作用域插槽

当数据保存在子组件时，组件调用者无法使用子组件的数据来渲染页面，这时需要使用作用域插槽将数据传递到组件调用方来进行渲染  
子组件端

~~~vue

<template>
  <div class="container">
    <h3>{{title}}分类</h3>
    <slot name="center" :youxis="games">我是默认值</slot>
    <slot name="footer" :movies="movies"></slot>
  </div>
</template>
~~~

~~~vue
data(){
return{
games:['古墓丽影','半条命','最终幻想7','无主之地'],
movies:['生化危机','壮志凌云']
}
}
~~~

组件调用端

~~~vue

<Category ref="games" title="游戏">
<!--      slotProps是一个对象，里面包含了在子组件中绑定的所有数据，我们需要从中提取games这个属性才能获得这个部分相对应的数据，这个名字需要与子组件被绑定的属性名（youxis）一致-->
<template v-slot:center="slotProps">
  <ul>
    <li v-for="(game, index) in slotProps.youxis" :key="index">{{ game }}</li>
  </ul>
</template>
</Category>

<Category title="影视">
<template v-slot:center>
  <video controls src="https://youtu.be/uIdjcDTc9Vk"/>
</template>

<template ref="movies" v-slot:footer="slotProps">
  <ul>
    <li v-for="(movie, index) in slotProps.movies" :key="index">{{ movie }}</li>
  </ul>
</template>
</Category>
~~~

## Vuex

###安装Vuex

~~~
npm install vuex@3 --save
~~~

### 搭建环境

在src文件夹下创建一个store文件夹，在其中创建index.js文件

~~~js
/该文件用于创建Vuex中最为核心的Store
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
//应用Vuex插件
Vue.use(Vuex)

//定义actions,用于相应组件中的动作
const actions = {}

//定义mutations, 用于操作数据(state)
const mutations = {}

//定义state,用于存储数据
const state = {}

export default new Vuex.Store({
    //实际上使用的键值对同名时的简写形式
    actions,
    mutations,
    state
})
~~~

在main.js文件中引入store

~~~js
import Store from "@/store";

......
new Vue({
    render: h => h(App),
    Store,
    beforeCreate() {
        Vue.prototype.$bus = this  //安装全局事件总线
    }
~~~

### 应用Vuex模式

组件端

~~~html

<template>
    ......
    <h1>当前求和为：{{ $store.state.sum }}</h1>
    <select v-model="number">
        <option :value="1">1</option>
        <option :value="2">2</option>
        <option :value="3">3</option>
    </select>
    <button @click="add">+</button>
    ......
</template>
~~~

~~~js
methods: {
    add()
    {
        //使用dispatch将请求转发到Vuex
        this.$store.dispatch('add', this.number)
    }
}
~~~

~~~js
// store/index.js中

//接收组件传来的请求，并转发给mutations端，类似controller层
const actions = {
    add(context, value) {
        context.commit('ADD', value) //在这里使用全大写，以区分Mutation中的方法与actions中的方法
    }
}

//接收actions请求，并对数据进行业务逻辑处理，类似Service层
const mutations = {
    ADD(state, value) {
        state.sum += value
    }
}

//保存业务数据，类似Entity类
const state = {
    sum: 0 //当前的和
}
~~~

当actions不引入外部数据，仅仅是转发请求时，可以让组件跳过actions用commit指令直接向mutations发送请求

~~~js
add()
{
    //标准流程
    // this.$store.dispatch('add', this.number)
    //简化流程： 当actions并不引入任何外部数据，仅仅是转发请求的时候，可以直接让组件跳过Actions将请求发送给mutations，注意此时的方法需要调用mutations中的方法
    this.$store.commit('ADD', this.number)
}
~~~

### getters方法

getters方法相当于Vuex中的计算属性，可以被所有组件调用  
组件中

~~~html
<h1>放大十倍后:{{$store.getters.tenTimes}}</h1>
~~~

store/index.js中

~~~js
const getters = {
    tenTimes(state) {
        return state.sum * 10
    }
}
......
export default new Vuex.Store({
    //实际上使用的键值对同名时的简写形式
    actions,
    mutations,
    state,
    getters  //暴露出去让其他组件使用
}
~~~

### mapState 与mapGetters

mapState从机理上是自动生成对应的计算属性函数

~~~js
//index.js中
const state = {
    sum: 0, //当前的和
    school: 'vanier',
    course: 'cs'
}
~~~

~~~js
//组件中
import {mapState} from 'vuex'  //引入mapState方法

//在计算属性中定义mapState的内容
computed:{
    //对象写法
...
    mapState({sum: 'sum', school: 'school', course: 'course'})
    //数组形式
    //     ...mapState(['sum','school','course'])
}
~~~

mapGetters与mapState用法一样

### mapMutations与mapActions

这两个方法与前两个用法类似，只是位置放置在methods内

~~~js
 methods: {
    // add() {
    //   //标准流程
    //   // this.$store.dispatch('add', this.number)
    //   //简化流程： 当actions并不引入任何外部数据，仅仅是转发请求的时候，可以直接让组件跳过Actions将请求发送给mutations，注意此时的方法需要调用mutations中的方法
    //   this.$store.commit('ADD',this.number)
    // },
    // sub() {
    //   this.$store.dispatch('sub', this.number)
    // },

    //借助mapMutations生成对应的方法，在方法中会调用commit向Mutations直接发起请求
    //对象写法
...
    mapMutations({add: 'ADD', sub: 'SUB'}),
~~~

需要注意的是，在原始的add方法与sub方法中是需要传递一个参数this.number的，所以在使用mapMutations时需要在模板中传入参数number

~~~html

<button @click="add(number)">+</button>
<button @click="sub(number)">-</button>
~~~

另外mapMutations也有数组写法，但是使用数组写法时组件中的方法名与Mutations中的方法名必须一致

~~~js
//此时组件中的方法名也必须为ADD和SUB，所以最好组件、actions、mutations中的方法名都一致，方便使用
...
mapMutations(['ADD', 'SUB'])
~~~

mapActions的写法与mapMutations一致，会用dispatch方法向actions发起请求

### Vuex模块化

当多个组件的业务逻辑与状态（数据）都在vuex中管理时，可以根据组件或功能等将其分为不同的模块

~~~js
const module1_name = {
    namespaced: true, //开启命名空间，命名空间可以在mapState等方法中使用，减少代码量
    actions: {},
    mutations: {},
    state: {},
    getters: {}
}
const module2_name = {
    namespaced: true,
    actions: {},
    mutations: {},
    state: {},
    getters: {}
}

export default new Vuex.Store({
    modules: {
        module1_name,
        module2_name
    }
})
~~~

使用模块后，调用数据的路径就需要更改如下：

~~~js
this.$store.state.module1_name.sum
~~~

#### 命名空间

命名空间可以用在mapState等方法中，减少代码量

~~~js
//其中'countOptions'即为命名空间，与modules中的键名一致
...
mapState('countOptions', {sum: 'sum', school: 'school', course: 'course'})
...
mapMutations('countOptions', {add: 'ADD', sub: 'SUB', oddAdd: 'ODDADD', intervalAdd: 'INTERVALADD'})
...
mapGetters('countOptions', {tenTimes: 'tenTimes'})
~~~

## Vue-Router

### 安装Vue-Router

因为使用的脚手架是Vue2，所以需要在vue-router后面注明使用Vue-router@3版本，现在默认安装Vue-router4 版本，是与Vue3搭配使用的

~~~
npm i vue-router@3 --save
~~~

### 引入Vue-Router

~~~js
//在main.js中引入路由器
//引入Vue-router
import VueRouter from "vue-router";
//使用路由器
Vue.use(VueRouter)
~~~

### 配置路由器

新建一个文件夹router,在文件夹下新建文件index.js(与Vuex类似)
在index.js中写入：

~~~js
//该文件专门用于创建整个应用的路由器

import VueRouter from "vue-router";

//引入需要进行路由管理的组件
import About from "@/Pages/About";
import Home from "@/Pages/Home";

//创建路由器规则
export default new VueRouter({
    //路由器规则
    routes: [
        {
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home
        },
    ]
})
~~~

### 将路由器规则导入main.js

~~~js
//引入路由器
import router from "@/router";

......
// 将路由器加入Vue配置中
new Vue({
    render: h => h(App),
    router, //加入路由器配置
}).$mount('#app')
~~~

### 在App页面引入路由视图与切换

~~~html
<!--可以在router-link标签中加入样式类或其他参数-->
<router-link to="/home">Home</router-link>
<router-link to="/About">About</router-link>
<!--......此处省略其他结构-->
<!--在需要展示不同页面的位置插入router-view标签-->
<div class="col-xs-6">
    <div class="panel">
        <div class="panel-body">
            <router-view/>
        </div>
    </div>
</div>
~~~

这样就可以在不同标签之间进行切换了，而且在这过程中不需要服务器传递页面，只是在组件间切换。每次切换时切换掉的组件会被销毁

## 嵌套路由

在main.js的相应上一级路由配置项中使用children配置项来定义下一级路由,注意需使用[]数组形式定义配置项

- main.js:

~~~js
 {
    path: '/home',
        component
:
    Home,
        children
:
    [
        {path: 'news', component: News},
        {path: 'message', component: Message},
    ]
}
,
~~~

- 上一级路由父组件中使用router-link和router-view来渲染下一级路由子组件

~~~vue

<template>
  <div>
    <h2>我是Home的内容</h2>
    <ul class="nav nav-tabs">
      <li>
        <router-link class="list-group-item" active-class="active" to="/home/news">news</router-link>
      </li>
      <li>
        <router-link class="list-group-item" active-class="active" to="/home/message">messages</router-link>
      </li>
    </ul>
    <router-view style="margin-top: 20px;"/>
  </div>
</template>
~~~



## 命名路由

命名路由只需要在配置项内增加一个name配置

~~~js
{
    name:'about',
        path
:
    '/about',
        component
:
    About
}
,
~~~

命名路由可以在多级路由下简化路径,另外在面包屑效果中可以作为名字显示
main.js

~~~js
children:[
    {name: 'content', path: 'message-content', component: MessageContent},
]
~~~

组件中

~~~vue

<router-link :to="{
          // path:'/home/message/message-content',  //字符串写法
          name: 'content',
          query:{
            id: message.id,
            title: message.title
          }
        }">{{ message.title }}
</router-link>
~~~
## 路由传参
### query传参

利用vc身上的$route属性将参数传递给子路由组件
main.js

~~~js
  path: 'message',
    component:Message,
    children:[
    {path: 'message-content', component: MessageContent},
]
~~~

父组件中：

~~~vue

<template>
  <div>
    <ul>
      <li v-for="message of messageList" :key="message.id">
        <!--        query字符串传参方法-->
        <!--        <router-link :to="`/home/message/message-content?id=${message.id}&title=${message.title}`">{{ message.title }}</router-link>-->

        <!--   query对象写法     -->
        <router-link :to="{
          path:'/home/message/message-content',
          query:{
            id: message.id,
            title: message.title
          }
        }">{{ message.title }}
        </router-link>
      </li>
    </ul>
    <hr>
    <router-view/>
  </div>
</template>
~~~
- 子路由直接使用$route中的query对象接收参数
~~~vue
  <li>消息编号：{{$route.query.id}}</li>
<li>消息标题：{{$route.query.title}}</li>
~~~

### params传参
params传参与query类似，但是使用路径符'/'代替参数列表?...&...
- 在main.js中需要使用占位符
~~~js
 {
    name: 'content',
    // path: 'message-content',
    path:'message-content/:id/:title',  //使用params传参时需要用占位符:id,:title占位
    component: MessageContent
},
~~~
- 父组件中
~~~vue
<router-link :to="`/home/message/message-content/${message.id}/${message.title}`">{{ message.title }}</router-link>
~~~
也可使用对象写法
~~~vue
  <router-link :to="{
          name: 'content',               //使用Params传参必须使用命名路由方法
          params:{                       //将此处改为params即为params传参
            id: message.id,
            title: message.title
          }
        }">{{ message.title }}</router-link>
~~~
- 子组件中用params接收数据
~~~vue
 <li>消息编号：{{$route.params.id}}</li>
    <li>消息标题：{{$route.params.title}}</li>
~~~

### props传参
在index.js的路由配置中使用props配置项传递参数
- index.js
~~~js
{
    name: 'content',
    // path: 'message-content',
    path:'message-content/:id/:title',  //使用params传参时需要用占位符:id,:title占位
    component: MessageContent, 
    //props有三种写法
    //props的第一种写法，作为对象，该对象中的所有k-v都会以props的形式传给MessageContent组件,但只能写死，不能改变
    // props:{id:001,title:message1}

    //props的第二种写法,值为boolean值。若boolean为真，就会把该路由组建收到的所有params参数，以props的形式传给MessageContent组件
    // props:true

    //props的第三种写法，值为函数,可以传递query或params的参数
    props($route){
        return {id:$route.params.id, title:$route.params.title}
    }
}
~~~
- 组件中：
~~~vue
export default {
  name: "MessageContent",
  props:['id','title']
}
~~~
## 编程式路由导航
利用$router中的方法可以对路由实现编程式导航，可以实现一些特殊需求，比如延迟几秒显示等
组件中：
~~~vue
<button @click="pushShow(message)">push查看</button>
<button @click="replaceShow(message)">replace查看</button>
<!--------------------------------------------------------------------------->
 methods: {
    pushShow(message) {
      this.$router.push({  //push是$router上的一个方法，将路由记录以压栈形式进行储存，历史可以进行前进回退
        name: 'content',
        params: {
          id: message.id,
          title: message.title
        }
      })
    },
    replaceShow(message) {
      this.$router.replace({   //replace是另外一个方法，会将前一个路由记录替换掉，因此无法进行回退
        name: 'content',
        params: {
          id: message.id,
          title: message.title
        }
      })
    }
  }
~~~
## 缓存路由组件
使用<keep-alive>标签将包括其中的路由组件缓存下来，不进行销毁，适合于保存用户输入的内容在未进行处理之前不被清除掉  
Home.vue组件中
~~~vue
<keep-alive include="News">  //include中是指明需要被缓存的路由组件，如果不写，则缓存router-view包含的所有路由组件
    <router-view style="margin-top: 20px;"/>
</keep-alive>
~~~

## 路由组件独有的钩子函数activated, deactivated
- activated钩子函数是在组件被激活（路由组件切换进主视图）时实现的钩子函数，而deactivated钩子函数则是在路由组件被切换出主视图时实现的钩子函数
- 一般常用于组件被缓存时，由于组件被缓存不会被销毁，所以不能使用beforeDestroyed钩子函数来执行函数，这时候就可以用deactivated来实现
~~~vue
<li :style="{opacity}"><h3>欢迎学习Vue</h3></li>
<!------------------------------------------------------------------>
activated() {
this.timer = setInterval(()=>{
console.log('@')
this.opacity -= 0.01
if(this.opacity <= 0 )
this.opacity = 1
}, 16)
},
deactivated() {
clearInterval(this.timer)
}
~~~
## 四种路由守卫
- 前置全局路由守卫(router.beforeEach)、后置全局路由守卫(router.afterEach)与独享路由守卫(beforeEnter)
~~~js
//main.js
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
~~~

- 组件内路由守卫(beforeRouteEnter & beforeRouteLeave)
~~~vue
//组件内
export default {
name: "About",

//通过路由规则，进入该组件时候调用
beforeRouteEnter(to,from,next){
if(localStorage.getItem('school')=== 'vanier'){
next()
}else{
alert("You don't have authority to check this item")
}
},
//离开该组件时候调用
beforeRouteLeave(to,from,next){
document.title = to.name
next()
}
}
~~~