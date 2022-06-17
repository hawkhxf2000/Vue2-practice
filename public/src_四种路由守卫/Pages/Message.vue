<template>
  <div>
    <ul>
      <li v-for="message of messageList" :key="message.id">
        <!--        query字符串传参方法-->
        <!--        <router-link :to="`/home/message/message-content?id=${message.id}&title=${message.title}`">{{ message.title }}</router-link>-->
        <!--        params字符串传参方法-->
        <!--        <router-link :to="`/home/message/message-content/${message.id}/${message.title}`">{{ message.title }}</router-link>-->
        <!--   query对象写法     -->
        <router-link :to="{
          // path:'/home/message/message-content',  //字符串写法
          name: 'content',
          params:{                       //将此处改为params即为params传参
            id: message.id,
            title: message.title
          }
        }">{{ message.title }}
        </router-link>
        <button @click="pushShow(message)">push查看</button>
        <button @click="replaceShow(message)">replace查看</button>
      </li>
    </ul>
    <hr>
    <router-view/>
  </div>
</template>

<script>
import {nanoid} from "nanoid";

export default {
  name: "Message",
  data() {
    return {
      messageList: [
        {id: nanoid(), title: 'message1'},
        {id: nanoid(), title: 'message2'},
        {id: nanoid(), title: 'message3'},
      ]
    }
  },
  methods: {
    pushShow(message) {
      this.$router.push({
        name: 'content',
        params: {
          id: message.id,
          title: message.title
        }
      })
    },
    replaceShow(message) {
      this.$router.replace({
        name: 'content',
        params: {
          id: message.id,
          title: message.title
        }
      })
    }
  }
}
</script>

<style scoped>
button {
  margin-left: 10px;
}
</style>