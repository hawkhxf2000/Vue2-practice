<template>
  <div id="app">
  <WeatherForcast/>
  </div>
</template>

<script>
import WeatherForcast from "@/components/WeatherForcast";

export default {
  name: 'App',
  components: {
    WeatherForcast
  },
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
