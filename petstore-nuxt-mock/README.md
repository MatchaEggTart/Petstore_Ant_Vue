# 前言



这里使用了 EasyMock 和 Vue-infinite-scroll（瀑布流）





# EasyMock



网站 https://easy-mock.com/



账号 petstore-mock



https://easy-mock.com/mock/5f7d9efff9d9bd19dca628e4/petstore-mock/products



## 创建 petstore-mock 接口数据



* 先创建 /products 接口
  * Get 请求
  * https://easy-mock.com/mock/5f7d9efff9d9bd19dca628e4/petstore-mock/products

* 编辑接口

  * 模拟40个数据吧

    ```js
    {
      "products|40": [{
        "id|+1": 1010,
        "title": "@ctitle(3,10)",
        "description": "@cword(3,20)",
        "price": "@integer(0, 100000)",
        "image": "@image(300x300, #000000)",
        "availableInventory": "@integer(0, 12)",
        "rating": "@integer(1,5)"
      }]
    }
    
    ```

    



## 我遇到的问题



* 其实就是浏览器觉得是不安全链接，高级 继续浏览页面，基本上就解决了



### 跨域

* 会面临跨域问题

* 在 nuxt.config.js 设置 modules、axios、proxy 配置
  * 参考 https://blog.csdn.net/lemisi/article/details/99637257

  * @/nuxt.config.js

    ```js
    modules: [
      // https://go.nuxtjs.dev/axios
      '@nuxtjs/axios',
      // '@nuxtjs/proxy',
    ],
    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
      proxy: true,
      credentials: true,
    },
    proxy: {
      '/api': {
        target: 'https://easy-mock.com/mock/5f7d9efff9d9bd19dca628e4/petstore-mock/products',
        changeOrigin: true,
      },
    },
    ```

    

### 证书

* 还有 easy mock 证书问题

* 参考 https://www.cnblogs.com/wao3/p/axios_ignore_ssl.html

* 在 index 加入这段代码 测试，看能不能拿到数据

  * @/pages/index.vue

    ```js
    import https from 'https'
    import axios from 'axios'
    
    export default {
      asyncData() {
        const ignoreSSL = axios.create({
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        })
        ignoreSSL.get(
          'https://easy-mock.com/mock/5f7d9efff9d9bd19dca628e4/petstore-mock/products'
        )
    
        // 在 axios 请求时，选择性忽略 SSL
        const agent = new https.Agent({
          rejectUnauthorized: false,
        })
        return axios
          .get(
            'https://easy-mock.com/mock/5f7d9efff9d9bd19dca628e4/petstore-mock/products',
            { httpsAgent: agent }
          )
          .then((response) => {
            console.log(JSON.stringify(response.data))
          })
      },
    }
    ```

    



### 跨域 时区 问题

* net::ERR_CERT_AUTHORITY_INVALID 问题

* easymock 的时间 跟 中国时间好像差距了 8 小时

* 参考 https://blog.csdn.net/KaiSarH/article/details/108134076
  * 先去 链接页面 选择 高级 继续前往 这样就OK，这个方法连上面的 证书问题 跟 跨域 都解决了





## 开始配置





## api/products 链接 mock



* 修改 api 的 products.js

  * @/api/products.js

    ```js
    // import https from 'https'
    
    // 使用了 axios
    import axios from 'axios'
    
    function getAllProducts(method) {
      // 参数是 products/actions 的匿名方法
      if (typeof method === 'function') {
        // const ignoreSSL = axios.create({
        //   httpsAgent: new https.Agent({
        //     rejectUnauthorized: false,
        //   }),
        // })
        // ignoreSSL.get(
        //   'https://easy-mock.com/mock/5f7d9efff9d9bd19dca628e4/petstore-mock/products'
        // )
    
        // // 在 axios 请求时，选择性忽略 SSL
        // const agent = new https.Agent({
        //   rejectUnauthorized: false,
        // })
        axios
          .get(
            'https://easy-mock.com/mock/5f7d9efff9d9bd19dca628e4/petstore-mock/products'
            // { httpsAgent: agent }
          )
          .then((response) => {
            method(response.data.products)
          })
      } else {
        window.console.log('Invalid type of arguments.')
      }
    }
    
    export default {
      getAllProducts,
    }
    
    ```



## Vuex 会出现问题



* 问题

  ```js
  [vuex] do not mutate vuex store state outside mutation handlers.
  ```

  

* 原因
  * 在 editProduct.vue 出现这个问题， 因为双向绑定还用了 computed 来，会 让 product 于 this.$store.getters['products/all'] 实现双向绑定， 改变 product 数据会导致 store 里的 数据也发生改变， 
  * 而不通过 mutation 来修改 store 的值， 那就报错



* 方法

  1. 应该使用 JSON.parse(JSON.stringify()) 来赋值， 避免双向绑定

     ```js
     var a = JSON.parse(JSON.stringify(b))
     ```

  

  2. 使用 mixins 添加变量 product， 然后判断是否有 router 的 paramas 有 id 属性，有就使用 store，并且使用 JSON.stringify(this.$store.getters['products/all']) === '[]' 来判断是否要 dispatch
     * 但其实不对的， 真实中 数据应该从后台获得，而数据实际上是后台获取，如果后台数据更新了，但是 store 数据不为空， 就不更新， 那其实有问题

  

  * @/mixins/productsStore.js (错误写法： 判断 store 为空来获取数据)

    ```js
    const dispatchProductsStore = {
      data() {
        return {
          products: [],
          product: {},
        }
      },
    
      mounted() {
        if (JSON.stringify(this.$store.getters['products/all']) === '[]') {
          this.$store.dispatch('products/getAllProducts')
        }
        this.products = JSON.parse(
          JSON.stringify(this.$store.getters['products/all'])
        )
        if (this.$route.params.id) {
          this.product = this.products.filter(
            // 因为是三个等于号，类型也要匹配，所以要转数字
            (data) => data.id === Number(this.$route.params.id)
          )[0]
        }
        // console.log("mixin")
      },
    }
    
    export { dispatchProductsStore }
    
    ```

    

  * @/mixins/productsStore.js（好一点写法）

    ```js
    const dispatchProductsStore = {
      data() {
        return {
          products: [],
          product: {},
        }
      },
    
      mounted() {
        this.$store.dispatch('products/getAllProducts')
    
        // console.log("mixin")
      },
      watch: {
        // 监听 store 的 products 的 state 中的 all，
        // 异步完成后数据就会刷新
    
        '$store.state.products.all'(newVal) {
          // window.console.log(newVal)
          this.products = JSON.parse(JSON.stringify(newVal))
          if (this.$route.params.id) {
            this.product = this.products.filter(
              // 因为是三个等于号，类型也要匹配，所以要转数字
              (data) => data.id === Number(this.$route.params.id)
            )[0]
          }
        },
      },
    }
    
    export { dispatchProductsStore }
    
    ```







## 修改其他page的product变量



* 因为已经修改了 product 在 mixin上， 实际所有引用 mixin的组件，都有 product跟 products 的 变量，所以要注释掉

  

  * @/pages/main/index.vue

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
          // products: [],
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
      /*
      watch: {
        // 监听 store 的 products 的 state 中的 all，
        // 异步完成后数据就会刷新
    
        '$store.state.products.all'(newVal) {
          // window.console.log(newVal)
          this.products = newVal
        },
      },
      */
    
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
          // product: {},
          // 是否显示修改页面
          editPageState: true,
        }
      },
      /*
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
      */
    
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
    import { dispatchProductsStore } from '@/mixins/productsStore'
    
    export default {
      mixins: [dispatchProductsStore],
      data() {
        return {
          labelCol: {
            span: 5,
          },
          wrapperCol: {
            span: 14,
          },
          rules: {},
          product: {},
        }
      },
      /*
      computed: {
        // 进入页面后获取数据，如果获取不到就 dispatch store
        // 用 $store.state来判断数据，如果一改变，计算属性就更新
        productTake() {
          if (this.$store.state.products.all) {
            const productV = this.$store.getters['products/all'].filter(
              (data) => data.id === Number(this.$route.params.id)
            )[0]
            return JSON.parse(JSON.stringify(productV))
          } else {
            this.$store.dispatch('products/getAllProducts')
            return {}
          }
        },
      },
      */
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

    

先在可以看到数据了，也没太大问题

但是， 可以更加模块化， api 处理接口， util 处理异步配置





# 优化接口文件



## 思路



* 为了 代码 不重复啊， 不同页面调用同样的 api，那就应该整理下

* 而且之前在 api里做逻辑处理，这很有问题

  ```js
  ├── utils (工具文件夹)
  │   │
  │   └── products.js				# 用来做请求设置，设置 baseurl，和 拦截器、timeout 等 异步配置
  │
  ├── api (接口文件夹)
  │   │
  │   └── products.js				# 真正 api接口，只设置 请求方式跟后缀 url，还有 请求的 body 的数据
  │
  ├── store (store)
  │   │
  │   └── products.js				# 调用接口数据来发请求
  ```





## utils/request



* 又来模块化了，先创建 utlis 工具文件夹，创建 请求工具，用来指定 baseUrl，那么请他页面的请求url就不用写辣么长

  * 好处，可以避免其他调用都要写辣么长的 url， 并且配置好 axios，给其他接口文件调用

  * @/utils/request.js

    ```js
    import axios from 'axios'
    
    // 创建axios实例
    const service = axios.create({
      baseURL: 'https://easy-mock.com/mock/5f7d9efff9d9bd19dca628e4/petstore-mock', // api的base_url
      timeout: 15000, // 请求超时时间
    })
    
    export default service
    
    ```





## api/products



* 辣么修改 api 文件夹的products.js

  * 现在这样写， 就能轻松实现 get、post、delete 那些，要调用也很方便

  * @/api/prodicts.js

    ```js
    const apiName = 'products'
    
    export default {
      // 获取所有商品
      getAllProducts() {
        return request({
          url: `/${apiName}`,
          method: 'get',
        })
      },
    }
    
    ```





## store/products



* 既然修改了 api ，那就要修改 store/products 的 action 方法了，毕竟之前是在 api里做了逻辑处理

  * @/store/product.js

    ```js
    import productsApi from '@/api/products'
    export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
    
    export const state = () => ({
      all: [],
    })
    
    export const getters = {
      all: (state) => state.all,
    }
    
    export const actions = {
      getAllProducts({ commit }) {
        // api.products.getAllProducts((data) => {
        //   commit('GET_ALL_PRODUCTS', data)
        // })
        productsApi.getAllProducts().then((response) => {
          commit('GET_ALL_PRODUCTS', response.data.products)
        })
      },
    }
    
    export const mutations = {
      [GET_ALL_PRODUCTS](state, payload) {
        state.all = payload
      },
    }
    
    ```

    







# 使用瀑布流



## 配置

* 安装

  * 控制台输入

    ```shell
    npm install vue-infinite-scroll --save
    ```

    

* 配置
  * 在 plugins 文件夹创建 vue-infinite-scroll.js

    ```js
    import Vue from 'vue'
    import infiniteScroll from 'vue-infinite-scroll'
    Vue.use(infiniteScroll)
    ```

    

  * 在 nuxt.config.js 添加 plugins 对象，如果有就只要添加 js

    ```js
    plugins: [
      { src: '~plugins/vue-infinite-scroll', ssr: false }
      // ssr 是服务器渲染，因为插件在页面加载，不需要服务器渲染
    ],
    ```

    



## 使用方法



* 在页面的列表使用 v-infinite-scroll="方法"，然后定义方法，每次到页面最下面就会触发这个方法
* 其实使用的就是分页，只是不再是传统分页而已





## 思路



* api 需要添加新的接口方式，毕竟 是不一样的请求，带参数的（狗头）
* 那 easymock 也要添加新的 接口

* 既然 products 数据都是通过 store 获取， 所以要修改 action 里的方法，使用分页！ 而列表循环 :key 绑定的 id ，这里有两个问题

  1. 如果每次制造不一样的 id， 在 跳转到 单个 商品 的 页面时候，会可能出现获取不了的情况，因为刷新了后台数据，url 的参数 id 可能跟 刷新的 store 的数据无法匹配

  2. 如果要使用可能重复的 id， 那 :key 绑定的就不能是 product.id，可以绑定 product.title



## EasyMock 设置



* 添加新的接口

  * /products/search/{page}/{size}

  * POST 请求

  * 编辑接口

    ```js
    {
      "rows|10": [{
        "id|+1": 1010,
        // "id": "@integer(0, 100000)",
        "title": "@ctitle(3,10)",
        "description": "@cword(3,20)",
        "price": "@integer(0, 100000)",
        "image": "@image(300x300, #000000)",
        "availableInventory": "@integer(0, 12)",
        "rating": "@integer(1,5)"
      }]
    }
    ```





## api/procuts



* 添加新的请求方式

  * search 方法

  * 三个参数， page， size， searchMap

    * page 当前页
    * size 每页的显示数量
    * searchMap 这是真的有后台数据用的， 比如审核中的数据不显示，就要放这个状态码来给后台判断

  * @/api/products.js

    ```js
    // import https from 'https'
    
    // 使用了 axios
    // import axios from 'axios'
    import request from '@/utlis/request'
    
    const apiName = 'products'
    
    export default {
      // 获取所有商品
      getAllProducts() {
        return request({
          url: `/${apiName}`,
          method: 'get',
        })
      },
      search(page, size, searchMap) {
        return request({
          url: `/${apiName}/search/${page}/${size}`,
          method: 'post',
          data: searchMap,
        })
      },
    }
    
    // function getAllProducts(method) {
    //   // 参数是 products/actions 的匿名方法
    //   if (typeof method === 'function') {
    //     // const ignoreSSL = axios.create({
    //     //   httpsAgent: new https.Agent({
    //     //     rejectUnauthorized: false,
    //     //   }),
    //     // })
    //     // ignoreSSL.get(
    //     //   'https://easy-mock.com/mock/5f7d9efff9d9bd19dca628e4/petstore-mock/products'
    //     // )
    
    //     // // 在 axios 请求时，选择性忽略 SSL
    //     // const agent = new https.Agent({
    //     //   rejectUnauthorized: false,
    //     // })
    //     axios
    //       .get(
    //         'https://easy-mock.com/mock/5f7d9efff9d9bd19dca628e4/petstore-mock/products'
    //         // { httpsAgent: agent }
    //       )
    //       .then((response) => {
    //         method(response.data.products)
    //       })
    //   } else {
    //     window.console.log('Invalid type of arguments.')
    //   }
    // }
    
    // export default {
    //   getAllProducts,
    // }
    
    ```



​	既然修改了 api， 那又要去修改 store





## store/products



* 添加 search 方法 在 action 上， mutations 不用， 毕竟就是把参数赋值， getAllProducts 跟 search 都是 把 返回结果赋给 state，所以不用修改 mutation

* 传参的时候， 我用了 对象来包裹 分页三参数

  * @/store/prodcuts.js

    ```js
    import productsApi from '@/api/products'
    export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
    
    export const state = () => ({
      all: [],
    })
    
    export const getters = {
      all: (state) => state.all,
    }
    
    export const actions = {
      getAllProducts({ commit }) {
        // api.products.getAllProducts((data) => {
        //   commit('GET_ALL_PRODUCTS', data)
        // })
        productsApi.getAllProducts().then((response) => {
          commit('GET_ALL_PRODUCTS', response.data.products)
        })
      },
      search({ commit }, { page: p, pageSize: s, searchMap: m }) {
        productsApi.search(p, s, m).then((response) => {
          commit('GET_ALL_PRODUCTS', response.data.rows)
        })
      },
    }
    
    export const mutations = {
      [GET_ALL_PRODUCTS](state, payload) {
        state.all = payload
      },
    }
    
    ```





## mixins/productsStore



* 既然参数改了，辣么开始就获取数据的 mixins小组件也要改改

* 我的思路是添加 三个 data 对象，辣么 其他页面不用声明都可以用，虽然增加消耗

  * @/mixins/productsStore

    ```js
    const dispatchProductsStore = {
      data() {
        return {
          products: [],
          product: {},
          page: 1,
          pageSize: 10,
          searchMap: { state: '1' },
        }
      },
    
      mounted() {
        // this.$store.dispatch('products/getAllProducts')
        this.$store.dispatch('products/search', {
          page: this.page,
          pageSize: this.pageSize,
          searchMap: this.searchMap,
        })
        // console.log("mixin")
      },
      watch: {
        // 监听 store 的 products 的 state 中的 all，
        // 异步完成后数据就会刷新
    
        '$store.state.products.all'(newVal) {
          // window.console.log(newVal)
          this.products = this.products.concat(JSON.parse(JSON.stringify(newVal)))
          if (this.$route.params.id) {
            this.product = this.products.filter(
              // 因为是三个等于号，类型也要匹配，所以要转数字
              (data) => data.id === Number(this.$route.params.id)
            )[0]
          }
        },
      },
    }
    
    export { dispatchProductsStore }
    
    ```





## pages/main



* 加入 v-infinite-scroll 在 main 标签， 并且设置好方法 loadMore

  * @/pages/main/index.vue

    ```vue
    <template>
      <!-- 计算库存信息 -->
      <div class="container">
        <!-- <my-header></my-header> -->
        <!-- 设置菜单栏 -->
        <!-- 使用瀑布流 -->
        <div v-infinite-scroll="loadMore" class="main">
          <!-- 循环物品清单每一行显示一个信息 -->
          <div v-for="product of products" :key="product.title" class="list">
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
          // products: [],
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
      /*
      watch: {
        // 监听 store 的 products 的 state 中的 all，
        // 异步完成后数据就会刷新
    
        '$store.state.products.all'(newVal) {
          // window.console.log(newVal)
          this.products = newVal
        },
      },
      */
    
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
        // 分页加载下一页
        loadMore() {
          this.$store.dispatch('products/search', {
            page: this.page++,
            pageSize: this.pageSize,
            searchMap: this.searchMap,
          })
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

    

终于结束了

希望很快我就能觉得我写的是垃圾，其实现在就有感觉，笑