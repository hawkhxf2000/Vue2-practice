<template>
  <div>
    <button @click="getWF">点我获取天气信息</button>
    <p>城市:{{wf.city}}</p>
    <p>现在温度为:{{ wf.temperature }}</p>
    <img :src="wf.iconUrl" alt=""/>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "WeatherForcast",
  data() {
    return {
      wf: {
        city:'',
        iconUrl: '',
        temperature: 0,
        feelTemp: 0,
        weather:''
      },
    }
  },
  methods: {
    getWF() {
      // fetch("http://api.weatherapi.com/v1/current.json?key=41fca789e5ea40a5ba2162357221306&q=montreal&aqi=yes")
      //     .then(response => response.json()).then(data => {
      //   this.wf.iconUrl = data.current.condition.icon
      //   this.wf.temperature = data.current.temp_c
      //   // this.wf.feelTemp = data.current.
      //   console.log(data.current.condition.icon)

      // })
      axios.get("http://api.weatherapi.com/v1/current.json?key=41fca789e5ea40a5ba2162357221306&q=montreal&aqi=yes")
          .then(res=>{
            console.log(res)
            this.wf.weather = res.data.current.condition.text
            this.wf.iconUrl = res.data.current.condition.icon
            this.wf.temperature = res.data.current.temp_c
            this.wf.city = res.data.location.name
          })

    }
  }
}
</script>

<style scoped>

</style>