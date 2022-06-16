<template>
  <div>
    <h2>我是Home的内容</h2>
      <ul class="nav nav-tabs">
        <li><router-link class="list-group-item" active-class="active" to="/home/news">news</router-link></li>
        <li ><router-link class="list-group-item" active-class="active" to="/home/message">messages</router-link></li>
      </ul>
    <keep-alive include="News">
    <router-view style="margin-top: 20px;"/>
    </keep-alive>
  </div>
</template>

<script>
import News from "@/Pages/News";

export default {
  name: "Home",
  components: {News}
}
</script>

<style scoped>

</style>