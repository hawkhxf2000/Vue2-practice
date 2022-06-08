<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <!--    进入退出动画-->
    <transition-group name="fade" appear>
      <h1 v-show="isShow" key="1">{{ msg }}</h1>
      <h1 v-show="isShow" key="2">Vanier</h1>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "GuoDu",
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
  /*第一种写法，谁要呈现动态效果就在谁身上加过渡效果*/
  /*transition: 0.5s linear;*/
}

/*进入的起点，退出的终点*/
.fade-enter, .fade-leave-to{
  transform: translateX(-100%);
}
/*第二种写法：利用-active类来实现过渡效果*/
.fade-enter-active, .fade-leave-active{
  transition: 0.5s linear;

}
/*进入的终点，退出的起点*/
.fade-enter-to, .fade-leave{
  transform: translateX(0);
}
</style>