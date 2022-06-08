<template>
  <div id="app" class="container">
   <Category title="美食">
     <template v-slot:center>
     <img src="https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg" alt="">
     </template>

     <template v-slot:footer>
       <a href="">所需食材</a>
       <a href="">烹饪流程</a>
     </template>
   </Category>

    <Category title="游戏">
      <template v-slot:center>
      <ul>
        <li v-for="(game, index) in games" key="index">{{game}}</li>
      </ul>
      </template>
    </Category>

    <Category title="影视">
      <template v-slot:center>
      <video controls src="https://youtu.be/uIdjcDTc9Vk"/>
      </template>

      <template v-slot:footer>
        <a href="">观看全片</a>
      </template>
    </Category>

  </div>
</template>

<script>
import Category from "@/components/Category";


export default {
  name: 'App',
  components: {
   Category
  },
data(){
    return{
      games:['古墓丽影','半条命','最终幻想7','无主之地']
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
  display:flex;
  justify-content: space-around;
}
li{
  text-align: left;
}
img,video{
  width:100%
}
a{
  margin-left: 20px;
}
</style>
