<template>
  <div>
    <ul>
      <li v-for="message of messageList" :key="message.id">{{ message.title }}</li>
    </ul>
  </div>
</template>

<script>
import {nanoid} from "nanoid";

export default {
  name: "Message",
  data(){
    return{
      messageList: [
        {id:nanoid(),title:'message1'},
        {id:nanoid(),title:'message2'},
        {id:nanoid(),title:'message3'},
      ]
    }
  }
}
</script>

<style scoped>

</style>