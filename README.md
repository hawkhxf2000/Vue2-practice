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
.fade-enter-active{
  animation: slideInLeft-enter 0.5s linear;
}
.fade-leave-active{
  animation: slideInLeft-enter 0.5s reverse;
}

@keyframes slideInLeft-enter {
  from{
    transform: translateX(-100%);
  }
  to{
    transform: translateX(0px);
  }
}
~~~

- 使用过渡效果
~~~css
h1{
  background-color: orange;
  /*第一种写法，谁要呈现动态效果就在谁身上加过渡效果*/
  /*transition: 0.5s linear;*/
}

/*进入的起点，退出的终点。*/
.fade-enter, .fade-leave-to{  
  transform: translateX(-100%);
}
/*第二种写法：利用-active类来实现过渡效果*/
.fade-enter-active, .fade-leave-active{
  transition: 0.5s linear;

}
/*进入的终点，退出的起点*/
.fade-enter-to, .fade-leave{
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
  <slot name="center" :youxis="games" >我是默认值</slot>
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
const actions= {

}

//定义mutations, 用于操作数据(state)
const mutations = {

}

//定义state,用于存储数据
const state = {

}

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

