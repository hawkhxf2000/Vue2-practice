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

    <Category ref="games" title="游戏">
      <!--      slotProps是一个对象，里面包含了在子组件中绑定的所有数据，我们需要从中提取games这个属性才能获得这个部分相对应的数据，这个名字需要与子组件被绑定的属性名（youxis）一致-->
      <template v-slot:center="slotProps">
        <ul>
          <li v-for="(game, index) in slotProps.youxis" :key="index">{{ game }}</li>
        </ul>
      </template>
    </Category>

    <Category title="影视">
      <template v-slot:center>
        <video controls src="https://youtu.be/uIdjcDTc9Vk"/>
      </template>

      <template ref="movies" v-slot:footer="slotProps">
        <ul>
          <li v-for="(movie, index) in slotProps.movies" :key="index">{{ movie }}</li>
        </ul>
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
// data(){
//     return{
//
//     }
// }
//   mounted() {
//     console.log(this.$refs.movies)
//   }
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
  display: flex;
  justify-content: space-around;
}

li {
  text-align: left;
}

img, video {
  width: 100%
}

a {
  margin-left: 20px;
}
</style>
