<template>
  <div>
    <h1>当前求和为：{{ $store.state.sum }}</h1>
    <select v-model="number">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="add">+</button>
    <button @click="sub">-</button>
    <button @click="oddAdd">当前求和为奇数再加</button>
    <button @click="intervalAdd">等一等再加</button>
  </div>
</template>

<script>
export default {
  name: "Count",
  data() {
    return {
      number: 1
    }
  },
  methods: {
    add() {
      this.$store.dispatch('add', this.number)
    },
    sub() {
      this.$store.dispatch('sub', this.number)
    },
    oddAdd() {
      if (this.$store.state.sum % 2) {
        this.add()
      }
    },
    intervalAdd() {  //wait 500ms to do the adding
      setTimeout(() => {
        this.add()
      }, 500)
    }
  }
}
</script>

<style scoped>
* {
  margin-left: 10px;
}
</style>