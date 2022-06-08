export default {
    install(Vue) {
        // console.log(Vue) //形参Vue传递一个Vue的构造函数

        //全局过滤器，返回Value值前4位
        Vue.filter('mySlice', function (value) {
            return value.slice(0, 4)
        })

        //定义全局指令
        Vue.directive('fbind', {
                bind(el, binding) {
                    el.value = binding.value
                },
                inserted(el) {
                    el.focus()
                },
                update(el, binding) {
                    el.value = binding.value
                    el.focus()
                }
            }
        )

        //定义全局mixin
        Vue.mixin({
            methods: {
                showName() {
                    alert(this.name)
                }
            }
        })

        //在原型对象上绑定方法
        Vue.prototype.hello = () => {
            alert("你好！")
        }
    }
}