<template>
<div>
  <h1>{{msg}}</h1>
  <h2>学生名字：{{name}}</h2>
  <h2>学生性别：{{sex}}</h2>
  <h2>学生年龄：{{age}}</h2>
</div>
</template>

<script>
export default {
  name: "Student",
  data(){
    return{
      msg:"我是一个正在学CS的学生"
    }
  },
  // props:['name','sex','age']  //简单接收

  //接收数据的同时对数据类型进行限定
  // props:{
  //   name:String,
  //   sex: String,
  //   age: Number
  // }

  //最完整接收模式
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
}
</script>

<style scoped>

</style>