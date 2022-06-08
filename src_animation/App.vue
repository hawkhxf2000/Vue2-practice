<template>
  <div id="app">
    <!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <!--    <h1>{{ msg }}</h1>-->
    <Animation/>
    <GuoDu/>
    <third-party/>
  </div>
</template>

<script>
// import School from "./components/School.vue"
// import Student from "@/components/Student";
import Animation from "@/components/Animation";
import GuoDu from "@/components/GuoDu";
import thirdParty from "@/components/third-party";

export default {
  name: 'App',
  components: {
    // Student,
    // School
    Animation,
    GuoDu,
    thirdParty
  },

}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  background-color: grey;
}

</style>
