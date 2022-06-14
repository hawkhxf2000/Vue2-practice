<template>
  <div>
    <ul>
      <li v-for="news of newsList" :key="news.id">{{ news.title }}</li>
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
      ]
    }
  }
}
</script>

<style scoped>

</style>