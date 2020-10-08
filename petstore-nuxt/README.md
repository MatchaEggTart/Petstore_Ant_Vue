

# Nuxt.js



## 安装

* 安装

  * 运行 create-nuxt-app

    ```shell
    $ npx create-nuxt-app <项目名>
    $ yarn create nuxt-app <项目名>
    # example
    $ npx create-nuxt-app petstore-nuxt
    ```

    



* 选项

  ```shell
  ? Project name: petstore-nuxt
  ? Programming language: JavaScript 
  ? Package manager: Npm
  ? UI framework: Ant Design Vue
  ? Nuxt.js modules: Axios
  ? Linting tools: ESLint, Prettier    
  ? Testing framework: Jest
  ? Rendering mode: Universal (SSR / SSG)
  ? Deployment target: Server (Node.js hosting)
  ? Development tools: (Press <space> to select, <a> to toggle all, <i> to invert selection)
  ? Version control system: None
  ```

  





# 安装 vscode 插件

* 插件名

  ```
  ESLint
  Prettier - Code formatter
  ```

  



* 装了之后基本就报 ␍ 的错误
  * 我认为（仅仅我认为）将 CRLF 变成 LF 是比较好的方法

    ```js
    # 来自 https://www.cnblogs.com/jasonboren/p/12337002.html
    CRLF: "\r\n", windows系统环境下的换行方式
    LF: "\n", Linux系统环境下的换行方式
    ```

  

  * 将 vscode 的 默认换行符格式 修改

    ```js
    # 来自 https://blog.csdn.net/sdujava2011/article/details/83827343
    Settings--》 User--》Text Editor--》Files--》Eol--》\n
    ```

    







# 入口页面





## 先设置布局

* 先设置 layouts 的 布局， 将 default.vue 改名为 index.vue，并且添加 button--purple 样式
  * ~/layouts/index.vue

    ```vue
    <template>
      <div>
        <Nuxt />
      </div>
    </template>
    
    <style>
    html {
      font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 16px;
      word-spacing: 1px;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      box-sizing: border-box;
    }
    
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
    }
    
    .button--green {
      display: inline-block;
      border-radius: 4px;
      border: 1px solid #3b8070;
      color: #3b8070;
      text-decoration: none;
      padding: 10px 30px;
    }
    
    .button--green:hover {
      color: #fff;
      background-color: #3b8070;
    }
    
    .button--grey {
      display: inline-block;
      border-radius: 4px;
      border: 1px solid #35495e;
      color: #35495e;
      text-decoration: none;
      padding: 10px 30px;
      margin-left: 15px;
    }
    
    .button--grey:hover {
      color: #fff;
      background-color: #35495e;
    }
    
    /* 入口按键 */
    .button--purple:hover {
      color: #fff;
      background-color: purple;
    }
    
    .button--purple {
      display: inline-block;
      border-radius: 4px;
      border: 1px solid purple;
      color: purple;
      text-decoration: none;
      padding: 10px 30px;
      margin-left: 15px;
    }
    
    .button--purple:hover {
      color: #fff;
      background-color: purple;
    }
    </style>
    
    ```

    





## 入口按钮

* 设置入口按钮+ main.vue（pages），让 按钮 可以进入 /main 页面
  * ~/pages/index.vue

    ```vue
    <template>
      <div class="container">
        <div>
          <Logo />
          <h1 class="title">petstore-nuxt</h1>
          <div class="links">
            <a
              href="https://nuxtjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              class="button--green"
            >
              Documentation
            </a>
            <a
              href="https://github.com/nuxt/nuxt.js"
              target="_blank"
              rel="noopener noreferrer"
              class="button--grey"
            >
              GitHub
            </a>
            <!-- 添加 去 main 的按钮 -->
            <a
              href="/main"
              target="_blank"
              rel="noopener noreferrer"
              class="button--purple"
            >
              Main
            </a>
          </div>
        </div>
      </div>
    </template>
    
    <script>
    export default {
      layout: 'index',
    }
    </script>
    
    <style>
    .container {
      margin: 0 auto;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    
    .title {
      font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      display: block;
      font-weight: 300;
      font-size: 100px;
      color: #35495e;
      letter-spacing: 1px;
    }
    
    .subtitle {
      font-weight: 300;
      font-size: 42px;
      color: #526488;
      word-spacing: 5px;
      padding-bottom: 15px;
    }
    
    .links {
      padding-top: 15px;
    }
    </style>
    
    ```

    







# 创建所有测试页面





## nuxt-link 跟 nuxt-child



* 他们（nuxt、router）很相似， 但是我觉得还是 router 好用

  ```js
  nuxt-link = router-link
  
  nuxt-child =  router-view
  ```

  https://zh.nuxtjs.org/api/components-nuxt







## nuxt 关于动态路由下的子路由



* 参考 https://blog.csdn.net/awseda/article/details/106046446

  

* 刚开始我使用的是（失败的）的文件布局

  ```js
  └── product (文件夹)
      │
      └── _id (文件夹)
          │
          ├── index.vue				# 动态路由
          │
          └── editProduct (文件夹)
              │
              └─ index.vue      		 # 动态路由下子路由
  ```

  ​	
  * nuxt 生成的 router.js 是这样的

    ```js
    {
      path: "/product/:id",
      component: _7862f11e,
      name: "product-id"
    }, {
      path: "/product/:id?/editProduct",
      component: _f5264ec4,
      name: "product-id-editProduct"
    }
    ```

    

  * <span style="color: red">没有子路由！！！</span>



* 正确写法

  

  * 如果要想动态路由下面有子路由，就必须把（我认为啊）index.vue 抽出来做 _动态路由.vue 文件

  * 就动态路由必须有他的同名文件夹放置子路由，并且要在同一个文件夹下放置 动态路由vue页面 和 他的子路由文件夹 

    * <span style="color: red">页面和文件夹同名</span>

    * <span style="color: red">页面和文件夹要在同一个文件夹下</span>

    

* 格式是

  ```js
  └── _动态路由.vue
      │
      └── 动态路由（文件夹）
          │
          └── index.vue
  ```

  

* 例子

  ```js
  └── product (文件夹)
      │
      ├── _id.vue						# 动态路由
      │
      └── _id (文件夹)
          │
          └── editProduct (文件夹)
              │.  
              └─ index.vue			 # 动态路由下子路由
  ```

  
  * nuxt 生成的 router.js 是这样的

    ```js
    {
        path: "/product/:id?",
        component: _1b78abf1,
        name: "product-id",
        children: [{
          path: "editProduct",
          component: _f5264ec4,
          name: "product-id-editProduct"
        }]
    }, 
    ```

    

  * <span style="color: red">有子路由！！！</span>







## 关于重定向



* 在 pages 创建 _.vue 文件

* 参考 [https://zh.nuxtjs.org/guide/routing/#%E6%9C%AA%E7%9F%A5%E5%B5%8C%E5%A5%97%E6%B7%B1%E5%BA%A6%E7%9A%84%E5%8A%A8%E6%80%81%E5%B5%8C%E5%A5%97%E8%B7%AF%E7%94%B1](https://zh.nuxtjs.org/guide/routing/#未知嵌套深度的动态嵌套路由)



* @/pages/_.vue

  ```vue
  <script>
  export default {
    asyncData({ redirect }) {
      redirect('/')
    },
    render(h) {
      return h('div')
    },
  }
  </script>
  
  ```

  



* 但实际上最好还是 用中间件 ， 毕竟账户登录那种检查

* 参考 https://blog.csdn.net/HermitSun/article/details/105026394







## 文件结构



```js
├── layouts
│   │
│   ├── index.vue                      # 首页 排版
│   │
│   └── default.vue                    # 其他页面排版(将来Header的位置)
│
├── pages
│   │
│   ├── index.vue				      # 首页
│   │
│   ├── form (文件夹)
│   │   └─ index.vue                    # 提交表单
│   │
│   ├── main (文件夹)
│   │   └─ index.vue                    # 商品页面
│   │
│   └── product (文件夹)                 # 单个商品
│   │   │
│   │   ├── _id.vue			           # 商品动态路由
│   │   │
│   │   └── _id (文件夹)                 # 配置单个商品子路由
│   │       │
│   │       └── editProduct (文件夹)
│   │           │
│   │           └─ index.vue      		# 动态路由下子路由
│   │
│   └── _.vue				           # 未知页面重定向
```







## default



* 在 layouts 创建 default.vue
  * @/main/default.vue

    ```vue
    <template>
      <div>
        <nuxt-link to="/main">main页面</nuxt-link>
        <nuxt-link to="/form">form页面</nuxt-link>
        <Nuxt />
      </div>
    </template>
    
    ```

    





## main



* 在 pages 创建 main 文件夹
  * @/pages/main/index.vue

    ```vue
    <template>
      <div>
        <h1>main頁面</h1>
        <ul>
          <li v-for="index in 5" :key="index">
            <nuxt-link :to="{ path: '/product/' + index, params: { id: index } }">
              {{ index }}</nuxt-link
            >
          </li>
        </ul>
      </div>
    </template>
    
    <script>
    export default {
      layout: 'default',
    }
    </script>
    
    <style></style>
    
    ```







## form



* 在 pages 创建 form 文件夹
  * @/pages/form/index.vue

    ```vue
    <template>
      <div>
        <h1>form頁面</h1>
      </div>
    </template>
    
    <script>
    export default {
      layout: 'default',
    }
    </script>
    
    <style></style>
    
    ```

    





## product



* 在 pages 创建 product 文件夹
  * @/pages/product/_id.vue

    ```vue
    <template>
      <div>
        <h1>Product Id: {{ $route.params.id }}</h1>
    
        <nuxt-link :to="'/product/' + $route.params.id + '/editProduct'"
          >修改页面</nuxt-link
        >
    
        <nuxt-child />
      </div>
    </template>
    <script>
    export default {
      layout: 'default',
    }
    </script>
    
    ```

    





## editProduct



* 在 pages/product 创建 _id/editProduct 文件夹
  * @/pages/product/_id/editProduct/index.vue

    ```vue
    <template>
      <div>
        <h2>editProduct 页面</h2>
      </div>
    </template>
    
    <script>
    export default {
      layout: 'default',
    }
    </script>
    
    <style></style>
    
    ```

    





# 正式





## 思路



* 在 components 创建 Navbar.vue 然后将 Header.vue 内容复制过去， 在 layouts/default.vue 导入 Navbar 组件， 当然现在没搞好 store， 所以应该从 store 开始下手



## 问题



### nuxt.js Vuex



```js
[nuxt] store/index.js should export a method that returns a Vuex instance.
```



* 如果使用 Vuex modules 结构，就必须使用 将 store 做方法 return Vues.Store({})，然后在 export store，以前直接 store = new Vuex.Store() ，现在不行，真的nuxt 万物皆return 啊



* 参考 https://www.cnblogs.com/nayek/p/12528856.html



```js
Classic mode for store/ is deprecated and will be removed in Nuxt 3.
```



* 其实就是不需要再去 modules store， nuxt 会根据文件名来命名 store， （毕竟也是根据文件名来制作路由的男人啊），单文件即可， nuxt3 会放弃 对 传统 modules store 的支持

* 参考 https://blog.csdn.net/weixin_45115705/article/details/98784259



### nuxt.js if return



* return-in-computed-property 报错

* eslint 要求 computed 属性的 if 有 return， else 也要有！！！



### nuxt.js console



* Unexpected console statement

* 要换成 window.console.log()



### nuxt.js 异步报错



```
ERROR  connect ECONNREFUSED 127.0.0.1:80
  at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1141:16)
```



* 我的原因是 mixin 使用的 created 的生命周期 dispatch store，但是 nuxt 生命周期， created 之前都在服务器运行， 直到 mounted 才到客户端运行
* 参考 https://www.cnblogs.com/goloving/p/11440967.html





### 关于如何 访问 assets 路径

* 图片标签那些可以访问

  * ~/assets

* 就是异步不会，囧

* 参考

  https://blog.csdn.net/weixin_36339245/article/details/91343921?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param

  https://blog.csdn.net/just4you/article/details/108866048

  https://zhuanlan.zhihu.com/p/143950140

  

* 反正访问 static 就不需要 /static，直接 /static下的文件





### 关于 v-html warning



```js
'v-html' directive can lead to XSS attack.
```



* 参考 

  https://blog.csdn.net/lingxiaoxi_ling/article/details/105851736?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param

  











## static



* 将 文件夹 images 和 文件 products.json 复制到 @/static 下面

  * ~/static/products.json

    ```js
    {
        "products":[
          {
            "id": 1001,
            "title": "Cat Food, 25lb bag",
            "description": "A 25 pound bag of <em>irresistible</em>, organic goodness for your cat.",
            "price": 2000,
            "image": "static/images/product-fullsize.png",
            "availableInventory": 10,
            "rating": 1
          },
          {
            "id": 1002,
            "title": "Yarn",
            "description": "Yarn your cat can play with for a very <strong>long</strong> time!",
            "price": 299,
            "image": "static/images/yarn.jpg",
            "availableInventory": 7,
            "rating": 1
          },
          {
            "id": 1003,
            "title": "Kitty Litter",
            "description": "Premium kitty litter for your cat.",
            "price": 1100,
            "image": "static/images/cat-litter.jpg",
            "availableInventory": 99,
            "rating": 4
          },
          {
            "id": 1004,
            "title": "Cat House",
            "description": "A place for your cat to play!",
            "price": 799,
            "image": "static/images/cat-house.jpg",
            "availableInventory": 11,
            "rating": 5
          },
          {
            "id": 1005,
            "title": "Laser Pointer",
            "description": "Drive your cat crazy with this <em>amazing</em> product.",
            "price": 4999,
            "image": "static/images/laser-pointer.jpg",
            "availableInventory": 25,
            "rating": 1
          }
        ]
      }
      
    ```

    





## Mixins



* 就在 项目 根目录创建 mixins 文件夹，然后放入 productsStore，让那些需要 操作 store 的 组件可以共用这个小工具（避免冗余）

  
  * @/mixins/productsStore.js

    ```js
    const dispatchProductsStore = {
      data() {
        return {
          // products: []
        }
      },
    
      mounted() {
        this.$store.dispatch('products/getAllProducts')
        // console.log("mixin")
      },
    }
    
    export { dispatchProductsStore }
    
    ```

    





## Store



* nuxt 不需要写 store/index，他自己会去找，并且以文件名 命名，所以连 vuex modules 都不需要， 就直接两个文件名， 不过 在 nuxt 的 Store 的 state 需要是方法， return 一个 对象
  

  * @/Store/product.js

    ```js
    import api from '@/api'
    export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
    
    export const state = () => ({
      all: [],
    })
    
    export const getters = {
      all: (state) => state.all,
    }
    
    export const actions = {
      getAllProducts({ commit }) {
        api.products.getAllProducts((data) => {
          commit('GET_ALL_PRODUCTS', data)
        })
      },
    }
    
    export const mutations = {
      [GET_ALL_PRODUCTS](state, payload) {
        state.all = payload
      },
    }
    
    ```

    

    

  * @/Store/shoppingCart.js

    ```js
    export const ADD_TO_CART = 'ADD_TO_CART'
    
    export const state = () => ({
      item: [],
    })
    
    export const getters = {
      // 购物车里商品ID数组
      item: (state) => state.item,
      // 购物车商品总数
      number: (state) => state.item.length,
    }
    
    export const actions = {
      // 添加商品至购物车
      addToCart({ commit }, productId) {
        commit('ADD_TO_CART', productId)
      },
    }
    
    export const mutations = {
      [ADD_TO_CART](state, payload) {
        state.item.push(payload)
      },
    }
    
    ```

    





## Api

* 为啥不是用中间件？？？

* 这是做 store/product action 触发 异步的 Api
  * 这里需要注意 axios.get 访问的 static 路径，不再是 /static/product.json， nuxt嘛，习惯就好，直接 https://localhost:3000/products.json 就能访问到数据了

  * 而且 因为路径问题， 图片地址也需要使用 replace 用空字符串 代替部分路径

    

  * @/api/products.js

    ```js
    // 使用了 axios
    import axios from 'axios'
    
    function getAllProducts(method) {
      // 参数是 products/actions 的匿名方法
      if (typeof method === 'function') {
        axios.get('/products.json').then((response) => {
          /* 
          调用 actions的 getAllProducts方法，
            将获取的数据作参数交给 actions/getAllProdcts方法
          function (data) {
            commit('GET_ALL_PRODUCTS', data)
          }
          */
          const products = response.data.products
          // 修改图片地址
          for (let i = 0; i < products.length; i++) {
            products[i].image = products[i].image.replace(/static/, '')
          }
          method(products)
        })
      } else {
        window.console.log('Invalid type of arguments.')
      }
    }
    
    export default {
      getAllProducts,
    }
    
    ```

    

  * @/api/index.js

    ```js
    import products from './products'
    export default {
      products,
    }
    
    ```





## layouts/index.vue



* 就进门的那个动画的 布局，不舍得删啊，太酷炫了（狗头）

  * ~/layouts/index.vue

    ```vue
    <template>
      <div>
        <Nuxt />
      </div>
    </template>
    
    <style>
    html {
      font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 16px;
      word-spacing: 1px;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      box-sizing: border-box;
    }
    
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
    }
    
    .button--green {
      display: inline-block;
      border-radius: 4px;
      border: 1px solid #3b8070;
      color: #3b8070;
      text-decoration: none;
      padding: 10px 30px;
    }
    
    .button--green:hover {
      color: #fff;
      background-color: #3b8070;
    }
    
    .button--grey {
      display: inline-block;
      border-radius: 4px;
      border: 1px solid #35495e;
      color: #35495e;
      text-decoration: none;
      padding: 10px 30px;
      margin-left: 15px;
    }
    
    .button--grey:hover {
      color: #fff;
      background-color: #35495e;
    }
    
    /* 入口按键 */
    .button--purple:hover {
      color: #fff;
      background-color: purple;
    }
    
    .button--purple {
      display: inline-block;
      border-radius: 4px;
      border: 1px solid purple;
      color: purple;
      text-decoration: none;
      padding: 10px 30px;
      margin-left: 15px;
    }
    
    .button--purple:hover {
      color: #fff;
      background-color: purple;
    }
    </style>
    
    ```





## pages/index.vue



* 就那个 开始的页面内容，就三个按钮啦
  * ~/pages/index.vue

    ```vue
    <template>
      <div class="container">
        <div>
          <Logo />
          <h1 class="title">petstore-nuxt</h1>
          <div class="links">
            <a
              href="https://nuxtjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              class="button--green"
            >
              Documentation
            </a>
            <a
              href="https://github.com/nuxt/nuxt.js"
              target="_blank"
              rel="noopener noreferrer"
              class="button--grey"
            >
              GitHub
            </a>
            <!-- 添加 去 main 的按钮 -->
            <a
              href="/main"
              target="_blank"
              rel="noopener noreferrer"
              class="button--purple"
            >
              Main
            </a>
          </div>
        </div>
      </div>
    </template>
    
    <script>
    export default {
      layout: 'index',
    }
    </script>
    
    <style>
    .container {
      margin: 0 auto;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    
    .title {
      font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      display: block;
      font-weight: 300;
      font-size: 100px;
      color: #35495e;
      letter-spacing: 1px;
    }
    
    .subtitle {
      font-weight: 300;
      font-size: 42px;
      color: #526488;
      word-spacing: 5px;
      padding-bottom: 15px;
    }
    
    .links {
      padding-top: 15px;
    }
    </style>
    
    ```





## layouts/default.vue



* 就是默认页面的布局啦，这里需要导入 导航栏的 组件，是的，应该把布局页面简化嘛

* 需要注意的是 如果想解决 滚动条问题， 在 style 设置， 但千万不要写上 scoped 属性

  * ~/layouts/default.vue

    ```vue
    <template>
      <div id="app">
        <!-- 顶部栏 -->
        <navbar></navbar>
        <!-- 内容 -->
        <Nuxt />
      </div>
    </template>
    <script>
    // 导入导航条
    import Navbar from '~/components/Navbar'
    export default {
      components: {
        Navbar,
      },
    }
    </script>
    
    <style>
    /* 滚动条修改 */
    html {
      overflow-y: overlay;
    }
    #app {
      padding: 0 20px;
    }
    </style>
    
    <!--
    <template>
      <div>
        <nuxt-link to="/main">main页面</nuxt-link>
        <nuxt-link to="/form">form页面</nuxt-link>
        <Nuxt />
      </div>
    </template>
    -->
    
    ```

  

  那就去创建 NavBar





## components/Navbar.vue



* 就是之前 的 Header.vue 啦

* 不过这里使用了nuxt-link 代替了 router-link ，这里影响不大

  * ~/components/Navbar.vue

    ```vue
    <template>
      <!-- 顶部栏 -->
      <div class="header">
        <div class="top-bar">
          <a-row type="flex">
            <!-- 左侧网站名 -->
            <a-col
              :span="8"
              :offset="2"
              :xs="{ span: 24, offset: 0 }"
              :sm="{ span: 12, offset: 0 }"
            >
              <h1>
                <nuxt-link to="/main">Vue.js Pet Depot</nuxt-link>
                <!-- <router-link :to="{name: 'iMain'}">Vue.js Pet Depot</router-link> -->
              </h1>
            </a-col>
            <!-- 右侧购物车 -->
            <a-col
              :span="6"
              :offset="8"
              :xs="{ span: 24, offset: 0 }"
              :sm="{ span: 12, offset: 0 }"
            >
              <nuxt-link to="/form">
                <a-button size="large" :class="buttonClass"
                  ><a-icon type="shopping-cart" />
                  <span>{{ cartItemCount }} Checkout</span>
                </a-button>
              </nuxt-link>
              <!--
              <router-link :to="{name: 'Form'}">
                <a-button size="large" :class="buttonClass">
                  <a-icon type="shopping-cart" />
                  <span>{{cartItemCount}} Checkout</span>
                </a-button>
              </router-link>
              -->
            </a-col>
          </a-row>
        </div>
      </div>
    </template>
    <script>
    export default {
      // props: ["cartItemCount"],
      data() {
        return {}
      },
      computed: {
        cartItemCount() {
          // return this.$store.getters.item.length;
          return this.$store.getters['shoppingCart/number']
        },
        // 通过页面检测是否激活样式
        buttonClass() {
          if (this.$route.path === '/form') {
            return {
              'router-link-exact-active': {
                color: '#1890ff',
              },
            }
          } else {
            return ''
          }
        },
      },
    }
    </script>
    
    <style scoped>
    /* 顶部栏颜色 */
    .header .top-bar {
      background-color: rgb(0, 21, 41);
    }
    /* 左侧main按键 */
    .header .top-bar .ant-col {
      line-height: 90px;
      text-align: center;
    }
    /* 左侧main按键字体 */
    .header .top-bar .ant-col h1 {
      font-size: 36px;
      margin: 0;
    }
    /* 未点击按钮颜色 */
    a {
      text-decoration: none;
      color: gray;
    }
    /* 点击后颜色 */
    .nuxt-link-exact-active {
      color: #1890ff;
    }
    /* 
    .router-link-exact-active {
      color: #1890ff;
    } 
    */
    </style>
    
    <!--
    <template>
      <div>
        <nuxt-link to="/main">main页面</nuxt-link>
        <nuxt-link to="/form">form页面</nuxt-link>
        <Nuxt />
      </div>
    </template>
    -->
    
    ```





## pages/main



* 在 pages 创建 main/index.vue

  * ~/pages/main/index.vue

    ```vue
    <template>
      <!-- 计算库存信息 -->
      <div class="container">
        <!-- <my-header></my-header> -->
        <!-- 设置菜单栏 -->
        <div class="main">
          <!-- 循环物品清单每一行显示一个信息 -->
          <div v-for="product of products" :key="product.id" class="list">
            <a-row type="flex" justify="center" align="middle" class="list-row">
              <!-- 商品图片 -->
              <a-col :span="8">
                <img
                  class="product-img"
                  :src="product.image"
                  :alt="product.title"
                />
              </a-col>
              <!-- 商品信息 -->
              <a-col class="list-information" :span="14">
                <!--
                <router-link
                  tag="h1"
                  :to="{ name: 'Id', params: { id: product.id } }"
                  >{{ product.title }}</router-link
                >
                -->
                <nuxt-link
                  tag="h1"
                  :to="{
                    path: '/product/' + product.id,
                    params: { id: product.id },
                  }"
                  >{{ product.title }}</nuxt-link
                >
                <p v-html="product.description"></p>
                <!-- 价格 使用 filters -->
                <p>{{ product.price | formatPrice }}</p>
                <!-- 购买按钮，如果库存没了改变样式 -->
                <a-button
                  v-if="canAddToCart(product)"
                  type="primary"
                  size="large"
                  @click="addToCart(product)"
                  >Add to cart</a-button
                >
                <!-- 库存没了的购买按钮样式 -->
                <a-button v-else type="primary" size="large" disabled
                  >Add to cart</a-button
                >
                <!-- 添加动画效果 -->
                <transition name="bounce" mode="out-in">
                  <!-- 提示库存量信息 -->
                  <span
                    v-if="product.availableInventory - cartCount(product.id) === 0"
                    key="0"
                    class="inventory-message"
                    >All Out!</span
                  >
                  <span
                    v-else-if="
                      product.availableInventory - cartCount(product.id) < 5
                    "
                    key=""
                    class="inventory-message"
                    >Only
                    {{ product.availableInventory - cartCount(product.id) }}
                    left!!!</span
                  >
                  <span v-else key="" class="inventory-message">Buy Now!</span>
                </transition>
                <div class="rating">
                  <span v-for="(i, index) of 5" :key="index">
                    <!-- 使用方法确定star图标的theme值，返回一个字符串 -->
                    <a-icon
                      class="star"
                      type="star"
                      :theme="checkRating(index, product.rating)"
                    />
                  </span>
                  <!-- 
                  <span v-for="star of product.rating" :key="star">
                    <a-icon type="star" theme="filled" />
                  </span>
                  <span v-for="star of 5 - product.rating" :key="star">
                    <a-icon type="star" theme="outlined" />
                  </span>
                  -->
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
    </template>
    <script>
    import { dispatchProductsStore } from '@/mixins/productsStore.js'
    export default {
      /*
      components: {
        MyHeader,
      },
      */
      // 创建过滤器
      filters: {
        formatPrice(price) {
          // 参数如果不是数字
          if (!parseInt(price)) {
            return '0.00'
          }
          // 为价格添加小数点
          let priceString = (price / 100).toFixed(2)
          // 如果价格大于99999用逗号分隔3位
          if (price > 99999) {
            // 将价格设置为数组
            const priceArray = priceString.split('').reverse()
            // 设置位移量
            let index = 3
            while (priceArray.length > index + 3) {
              // 在数组中每3位插入 ,
              priceArray.splice(index + 3, 0, ',')
              index += 4
            }
            // 将数组转换成字符串
            priceString = priceArray.reverse().join('')
          }
          return '$ ' + priceString
        },
      },
    
      mixins: [dispatchProductsStore],
      /*
      被 mixins 取代
      // 创建虚拟DOM时获取物品清单
      // created: function () {
      //   使用 store 接收数据，所以注释掉
      //   this.axios.get("/static/products.json").then((response) => {
      //     this.products = response.data.products;
      //     console.log(this.products);
      //   });
        
      //   this.$store.dispatch("products/getAllProducts");
      // },
      */
      data() {
        return {
          // 商品
          products: [],
          // 购物车，加入 store 后注释掉
          // cart: [],
        }
      },
      computed: {
        /*
        products: function () {
          // 当 vue 检测到 getters的值发生变化，就能完成赋值
          return this.$store.getters["products/all"];
        },
        */
        cart() {
          // return this.$store.state.shoppingCart.item
          return this.$store.getters['shoppingCart/item']
        },
        // 购物车中商品数量，显示在右上角
        // 需要使用 props 传给 my-header
        // cartItemCount: function () {
        //   return this.cart.length || "";
        // },
      },
      watch: {
        // 监听 store 的 products 的 state 中的 all，
        // 异步完成后数据就会刷新
    
        '$store.state.products.all'(newVal) {
          // window.console.log(newVal)
          this.products = newVal
        },
      },
    
      methods: {
        // 检测rating循环来判定星星是否实体
        checkRating(index, rating) {
          if (index < rating) {
            return 'filled'
          } else {
            return 'outlined'
          }
        },
        // 点击添加商品到购物车
        addToCart(product) {
          this.$store.dispatch('shoppingCart/addToCart', product.id)
          // this.cart.push(product.id);
        },
        // 计算库存信息
        canAddToCart(product) {
          return product.availableInventory > this.cartCount(product.id)
        },
        // 计算购物车中的同一商品数量
        cartCount(productId) {
          let count = 0
          for (let i = 0; i < this.$store.getters['shoppingCart/number']; i++) {
            if (productId === this.cart[i]) {
              count++
            }
          }
          return count
        },
      },
      head: {
        title: 'petstore-main',
      },
    }
    </script>
    <style lang="css" scoped>
    .main {
      position: relative;
      top: 0px;
      /* 减去90px， 不然看不见滚动条末端 */
      /* height: calc(100% - 90px); */
      width: 100%;
      /* overflow: scroll; */
      padding: 100px 0;
    }
    /* 每个商品 */
    .main .list .list-row {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding: 40px 0;
    }
    /* 图片 */
    .main .list .product-img {
      max-width: 386px;
    }
    /* 商品描述区域 */
    .main .list .list-information {
      padding: 0 15px;
      width: 500px;
    }
    /* 商品名的字体 */
    .main .list .list-information p {
      font-size: 150%;
    }
    /* 购买提示语 */
    .main .list .list-information .inventory-message {
      font-size: 150%;
      margin-left: 20px;
      font-weight: bold;
      display: inline-block;
    }
    /* 星星评分 */
    .main .list .list-information .rating {
      float: right;
      font-size: 0px;
      /* 这里要设置 0px，将字体大写交给子元素设置，
      可以避免标签换行显示出空格的问题 */
    }
    .main .list .list-information .rating .star {
      font-size: 20px;
      padding: 0 0px;
    }
    
    /* All out 动画效果 */
    .bounce-enter-active {
      animation: shake 0.72s cubic-bezier(0.37, 0.07, 0.19, 0.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
    }
    
    @keyframes shake {
      10%,
      90% {
        color: red;
        transform: translate3d(-1px, 0, 0);
      }
    
      20%,
      80% {
        transform: translate3d(2px, 0, 0);
      }
    
      30%,
      50%,
      70% {
        color: red;
        transform: translate3d(-4px, 0, 0);
      }
    
      40%,
      60% {
        transform: translate3d(4px, 0, 0);
      }
    }
    </style>
    <!--
    <template>
      <div>
        <h1>main頁面</h1>
        <ul>
          <li v-for="index in 5" :key="index">
            <nuxt-link :to="{ path: '/product/' + index, params: { id: index } }">
              {{ index }}</nuxt-link
            >
          </li>
        </ul>
      </div>
    </template>
    
    <script>
    export default {
      layout: 'default',
    }
    </script>
    
    <style></style>
    -->
    
    ```





## pages/form



* 在 pages 创建 form/index.vue

  * ~/pages/form/index.vue

    ```vue
    <template>
      <div class="container">
        <!-- <my-header></my-header> -->
        <!-- 表单 -->
        <a-row class="form" type="flex" justify="center">
          <!-- 表单长度 -->
          <a-col class="panel" :xs="xsSize" :md="mdSize" :lg="lgSize">
            <!-- 表单标题 -->
            <a-row class="panel-header">
              <a-col>Pet Depot Checkout</a-col>
            </a-row>
    
            <!-- 表单内容 -->
            <a-row class="panel-body">
              <a-form-model ref="ruleForm" :model="order" :rules="rules">
                <a-col>
                  <!-- 第一行 -->
                  <a-row>
                    <a-col>
                      <h4>
                        <strong>Enter Your Information</strong>
                      </h4>
                    </a-col>
                  </a-row>
    
                  <!-- 第二行 -->
                  <a-row type="flex">
                    <!-- 名字 -->
                    <a-col :flex="10">
                      <!-- <strong>First Name:</strong> -->
                      <a-form-model-item
                        ref="name"
                        label="First Name"
                        prop="firstName"
                      >
                        <a-input v-model="order.firstName" />
                      </a-form-model-item>
                    </a-col>
    
                    <!-- 姓名 -->
                    <a-col :flex="10">
                      <!-- <strong>last Name:</strong> -->
                      <a-form-model-item label="Last Name" prop="lastName">
                        <a-input v-model.trim="order.lastName"></a-input>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
    
                  <!-- 第三行 -->
                  <a-row>
                    <!-- 地址栏 -->
                    <a-col>
                      <!-- <strong>Address:</strong> -->
                      <a-form-model-item label="Address" prop="address">
                        <a-input v-model="order.address"></a-input>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
    
                  <!-- 第四行 -->
                  <a-row>
                    <!-- 城市 -->
                    <a-col>
                      <!-- <strong>City:</strong> -->
                      <a-form-model-item label="City" prop="city">
                        <a-input v-model="order.city"></a-input>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
    
                  <!-- 第五行 -->
                  <a-row type="flex" justify="space-between">
                    <!-- 地区 -->
                    <a-col :flex="10">
                      <!-- <strong>State:</strong> -->
                      <a-form-model-item label="State" prop="state">
                        <a-select v-model="order.state" style="width: 120px">
                          <a-select-option value disabled>state</a-select-option>
                          <a-select-option
                            v-for="(state, name) in states"
                            :key="state"
                            >{{ name }}</a-select-option
                          >
                        </a-select>
                      </a-form-model-item>
                    </a-col>
    
                    <!-- 邮政号 -->
                    <a-col :flex="7">
                      <!-- <strong>Zip / Postal Code:</strong> -->
                      <a-form-model-item label="Zip / Postal Code" prop="zip">
                        <a-input v-model="order.zip"></a-input>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
    
                  <!-- 第六行 -->
                  <a-row
                    type="flex"
                    justify="space-between"
                    style="padding-top: 20px"
                  >
                    <!-- 确认是否礼物 -->
                    <a-col>
                      <a-form-model-item>
                        <a-switch @change="onChange" />
                        <strong>&nbsp;Ship As Gift?</strong>
                      </a-form-model-item>
                    </a-col>
    
                    <!-- 确认地址属性 -->
                    <a-col style="float: right">
                      <a-form-model-item>
                        <a-radio-group v-model="order.method" button-style="solid">
                          <a-radio-button
                            v-for="(method, name) in methods"
                            :key="name"
                            :value="method"
                            >{{ name }}</a-radio-button
                          >
                        </a-radio-group>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
    
                  <!-- 第七行 -->
                  <a-row type="flex" justify="center" class="button">
                    <!-- 确认按钮 -->
                    <a-col>
                      <a-button size="large" type="primary" @click="submitForm"
                        >Place Order</a-button
                      >
                    </a-col>
                  </a-row>
    
                  <!-- 第八行 -->
                  <a-row>
                    <a-col>
                      <pre>
                        First Name: {{ order.firstName }}
                        Last Name:  {{ order.lastName }}
                        Address:    {{ order.address }}
                        City:       {{ order.city }}
                        Zip:        {{ order.zip }}
                        State:      {{ order.state }}
                        Method:     {{ order.method }}
                        Gift:       {{ order.gift }}
                    </pre
                      >
                    </a-col>
                  </a-row>
                </a-col>
              </a-form-model>
            </a-row>
          </a-col>
        </a-row>
      </div>
    </template>
    <script>
    // import MyHeader from './Header'
    export default {
      components: {
        // MyHeader,
      },
      data() {
        return {
          mdSize: {
            span: 24,
          },
          lgSize: {
            span: 14,
          },
          xsSize: {
            span: 24,
          },
          states: {
            AL: 'Alabama',
            AK: 'Alaska',
            AR: 'Arizona',
            CA: 'California',
            NV: 'Nevada',
          },
          gift: {
            sendGift: 'Send As A Gift',
            dontSendGift: 'Do Not Send As A Gift',
          },
          methods: {
            Home: 'Home Address',
            Business: 'Business Address',
          },
          order: {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            gift: 'Do Not Send As A Gift',
            method: 'Home Address',
          },
          rules: {
            firstName: [
              {
                required: true,
                message: 'Please input Activity firstName',
                trigger: 'blur',
              },
              {
                min: 3,
                max: 20,
                message: 'Length should be 3 to 5',
                trigger: 'blur',
              },
            ],
            lastName: [
              {
                required: true,
                message: 'Please input Activity lastName',
                trigger: 'blur',
              },
              {
                min: 3,
                max: 20,
                message: 'Length should be 3 to 5',
                trigger: 'blur',
              },
            ],
            address: [
              {
                required: true,
                message: 'Please input Activity address',
                trigger: 'blur',
              },
            ],
            city: [
              {
                required: true,
                message: 'Please input Activity city',
                trigger: 'blur',
              },
            ],
            state: [
              {
                required: true,
                message: 'Please select Activity state',
                trigger: 'change',
              },
            ],
            zip: [
              {
                required: true,
                message: 'Please input Activity zip',
                trigger: 'blur',
              },
            ],
          },
        }
      },
    
      methods: {
        // 礼物开关判定
        onChange(checked) {
          this.order.gift = checked ? this.gift.sendGift : this.gift.dontSendGift
          window.console.log(this.order.gift)
        },
        submitForm() {
          this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              alert('submit!')
            } else {
              window.console.log('error submit!!')
              return false
            }
          })
        },
      },
      head: {
        title: 'petstore-form',
      },
    }
    </script>
    
    <style lang="css" scoped>
    .form {
      position: relative;
      width: 100%;
      top: 30px;
      height: calc(100% - 90px);
      padding-bottom: 50px;
      /* overflow: scroll;
      overflow-x: hidden; */
    }
    .form .panel {
      display: block;
      border: 1px solid #bce8f1;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      margin: 0 0px;
    }
    .form .panel .panel-header {
      color: #31708f;
      background-color: #d9edf7;
      padding: 10px 15px;
      border-bottom: 1px solid transparent;
      width: 100%;
      font-size: 18px;
    }
    .form .panel .panel-body {
      padding: 15px;
    }
    .form .panel .panel-body .ant-col {
      margin: 0px 15px;
      /* font-size: 16px; */
    }
    /* 取消 加入form-item的位置样式 */
    /*
    .form .panel .panel-body .ant-col .ant-form-item {
      margin: 0px; 
      设置字体样式
      font-size: 16px;
    }
    */
    .form .panel .panel-body h4 {
      font-size: 20px;
      margin: 0;
    }
    
    .form .panel .panel-body .button {
      padding-bottom: 20px;
    }
    .form .panel .panel-body pre {
      display: block;
      padding: 9.5px;
      margin: 0 0 10px;
      font-size: 13px;
      line-height: 1.42857143;
      color: #333;
      word-break: break-all;
      word-wrap: break-word;
      background-color: #f5f5f5;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    </style>
    <!--
    <template>
      <div>
        <h1>form頁面</h1>
      </div>
    </template>
    
    <script>
    export default {
      layout: 'default',
    }
    </script>
    
    <style></style>
    -->
    
    ```





## pages/product



* 结构回顾

  ```js
  └── product (文件夹)
      │
      ├── _id.vue						# 动态路由
      │
      └── _id (文件夹)
          │
          └── editProduct (文件夹)
              │.  
              └─ index.vue			 # 动态路由下子路由
  ```



* 先创建 _id.vue

  * 这里感觉不太适合用 nuxt-child v-show 没啥反应，nuxt 使用router 跳转 一般都是 path属性决定，记得要写上根路径，不然会在当前路径不断叠加后缀

    * （ex: product/1001/1001/1001/1001/editProduct)

  * @/pages/product/_id.vue

    ```vue
    <template>
      <!-- 计算库存信息 -->
      <div class="container">
        <!-- <my-header></my-header> -->
        <!-- 设置菜单栏 -->
        <div class="main">
          <!-- 循环物品清单每一行显示一个信息 -->
          <div class="list">
            <a-row type="flex" justify="center" align="middle" class="list-row">
              <!-- 商品图片 -->
              <a-col :span="8">
                <img
                  class="product-img"
                  :src="product.image"
                  :alt="product.title"
                />
              </a-col>
              <!-- 商品信息 -->
              <a-col class="list-information" :span="14">
                <h1>{{ product.title }}</h1>
                <p v-html="product.description"></p>
                <!-- 价格 使用 filters -->
                <p>{{ product.price | formatPrice }}</p>
                <!-- 
                  v-show 本身就是一种动画，https://www.zhihu.com/question/290232930 ，
                  多个 v-show transition 处理不了， 要用 transition-group，
                  或者使用 v-if 使用 keep-alive 减少切换消耗
                添加修改按钮
                <a-button v-show="editPageState" size="large" v-on:click="edit()" key="1">Edit Product </a-button>
                添加关闭按钮
                <a-button v-show="!editPageState" size="large" v-on:click="closeEdit()" key="0">Close</a-button>
                添加按钮动画效果 与 editProduct 匹配
                -->
                <transition name="edit-product-button" mode="out-in">
                  <keep-alive>
                    <a-button
                      v-if="editPageState"
                      key="Edit"
                      size="large"
                      @click="edit()"
                      >Edit Product
                    </a-button>
                    <a-button v-else key="Close" size="large" @click="closeEdit()"
                      >Close</a-button
                    >
                  </keep-alive>
                </transition>
                <div class="rating">
                  <span v-for="(i, index) of 5" :key="index">
                    <!-- 使用方法确定star图标的theme值，返回一个字符串 -->
                    <a-icon
                      class="star"
                      type="star"
                      :theme="checkRating(index, product.rating)"
                    />
                  </span>
                </div>
              </a-col>
            </a-row>
            <transition name="edit-product" mode="out-in">
              <!-- 显示 修改 页面 -->
              <router-view v-show="!editPageState"></router-view>
            </transition>
          </div>
        </div>
      </div>
    </template>
    <script>
    // import MyHeader from './Header'
    import { dispatchProductsStore } from '@/mixins/productsStore'
    
    export default {
      filters: {
        formatPrice(price) {
          // 参数如果不是数字
          if (!parseInt(price)) {
            return '0.00'
          }
          // 为价格添加小数点
          let priceString = (price / 100).toFixed(2)
          // 如果价格大于99999用逗号分隔3位
          if (price > 99999) {
            // 将价格设置为数组
            const priceArray = priceString.split('').reverse()
            // 设置位移量
            let index = 3
            while (priceArray.length > index + 3) {
              // 在数组中每3位插入 ,
              priceArray.splice(index + 3, 0, ',')
              index += 4
            }
            // 将数组转换成字符串
            priceString = priceArray.reverse().join('')
          }
          return '$ ' + priceString
        },
      },
      components: {
        // MyHeader,
      },
      mixins: [dispatchProductsStore],
      /*
        被 mixin 取代
      created() {
        this.$store.dispatch("products/getAllProducts");
    
        // 这种一刷新就丢失了数据，因为刷新后 store 清空了
        // 但是访问页面有时直接访问单个，不应该丢失
        // this.product = this.$store.getters["products/all"].filter(
        //   (data) => data.id == this.$route.params.id
        // )[0];
        // this.product.image = "/" + this.product.image;
        // console.log(this.product);
    
      },
      */
    
      data() {
        return {
          product: {},
          // 是否显示修改页面
          editPageState: true,
        }
      },
      watch: {
        '$store.state.products.all'(oldVal, newVal) {
          // this.product = this.$store.getters['products/all'].filter(
          //   (data) => data.id === this.$route.params.id
          // )[0]
          // // this.product.image = '/' + this.product.image
          // this.product.image = this.product.image.replace(/static/, '')
          this.product = this.$store.getters['products/all'].filter(
            // 因为是三个等于号，类型也要匹配，所以要转数字
            (data) => data.id === Number(this.$route.params.id)
          )[0]
        },
      },
    
      methods: {
        edit() {
          // 其实不用传 id，如果刷新页面，没按按钮，就不传id了，肯定获取不了数据
          // 而 因为 用了 router-view，其实 path一直都有进入这个页面的id参数
          // this.$router.push({ name: "EditProduct", params: { productId: id } });
          // this.$router.push({ name: 'EditProduct' })
          // this.$router.push({ path: `${this.$route.params.id}/editProduct` })
          // 这是不行的，因为每次都在本路径添加后name缀url，会变成 1001/1001/1001/editProduct
          this.$router.push({
            path: `/product/${this.$route.params.id}/editProduct`,
          })
          this.editPageState = false
        },
        closeEdit() {
          // this.$router.push({ path: `/product/${this.$route.params.id}` })
          this.editPageState = true
        },
        // 检测rating循环来判定星星是否实体
        checkRating(index, rating) {
          if (index < rating) {
            return 'filled'
          } else {
            return 'outlined'
          }
        },
      },
      head: {
        title: 'petstore-product',
      },
    }
    </script>
    <style lang="css" scoped>
    .main {
      position: relative;
      top: 0px;
      /* 减去90px， 不然看不见滚动条末端 */
      /* height: calc(100% - 90px); */
      width: 100%;
      /* overflow: scroll; */
      padding: 100px 0;
    }
    /* 每个商品 */
    .main .list .list-row {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding: 40px 0;
    }
    /* 图片 */
    .main .list .product-img {
      max-width: 386px;
    }
    /* 商品描述区域 */
    .main .list .list-information {
      padding: 0 15px;
      width: 500px;
    }
    /* 商品名的字体 */
    .main .list .list-information p {
      font-size: 150%;
    }
    /* 按键大小 */
    .main .list .list-information .ant-btn-lg {
      width: 120px;
    }
    /* 星星评分 */
    .main .list .list-information .rating {
      float: right;
      font-size: 0px;
      /* 这里要设置 0px，将字体大写交给子元素设置，
      可以避免标签换行显示出空格的问题 */
    }
    .main .list .list-information .rating .star {
      font-size: 20px;
      padding: 0 0px;
    }
    
    /* 页面显示的过渡属性 */
    .edit-product-enter-active {
      transition: all 1s ease;
    }
    /* 页面消失的过度属性 */
    .edit-product-leave-active {
      transition: all 1s ease;
    }
    /* 页面显示时开始，元素被插入之前状态 */
    .edit-product-enter {
      opacity: 0;
      transform: translateY(500px);
    }
    /* 页面显示时开始，元素消失的结束状态 */
    .edit-product-leave-to {
      opacity: 0;
      transform: translateY(500px);
    }
    /* 按键过渡属性 */
    .edit-product-button-enter-active,
    .edit-product-button-leave-active {
      transition: all 1s ease;
    }
    /* 按键过渡开始跟结束状态 */
    .edit-product-button-enter,
    .edit-product-button-leave-to {
      opacity: 0;
      transform: translateX(120px);
    }
    </style>
    <!--
    <template>
      <div>
        <h1>Product Id: {{ $route.params.id }}</h1>
        <nuxt-link :to="'/product/' + $route.params.id + '/editProduct'"
          >修改页面</nuxt-link
        >
    
        <nuxt-child />
      </div>
    </template>
    <script>
    export default {
      layout: 'default',
    }
    </script>
    -->
    
    ```

    



* _id\editProduct\index.vue

  * 这个没啥特别的

  * @/pages/product/_id/editProduct/index.vue

    ```vue
    <template>
      <a-row type="flex" class="list-row form-row" align="middle">
        <a-col span="18">
          <a-form-model
            ref="ruleForm"
            :model="product"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="Title" prop="title">
              <a-input v-model="product.title"></a-input>
            </a-form-model-item>
            <a-form-model-item label="Description" prop="description">
              <a-input v-model="product.description" type="textarea"></a-input>
            </a-form-model-item>
            <a-form-model-item label="Price" prop="price">
              <a-input-number v-model="product.price"></a-input-number>
            </a-form-model-item>
            <a-form-model-item label="Rating" prop="rating">
              <a-input-number
                v-model="product.rating"
                :min="0"
                :max="5"
              ></a-input-number>
            </a-form-model-item>
            <a-form-model-item label="AvailableInventory" prop="availableInventory">
              <a-input-number
                v-model="product.availableInventory"
                :min="0"
              ></a-input-number>
            </a-form-model-item>
          </a-form-model>
        </a-col>
        <a-col>
          <a-button size="large" type="primary">Submit</a-button>
        </a-col>
      </a-row>
    </template>
    <script>
    export default {
      data() {
        return {
          labelCol: {
            span: 5,
          },
          wrapperCol: {
            span: 14,
          },
          rules: {},
        }
      },
      computed: {
        // 进入页面后获取数据，如果获取不到就 dispatch store
        // 用 $store.state来判断数据，如果一改变，计算属性就更新
        product() {
          if (this.$store.state.products.all) {
            return this.$store.getters['products/all'].filter(
              (data) => data.id === Number(this.$route.params.id)
            )[0]
          } else {
            this.$store.dispatch('products/getAllProducts')
            return {}
          }
        },
      },
      methods: {},
      head: {
        title: 'petstore-editProduct',
      },
    }
    </script>
    <style lang="css" scoped>
    .form-row {
      background-color: #f5f5f5;
    }
    </style>
    <!--
    <template>
      <div>
        <h2>editProduct 页面</h2>
      </div>
    </template>
    
    <script>
    export default {
      layout: 'default',
    }
    </script>
    
    <style></style>
    -->
    
    ```

    

