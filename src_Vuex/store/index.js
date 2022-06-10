//该文件用于创建Vuex中最为核心的Store
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
//应用Vuex插件
Vue.use(Vuex)

//集中配置
//定义actions,用于相应组件中的动作
//异步动作放在actions中，所有的业务逻辑也都放在actions下
// const actions = {
//     add(context,value){
//         context.commit('ADD',value) //在这里使用全大写，以区分Mutation中的方法与actions中的方法
//     },
//     sub(context,value){
//         context.commit('SUB',value)
//     },
//     oddAdd(context,value) {
//         context.commit('ODDADD',value)
//     },
//     intervalAdd(context,value) {
//         context.commit('INTERVALADD',value)
//     }
// }

//定义mutations, 仅用于操作数据(state)
// const mutations = {
//     ADD(state,value){
//         state.sum += value
//     },
//     SUB(state,value){
//         state.sum-=value
//     },
//     ODDADD(state,value){
//         if(state.sum % 2){
//             state.sum+=value
//         }
//     },
//     INTERVALADD(state,value){
//         setTimeout(() => {
//             state.sum += value
//         }, 500)
//     },
//     addPerson(state,value){
//         state.personList.unshift(value)
//     }
// }

// const getters = {
//     tenTimes(state){
//         return state.sum * 10
//     }
// }
//
// //定义state,用于存储数据，相当于Entity
// const state = {
//     sum: 0, //当前的和
//     school: 'vanier',
//     course: 'cs',
//     personList:[
//         {id:1, name:'张三'}
//     ]
// }

//模块化配置
//求和相关的配置
const countOptions = {
    namespaced:true,
    actions:{
        add(context,value){
            context.commit('ADD',value) //在这里使用全大写，以区分Mutation中的方法与actions中的方法
        },
        sub(context,value){
            context.commit('SUB',value)
        },
        oddAdd(context,value) {
            context.commit('ODDADD',value)
        },
        intervalAdd(context,value) {
            context.commit('INTERVALADD',value)
        }
    },
    mutations:{
        ADD(state,value){
            state.sum += value
        },
        SUB(state,value){
            state.sum-=value
        },
        ODDADD(state,value){
            if(state.sum % 2){
                state.sum+=value
            }
        },
        INTERVALADD(state,value){
            setTimeout(() => {
                state.sum += value
            }, 500)
        }
    },
    state:{
        sum: 0, //当前的和
        school: 'vanier',
        course: 'cs',
    },
    getters:{
        tenTimes(state){
            return state.sum * 10
        }
    }
}

const personOptions = {
    namespaced: true,
    actions:{},
    mutations:{
        addPerson(state, value) {
            state.personList.unshift(value)
        }
    },
    state:{
        personList: [
            {id: 1, name: '张三'}
        ]
    }
}
//创建并暴露store
export default new Vuex.Store({
    //实际上使用的键值对同名时的简写形式
    // actions,
    // mutations,
    // state,
    // getters
    modules:{
        // namespaced:true,
        countOptions,
        personOptions
    }
})