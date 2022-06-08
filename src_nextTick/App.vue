<template>
  <div id="app">
    <!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <h1>{{ msg }}</h1>
    <input type="text" v-show='isShow' v-model:value="someWords" ref="input">
    <button @click="addWord">点我添加一些文字</button>
  </div>
</template>

<script>
import School from "./components/School.vue"
import Student from "@/components/Student";

export default {
  name: 'App',
  components: {
    Student,
    School
  },
  data() {
    return {
      msg: '你好呀',
      someWords: '',
      isShow: false
    }
  },
  methods: {
    addWord() {
      if (this.isShow === true) {
        this.someWords = '我将获取焦点'
        // this.isShow = !this.isShow
      } else {
        this.isShow = true
      }
      // this.$refs.input.focus() //如果不使用$nextTick(),输入框无法马上获得焦点
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
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
  background-color: grey;
}

h1 {
  margin: 10px
}
</style>
