<template>
<div class="student">
  <h2>学生名字：{{name}}</h2>
  <h2>学生性别：{{sex}}</h2>
  <h2>学生年龄：{{age}}</h2>
  <button @click="sendStudentName">将学生名字传递给App</button>
</div>
</template>

<script>
// import {mixin} from "@/mixin";
export default {
  name: "Student",
  data(){
    return{
      msg:"我是一个正在学CS的学生",
      name: '李四',
      sex:'女',
      age: 19
    }
  },
  // props:['name','sex','age'],
  methods:{
    sendStudentName(){
      this.$emit('getStudentName',this.name)
    }
  }
}
</script>

<style scoped>
.student{
  background-color: pink;
}
</style>