<template>
  <div>
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址： {{ address }}</h2>
<!--    插件中的全局mixin-->
    <button @click="showName">Show Name</button>
<!--    <h2>我们有共同的数据:x={{ x }},y={{ y }}</h2>-->
<!--    <button @click="showName">点我显示名字</button>-->
  </div>
</template>

<script>
// import {mixin} from "@/mixin";

export default {
  name: "School",
  data() {
    return {
      name: 'vanier college',
      address: 'Montreal'
    }
  },
  // mixins: [mixin]
}
</script>

<style scoped>

</style>