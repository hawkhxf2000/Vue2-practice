<template>
  <div>
    <ul>
      <li :style="{opacity}"><h3>欢迎学习Vue</h3></li>
      <li v-for="news of newsList" :key="news.id">{{ news.title }} <input type="text"> </li>
    </ul>
  </div>
</template>

<script>
import {nanoid} from "nanoid";

export default {
  name: "News",
  data() {
    return {
      newsList: [
        {id: nanoid(), title: 'news1'},
        {id: nanoid(), title: 'news2'},
        {id: nanoid(), title: 'news3'}
      ],
      opacity: 1
    }
  },
  // mounted() {
  //   this.timer = setInterval(()=>{
  //     this.opacity -= 0.01
  //     if(this.opacity <= 0 )
  //       this.opacity = 1
  //   }, 16)
  // },
  activated() {
    this.timer = setInterval(()=>{
      console.log('@')
      this.opacity -= 0.01
      if(this.opacity <= 0 )
        this.opacity = 1
    }, 16)
  },
  deactivated() {
    clearInterval(this.timer)
  }
  // beforeDestroy() {
  //   clearInterval(this.timer)
  // }
}
</script>

<style scoped>

</style>