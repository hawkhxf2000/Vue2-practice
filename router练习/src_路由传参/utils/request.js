import axios from "axios";

//创建request实例
const request = axios.create({
    baseURL:'http://api.weatherapi.com/v1/',
    timeout:2000,
    headers:{
        'content-type':'application/json;charset=utf-8'
    }
})

export default request()