<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <!--    进入退出动画-->
    <transition
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__bounceInDown"
        leave-active-class="animate__bounceOutUp">
      <h1 v-show="isShow" key="1">{{ msg }}</h1>
    </transition>
  </div>
</template>

<script>
import 'animate.css'

export default {
  name: "third-party",
  data() {
    return {
      msg: '你好呀',
      isShow: true
    }
  },
  // methods: {
  //   showInfo(){
  //     this.isShow = !this.isShow
  //   }
  // }
}
</script>

<style scoped>
h1 {
  background-color: orange;
}


</style>