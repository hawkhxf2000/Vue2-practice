<template>
  <div id="app" >
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <h1>{{ msg }}</h1>
    <School />
    <Student />
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
      msg:'你好呀'
    }
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
