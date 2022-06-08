<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <School ref="sch"/>
<!--    插件中的原型对象上的hello方法-->
    <button @click="this.hello">Show Hello</button>
    <hr>
    <Student name="张三" sex="男" :age="18"/>
    <Student name="李四" sex="女" :age="19"/>
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
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
