<template>
  <div id="app">
    <Count/>
    <hr>
    <Person/>
  </div>
</template>

<script>
import Count from "@/components/Count";
import Person from "@/components/Person";

export default {
  name: 'App',
  components: {
    Count,
    Person
  },
  mounted() {
    console.log('App', this.$store)
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: left;*/
  color: #2c3e50
}
</style>
