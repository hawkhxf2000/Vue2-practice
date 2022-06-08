<template>
<div class="container">
  <h3>{{title}}分类</h3>
  <slot name="center">我是默认值</slot>
  <slot name="footer"></slot>
</div>
</template>

<script>
export default {
  name: "Category",
  props:['title']
}

</script>

<style scoped>
.container{
  background-color: deepskyblue;
  width:300px;
  height:400px
}
h3{
  text-align: center;
  background-color: yellow;
}
</style>