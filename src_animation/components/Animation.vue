<template>
<div>
  <button @click="isShow = !isShow">显示/隐藏</button>
  <!--    进入退出动画-->
  <transition name="fade" appear>
    <h1 v-show="isShow" >{{ msg }}</h1>
  </transition>
</div>
</template>

<script>
export default {
  name: "Animation",
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
h1{
  background-color: orange;
}
.fade-enter-active{
  animation: slideInLeft-enter 0.5s linear;
}
.fade-leave-active{
  animation: slideInLeft-enter 0.5s reverse;
}

@keyframes slideInLeft-enter {
  from{
    transform: translateX(-100%);
  }
  to{
    transform: translateX(0px);
  }
}
</style>