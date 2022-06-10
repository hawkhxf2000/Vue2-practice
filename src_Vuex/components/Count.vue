<template>
  <div>
    <h1>当前求和为：{{ sum }}</h1>
    <h1>放大十倍后:{{tenTimes}}</h1>
    <h2>学校名:{{school}},学科名:{{course}}</h2>
    <p>下面一共有人员：{{personList.length}} 名</p>
    <select v-model="number">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="add(number)">+</button>
    <button @click="sub(number)">-</button>
    <button @click="oddAdd(number)">当前求和为奇数再加</button>
    <button @click="intervalAdd(number)">等一等再加</button>
  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'


export default {
  name: "Count",
  data() {
    return {
      number: 1
    }
  },
  methods: {
    // add() {
    //   //标准流程
    //   // this.$store.dispatch('add', this.number)
    //   //简化流程： 当actions并不引入任何外部数据，仅仅是转发请求的时候，可以直接让组件跳过Actions将请求发送给mutations，注意此时的方法需要调用mutations中的方法
    //   this.$store.commit('ADD',this.number)
    // },
    // sub() {
    //   this.$store.dispatch('sub', this.number)
    // },

    //借助mapMutations生成对应的方法，在方法中会调用commit向Mutations直接发起请求
    //对象写法
    ...mapMutations('countOptions',{add:'ADD',sub:'SUB',oddAdd:'ODDADD',intervalAdd:'INTERVALADD'}),
    //数组写法
    // ...mapMutations(['ADD','SUB']),
    /*********************************************************************************************************/
    // oddAdd() {
      // //方法一： 可以直接在这里写判断并调用add方法，但是这样增加系统耦合性，一旦Store中的add方法改变则整个逻辑都会改变，因此不推荐
      // if (this.$store.state.sum % 2) {
      //   this.add()
      //方法二：在这里传递一个方法参数，在actions里面写业务逻辑，与系统进行解耦，类似MVC模式
      // this.$store.dispatch('oddAdd',this.number)
      //方法三：因为actions中没有引入任何外部数据，所以这里可以直接绕过actions将要求传递给mutations
      // this.$store.state.countOptions.commit('ODDADD', this.number)
    // },
    // intervalAdd() {  //wait 500ms to do the adding
    //   this.$store.commit('INTERVALADD', this.number)
    // }
  },
  computed:{
    //对象写法
    ...mapState('countOptions',{sum:'sum',school:'school',course:'course'}),
    ...mapState('personOptions',['personList']),
    //数组形式
    //     ...mapState(['sum','school','course'])

        ...mapGetters('countOptions',{tenTimes:'tenTimes'})
  },
}
</script>

<style scoped>
* {
  margin-left: 10px;
}
p{color:red}
</style>