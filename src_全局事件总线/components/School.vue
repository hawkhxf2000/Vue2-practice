<template>
  <div class="school">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址： {{ address }}</h2>
  </div>
</template>

<script>

export default {
  name: "School",
  props:['getSchoolName'],
  data() {
    return {
      name: 'vanier college',
      address: 'Montreal'
    }
  },
  //绑定$bus上的hello事件
  mounted() {
    this.$bus.$on('hello',(data)=>{
      console.log('我是school组件,我收到了数据',data)
    })
  },
  //在组件销毁之前解绑hello事件
  beforeDestroy() {
    this.$bus.$off('hello')
  }
}
</script>

<style scoped>
.school{
  background-color: skyblue;
}
</style>