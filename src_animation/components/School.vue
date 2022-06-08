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
  mounted() {
    this.$bus.$on('hello',(data)=>{
      console.log('我是school组件,我收到了数据',data)
    })
  }
}
</script>

<style scoped>
.school{
  background-color: skyblue;
}
</style>