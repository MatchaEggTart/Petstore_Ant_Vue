# Vuex介绍

* 来源 https://vuex.vuejs.org/zh/

  

## Vuex是啥？

* 是一个状态管理模式
* 存储所有组件的状态（就是组件共用数据）



## 好处

* 如果使用 props 或者 slots，也就父子间共享数据，兄弟之间无法实现
* 而且数据的变化，需要共用这个数据的组件们去监听同步，耦合啊
* Vuex是个单一状态树，整个Vue只有一个store实例，任何组件都能触发行为



## 使用方法

* 打包系统使用

  ```js
  import Vue from 'vue'
  import Vuex from 'vuex'
  Vue.use(Vuex)
  ```



## Store

* 每一个Vuex的核心都是 store（仓库），store是一个响应式容器，状态变化，其他使用容器状态的组件也会更新

* store的状态不能直接修改，要commit（其实更多是dispatch）

* 每次都是使用 Vuex.Store(store选项对象) 创建 一个 store。

* 要组件能使用 store（this.$store.property）需要在 main.js声明

  * es6之前

    ```js
    new Vue({
      el: '#app',
      store: store,
    })
    ```

    

  * es6

    ```js
    new Vue({
      el: '#app',
      store
    })
    ```

    

  

# 核心概念



## State

* 如何获得 Vuex状态（state）

  * 使用 Vue的 computed选项（计算属性），这样每当state的属性发生变化，都会触发更新关联的 DOM

  

* mapState辅助函数

  * 例子

    ```js
    // 在单独构建的版本中辅助函数为 Vuex.mapState
    import { mapState } from 'vuex'
    
    export default {
      // ...
      computed: mapState({
        // 箭头函数可使代码更简练
        count: state => state.count,
    
        // 传字符串参数 'count' 等同于 `state => state.count`
        countAlias: 'count',
    
        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        countPlusLocalState (state) {
          return state.count + this.localCount
        }
        
        // 映射 this.count 为 store.state.count
        'count'
      })
    }
    
    ```

    

  * mapState写法是computed的值（整个计算属性），但是如果是computed下的一个对象中的值（局部计算属性），就要写

    ```js
    computed:{
    	其他对象,
    	// ...mapState 对象展开运算符
    	...mapState({})
    }
    ```

    

* 组件应该保留局部状态

  * 别把所有状态放到Vuex



## Getter

* 就是 getter/setter 的 getter，算是唯一访问接口的属性

* 参数

  * state可以作为getter对象中（getter是 getters的对象啦）的第一个参数（如果不用state做参数，怎么获取state？搞事情啊）
  * getters 可以作为第二个参数，这样其他 getter就能访问其他getter的值

  

* mapGetters

  * 例子

    ```js
    computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'doneTodosCount',
        'anotherGetter',
        // ...
        // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
        doneCount: 'doneTodosCount'
      ])
    }
    
    ```





## Mutation

* Vuex的setter方法（mutations是一个对象，里面可以设置多种方法【也就是mutation】），唯一能更改Vuex的state方法+

  

* 参数

  * 第一个参数必然是state，第二个参数是载荷（payload），这个可以随意改名，毕竟这是形参。

* 提交方法

  * 例子

    ```js
    store.commit({
      type: 'mutaion的名字',
      amount: 10 // 明显这个payload就是个键值对
    })
    ```

  

* mutation 必须是 <strong style="color:red;">同步函数</strong>

  * 因为异步，如果回调函数没有被调用，记录不了啊啊啊，出了问题思考人生，应该用 action来实现异步，action触发 commit，这样当值被修改，是在mutation上修改，分了两步，但是能捕捉到

* ...mapMutaion 用法

  * 例子

    ```
    methods: {
      ...mapMutations([
        'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
        // `mapMutations` 也支持载荷：
        'incrementBy' 
        // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      ]),
      ...mapMutations({
          add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      })
    }
    
    ```

    

## Action

* Action使用 commit，要想使用 mutaion就用 action去 commit触发，要使用 action就用 dispatch去触发

* 参数

  * 第一个参数是 context对象， （固定的），context可以调用 commit方法，context 具有 store的方法和属性，但context不是 store。所以

    ```js
    context.commit = store.commit
    ```

    * 第一个参数可以写成 {commit}（原本是context）， 这样方法里可以写成 commit('mutation名')

      ```js
      actions: {
        increment ({ commit }) {
          commit('increment')
        }
      }
      ```

  

  * 之后参数随意，可以是payload或者其他

  

* store.dispatch触发 action

  * dispatch 可以返回Promise

  * 所以可以玩

    ```js
    store.dispatch('action名').then(() => {})
    ```

    

* ...mapActions

  * 例子

    ```js
    methods: {
        ...mapActions([
          'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
    
          // `mapActions` 也支持载荷：
          'incrementBy' /* 
          将 `this.incrementBy(amount)` 映射为`this.$store.dispatch('incrementBy', amount)` 	  */
        ]),
        ...mapActions({
          add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
        })
      }
    }
    
    ```

    

    

## Modules

* 如果Store太臃肿在一个文件，维护复杂，所以可以将 store 分隔成模块，每个模块都有自己的 state、mutation、getter、action

  * 例子

    ```js
    const moduleA = {
      state: () => ({ ... }),
      mutations: { ... },
      actions: { ... },
      getters: { ... }
    }
    
    const moduleB = {
      state: () => ({ ... }),
      mutations: { ... },
      actions: { ... }
    }
    
    const store = new Vuex.Store({
      modules: {
        a: moduleA,
        b: moduleB
      }
    })
    
    store.state.a // -> moduleA 的状态
    store.state.b // -> moduleB 的状态
    
    ```

    

* 模块的mutation和 getter第一个参数还是state，但是 actions 如果想获得 根节点的state，使用rootState作为第三个参数，getters 也是第三个参数是 rootState

  * 为啥有根节点，因为 modules的store可以嵌套，这样子store继承了父模块的命名空间





## namespaced

* 模块化嘛，肯定要区分好的 在 namespaced 跟 state、getters、actions、mutations等元素同级，一旦在这个模块的 store声明了，那使用这个部分的 store就必须加入空间名前缀，空间名就是modules下的对象名，但是无限嵌套，那就 用 / 分隔开， 比如 account/isAdmin/profile
* 建议开放时开官网，苦笑，没有情景模拟







Vuex

namespace = true

当index.js modules{名字}

commit的时候必须使用 名字/action方法名 来实现，不能再使用 this.$store.dispatch('addToCartAction', product.id)

而要

this.$store.dispatch('shoppingCart/addToCartAction', product.id)