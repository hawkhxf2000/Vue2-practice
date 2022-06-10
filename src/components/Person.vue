<template>
<div>
  <h1>人员列表</h1>
  <p>上面求和的值为:{{sum}}</p>
  <input type="text"  v-model:value="person.name" placeholder="请输入名字">
  <button @click="addPerson">添加</button>
  <ul>
    <li v-for="person in persons" :key="person.id">{{person.name}}</li>
  </ul>
</div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
  name: "Person",
  data(){
    return{
      person:{
        id: nanoid(),
        name:''
      }
    }
  },
  methods:{
    addPerson(){
      // console.log(this.person)
      this.$store.commit('personOptions/addPerson',this.person) //注意此处方法必须将模块名带入进去
    }
  },
  computed:{
    sum(){
      return this.$store.state.countOptions.sum
    },
    persons(){
      return this.$store.state.personOptions.personList
    }
  }
}
</script>

<style scoped>
button{
  margin-left: 10px;
}
p{color: red}
</style>