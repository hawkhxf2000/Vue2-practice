<template>
<div class="student">
  <h2>学生名字：{{name}}</h2>
  <h2>学生性别：{{sex}}</h2>
  <h2>学生年龄：{{age}}</h2>
  <button @click="sendStudentName">点我发送数据给school组件</button>
</div>
</template>

<script>
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
  methods:{
    sendStudentName(){
      this.$bus.$emit('hello',666)
    }
  }
}
</script>

<style scoped>
.student{
  background-color: pink;
}
</style>