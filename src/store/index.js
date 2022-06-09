//该文件用于创建Vuex中最为核心的Store
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
//应用Vuex插件
Vue.use(Vuex)

//定义actions,用于相应组件中的动作
const actions = {
    add(context,value){
        context.commit('ADD',value) //在这里使用全大写，以区分Mutation中的方法与actions中的方法
    },
    sub(context,value){
        context.commit('SUB',value)
    }
}

//定义mutations, 用于操作数据(state)
const mutations = {
    ADD(state,value){
        state.sum += value
    },
    SUB(state,value){
        state.sum-=value
    }
}

//定义state,用于存储数据
const state = {
    sum: 0 //当前的和
}

//创建并暴露store
export default new Vuex.Store({
    //实际上使用的键值对同名时的简写形式
    actions,
    mutations,
    state
})