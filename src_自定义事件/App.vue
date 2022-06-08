<template>
  <div id="app" >
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <h1>你好呀,{{schoolName}},我是{{studentName}}</h1>
<!--    使用父组件向子组件传递函数类型的Props实现子组件向父组件传值-->
    <School ref="sch" :getSchoolName="getSchoolName"/>
    <hr>
<!--    通过父组件给子组件绑定一个自定义事件，实现子组件向父组件传值（第一种方法，直接绑定事件）-->
<!--    <Student @getStudentName="getStudentName"/>-->

<!--    通过父组件给子组件绑定一个自定义事件，实现子组件向父组件传值（第二种方法，直接拿到子组件实例，使用$on在父组件挂载时在子组件上绑定自定义事件，使用更加灵活）-->
    <Student ref="student" />
  </div>
</template>

<script>
import School from "./components/School.vue"
import Student from "@/components/Student";

export default {
  name: 'App',
  components: {
    Student,
    School
  },
  data(){
    return{
      schoolName: '',
      studentName: ''
    }
  },
  methods:{
    getSchoolName(name){
      this.schoolName = name
    },
    getStudentName(name){
     this.studentName = name
    }
  },
  //第二种方法
  mounted() {
    // this.$refs.student.$on('getStudentName',this.getStudentName)  //这种方法更为灵活，可以实现很多功能，比如设置定时器，设置延迟挂载等
    this.$refs.student.$once('getStudentName',this.getStudentName) //自定义事件仅执行一次
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  background-color: grey;
}
h1{
  margin:10px
}
</style>
