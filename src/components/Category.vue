<template>
<div class="container">
  <h3>{{title}}分类</h3>
  <slot name="center" :youxis="games" >我是默认值</slot>
  <slot name="footer" :movies="movies"></slot>
</div>
</template>

<script>
export default {
  name: "Category",
  props:['title'],
  data(){
    return{
      games:['古墓丽影','半条命','最终幻想7','无主之地'],
      movies:['生化危机','壮志凌云']
    }
  }
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