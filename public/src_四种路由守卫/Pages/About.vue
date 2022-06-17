<template>
  <h2>我是About的内容</h2>
</template>

<script>
export default {
  name: "About",
  //通过路由规则，进入该组件时候调用
  beforeRouteEnter(to,from,next){
    if(localStorage.getItem('school')=== 'vanier'){
      next()
    }else{
      alert("You don't have authority to check this item")
    }
  },
  //离开该组件时候调用
  beforeRouteLeave(to,from,next){
    document.title = to.name
    next()
  }
}
</script>

<style scoped>

</style>