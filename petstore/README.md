# 开始





## 创建项目



* 创建指令

  * terminal

    ```sh
    vue init webpack petstore
    ```

    

  * 选项

    ```sh
    ? Project name petstore
    ? Project description A Vue.js project
    ? Author MatchaEggTart
    ? Vue build standalone      
    ? Install vue-router? Yes
    ? Use ESLint to lint your code? No
    ? Set up unit tests Yes
    ? Pick a test runner karma
    ? Setup e2e tests with Nightwatch? Yes
    ? Should we run `npm install` for you after the project has been created? (recommended) npm
    ```

    





## 初始设置



* 在 config/index.js 设置端口

  * config/index.js

    ```js
    // /config/index.js port
    module.exports = {
      dev: {
    
        // ...
        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
       	// ...
      }
    ```

    





## 安装 vue-axios



* 安装指令
  * terminal

    ```sh
    npm install --save axios vue-axios
    ```

    



* 在 @/main.js 添加 axios 到全局

  * @/main.js

    ```js
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    
    
    Vue.use(VueAxios, axios)
    /* 一定要 VueAxios 先于 axios 不然报错 Uncaught (in promise) TypeError: Cannot read property 'protocol' of undefined */
    ```

    





## 安装 ES6 的编译器



* 这步好像是多余的,vue 默认就安装了 babel-preset-env
  * terminal 全局安装 babel-cli

    ```sh
    npm install babel-cli -g
    ```

    

  * terminal 安装 Babel 7

    ​	https://babeljs.io/docs/en/env/

    ```sh
    npm install babel-preset-env --save-dev
    ```

    ​		

* 在 .babelrc（没有就自己造，与 src同级），添加

  * .babelrc

    ```js
    {"presets": ["env"]}
    ```

    





## 安装 Ant Design Vue



* 安装 ant-design-vue 指令

  * terminal

    ```sh
    yarn add ant-design-vue
    
    npm install ant-design-vue --save
    ```

    

  * terminal 安装 babel插件

    ```sh
    # 启动 ant-design-vue 工具，按需加载组件
    
    yarn add babel-plugin-import --dev
    
    npm install babel-plugin-import --save-dev
    ```

    

* 配置 babel-plugin-import

  * .babelrc

    ```js
      {
        "presets": [
          ["env", {
            "modules": false,
            "targets": {
              "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
            }
          }],
          "stage-2"
        ],
       "plugins": [
         "transform-vue-jsx",
         "transform-runtime",
         // 添加下面这句！
         ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }]
       ],
      }
    ```

    

* 完全引入 ant-design-vue

  * @/main.js

    ```js
    // src/main.js
    // import all Antd
    import Antd from 'ant-design-vue/es';	// 这里添加/es才不会报错
    import 'ant-design-vue/dist/antd.css';
    
    Vue.use(Antd);
    ```

    





## 设置入口按钮



* 将 App.vue 图片标签、样式 转移到 @/components/HelloWorld.vue
  * @/App.vue

    ```vue
    <template>
      <div id="app">
        <!-- <img src="./assets/logo.png"> -->
        <router-view/>
      </div>
    </template>
    
    <script>
    export default {
      name: 'App'
    }
    </script>
    
    <style>
    /*
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    }
    */
    </style>
    ```

    

  * @/components/HelloWorld.vue

    ```vue
    <!-- HelloWorld.vue -->
    <template>
      <div class="hello">
          <!-- 将 App.vue 图片转移过来 -->
          <img src="../assets/logo.png">
          <!-- ... -->
      </div>
    </template>
    <style scoped>
    #app, .hello {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    }
    </style>
    ```

    

* 在HelloWorld.vue 设置按钮

  * @/components/HelloWorld.vue

    ```vue
    <!-- HelloWorld.vue -->
    <template>
      <div class="hello">
          <!-- 省略 -->
          <!-- 方法1 -->
          <a-button type="primary">
              <router-link :to="{name: 'iMain'}">入口</router-link>
          </a-button>
          <!-- 方法2 -->
          <a-button type="primary" @click="$router.push({ name: 'iMain' })">
              入口
          </a-button>
      </div>
    </template>
    ```

    

* 设置 HelloWorld 路由信息

  * @/router/index.js

    ```js
    import Vue from 'vue'
    import Router from 'vue-router'
    import HelloWorld from '@/components/HelloWorld'
    // 引入 Main 组件
    import Main from '@/components/Main'
    
    Vue.use(Router)
    
    export default new Router({
      routes: [
        {
          path: '/',
          name: 'HelloWorld',
          component: HelloWorld
        },
        // 添加 Main 路由信息
        {
          path: '/main',
          name: 'iMain',
          component: Main
        }
      ]
    })
    ```

    





## 测试 vue-axios



* 将 products.json 复制到 @/staitc 文件夹中
  * static/products.json

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

    

* 将图片放置在 static/images , 图片来源
  
* https://github.com/ErikCH/VuejsInActionCode/tree/master/chapter-07/petstore/static/images
  
* 如何下载
  * 先安装 TortoiseSVN

  * https://tortoisesvn.net/downloads.html

  * 安装过程要把 command line client tools 勾上

    

  * terminal 输入

    ```sh
    # 将 /tree/master/ 替换成 /trunk/
    svn checkout https://github.com/ErikCH/VuejsInActionCode/trunk/chapter-07/petstore/static/images
    ```

    



* 在 Main 组件 中使用 created 来测试
  * @/components/Main.vue

    ```vue
    <template>
      <div>
          <img :src="products[0].image" alt="">
      </div>
    </template>
    <script>
    export default {
      data () {
          return {
              products: [
                  /*
                  防止 [Vue warn]: Error in render: "TypeError:
                       Cannot read property 'image' of undefined"
                  所以添加个空对象在数组
                  */
                 {}
              ]
          }
      },
      created: function () {
        this.axios.get("/static/products.json").then((response) => {
          console.log(response.data.products);
          this.products = response.data.products
        });
      },
    };
    </script>
    ```

    





## 设置顶部 Header



* 在 @/components创建 Header.vue
  * @/components/Header.vue

    ```vue
    <template>
      <div class="top-bar">
        <a-row type="flex">
          <!-- 左侧网站名 -->
          <a-col :span="8" :offset="2" :xs="{  span: 24, offset: 0 }" :sm="{ span: 12, offset: 0 }">
            <h1><router-link :to="{name: 'iMain'}">Vue.js Pet Depot</router-link></h1>
          </a-col>
          <!-- 右侧购物车 -->
          <a-col :span="6" :offset="8" :xs="{  span: 24, offset: 0 }" :sm="{ span: 12, offset: 0 }">
            <a-button size="large">
              <a-icon type="shopping-cart" />
              <span> Checkout</span>
            </a-button>
          </a-col>
        </a-row>
      </div>
    </template>
    <script>
    export default {
      
    }
    </script>
    
    <style scoped>
      .top-bar{
        background-color: rgb(0, 21, 41);
        width: 100%;
    
      }
      .top-bar .ant-col {
        line-height: 90px;
        text-align: center
    
      }
      .top-bar .ant-col h1{
        font-size: 36px;
        margin: 0;
      }
    </style>
    ```

    

* 在 Main.vue 导入Header组件
  * @/components/Main.vue

    ```vue
    <template>
      <div>
        <my-header></my-header>
      </div>
    </template>
    <script>
    // 导入 Header 组件
    import MyHeader from '@/components/Header'
    export default {
      components: {
        MyHeader
      }
    };
    </script>
    ```

    





# 设置 Main菜单栏





## 布局



* 使用 a-row a-col 进行布局
  * @/components/Main.vue

    ```vue
    <template>
      <div>
        <my-header></my-header>
        <!-- 设置菜单栏 -->
        <div class="main">
          <!-- 循环物品清单每一行显示一个信息 -->
          <div class="list" v-for="product of products" :key="product.id">
            <a-row type="flex" justify="center" align="middle" class="list-row">
              <a-col :span="8">
                <img class="product-img" :src="product.image" :alt="product.title" />
              </a-col>
              <a-col class="list-information" :span="14">
                <h1>{{product.title}}</h1>
                <p v-html="product.description"></p>
                <!-- 价格 -->
                <p>{{product.price}}</p>
                <a-button type="primary" size="large">Add to cart</a-button>
                <span class="inventory-message">Buy Now!</span>
                <div class="rating">
                  <span>
                    <a-icon class="star" type="star"/>
                    <a-icon class="star" type="star"/>
                    <a-icon class="star" type="star"/>
                    <a-icon class="star" type="star"/>
                    <a-icon class="star" type="star"/>
                  </span>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
    </template>
    <script>
    // 导入导航栏组件
    import MyHeader from "./Header";
    export default {
      data() {
        return {
          products: []
        };
      },
      components: {
        MyHeader,
      },
      // 创建虚拟DOM时获取物品清单
      created: function () {
        this.axios.get("/static/products.json").then((response) => {
          this.products = response.data.products;
          console.log(this.products);
        });
      },
    };
    </script>
    <style lang="css" scoped>
    .main {
      margin-top: 20px;
    }
    .main .list .list-row {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding: 40px 0;
    }
    .main .list .product-img {
      max-width: 386px;
    }
    .main .list .list-information {
      padding: 0 15px;
      width: 500px;
    }
    .main .list .list-information p {
      font-size: 150%;
    }
    .main .list .list-information .inventory-message {
      font-size: 150%;
      margin-left: 20px;
      font-weight: bold;
    }
    .main .list .list-information .rating {
      float: right;
      font-size: 0px;
      /* 这里要设置 0px，将字体大写交给子元素设置，
      可以避免标签换行显示出空格的问题 */
    }
    .main .list .list-information .rating star {
      font-size: 20px;
      padding: 0 0px;
    }
    
    </style>
    ```

    



## 设置星星评价



* 一开始使用

  * @/components/Main.vue

    ```html
    <span v-for="star of product.rating" :key="star">
      <a-icon type="star" theme="filled" />
    </span>
    <span v-for="star of 5 - product.rating" :key="star">
      <a-icon type="star" theme="outlined" />
    </span>
    ```

    

  * 进行了两次 v-for， 有消耗问题，于是进行修改

    ​	

* 修改后

  * @/components/Main.vue
  
    ```vue
    <template>
    	<!-- 省略 -->
    	<div class="rating">
      		<span v-for="(i, index) of 5" :key="index">
        		<!-- 使用方法确定star图标的theme值，返回一个字符串 -->
        		<a-icon
                 	class="star" type="star"
                	v-bind:theme="checkRating(index, product.rating)"/>
      		</span>
    	</div>
    </template>
    <script>
    export default {
    	// 省略
    	methods: {
      	// 检测rating循环来判定星星是否实体
      		checkRating(index, rating) {
        		if (index < rating) {
          			return "filled"
                } else {
                  return "outlined"
                }
              },
    	},
    }
  </script>
    ```

    ​	





## 使用过滤器过滤价格



* 格式 {{property | filter}} 的 过滤器
  * @/components/Main.vue

    ```vue
    <template>
    	<!-- 省略 -->
    	<p>{{product.price | formatPrice}}</p>
    </template>
    <script>
    export default{
    	// 省略
    	filter: {
    		formatPrice: function (price) {
                formatPrice: function (price) {
                  // 参数如果不是数字
                  if (!parseInt(price)) {
                    return "0.00";
                  }
                  // 为价格添加小数点
                  var priceString = (price / 100).toFixed(2);
                  // 如果价格大于99999用逗号分隔3位
                  if (price > 99999) {
                    // 将价格设置为数组
                    var priceArray = priceString.split("").reverse();
                    // 设置位移量
                    var index = 3;
                    while (priceArray.length > index + 3) {
                      // 在数组中每3位插入 ,
                      priceArray.splice(index + 3, 0, ",");
                      index += 4;
                    }
                    // 将数组转换成字符串
                    priceString = priceArray.reverse().join("");
                  }
                  return "$ " + priceString;
                },
    		}
    	}
    }
    </script>
    ```

    





## 购物车点击功能 加入商品



* 添加 addToCart() 方法， 在a-button标签里

  * @/components/Main.vue

    ```html
    <a-button type="primary" size="large" v-on:click="addToCart(product)">Add to cart</a-button>
    ```

    

* 先创建实例数据做存储商品，在 Main/data

  * @/components/Main.vue

    ```js
    export default {
      data() {
        return {
          products: [],
          // 添加购物车
          cart: []
        };
      },
      // 省略
    }
    ```

    

  

* 设置 addToCart方法， 在 methods中

  * @/components/Main.vue
  
    ```js
    methods: {
      // 点击添加商品到购物车
      addToCart(product) {
    	this.cart.push(product.id)
      }
    }
    ```
    
    





## 在购物车显示商品数量



* 因为商品数量是在 Main组件计算， 但是显示在 Header组件， 所以需要使用 props技术

* Main.vue中，在 my-header标签 绑定动态 attribute

  * @/components/Main.vue

    ```html
    <my-header :cartItemCount="cartItemCount"></my-header>
    ```

    

  

* 在 Header.vue中， 设置 props

  * @/components/Header.vue
  
    ```vue
    <template>
      <div class="header">
        <div class="top-bar">
          <a-row type="flex">
          <!-- 省略 -->
            
          <!-- 右侧购物车 -->
            <a-col :span="6" :offset="8" :xs="{  span: 24, offset: 0 }" :sm="{ span: 12, offset: 0 }">
              <a-button size="large">
                <a-icon type="shopping-cart" />
                <!-- 显示商品数量 -->
                <span>{{cartItemCount}} Checkout</span>
              </a-button>
            </a-col>
          </a-row>
      </div>
      </div>
    </template>
    <script>
    export default {
      // 导入父组件传来的 attribute 值
      props: ['cartItemCount']
    }
    </script>
    ```
    
    





## 计算库存量设定样式



* 在 Main 的 methods中设置 计算购物车中物品的数量，用在v-for循环中（为啥不用mixin？）

  * @/components/Main.vue

    ```js
    methods: {
      cartCount: function (productId) {
        let count = 0;
        for (var i = 0; i < this.cart.length; i++) {
          if (productId === this.cart[i]) {
            count++;
          }
        }
        return count;
      },
    }    
    ```

    

  

* 设置 Main 的按键, 使用v-if 绑定canAddToCart()方法来确定按键样式，每次出发按键导致按键更新，Vue就会运行 v-if

  * @/components/Main.vue

    ```html
    <!-- 购买按钮，如果库存没了改变样式 -->
    <a-button
      type="primary"
      size="large"
      v-on:click="addToCart(product)"
      v-if="canAddToCart(product)"
    >Add to cart</a-button>
    <!-- 库存没了的购买按钮样式 -->
    <a-button type="primary" size="large" disabled v-else>Add to cart</a-button>
    ```

    

  ​	

* 定义 canAddToCart() 方法， 在 Main methods中

  * @/components/Main.vue

    ```html
    <!-- 购买按钮，如果库存没了改变样式 -->
    <a-button
      type="primary"
      size="large"
      v-on:click="addToCart(product)"
      v-if="canAddToCart(product)"
    >Add to cart</a-button>
    <!-- 库存没了的购买按钮样式 -->
    <a-button type="primary" size="large" disabled v-else>Add to cart</a-button>
    ```

    

  

* 

  ```js
  // 计算库存信息
  canAddToCart: function (product) {
    return product.availableInventory > this.cartCount(product.id);
  },
  // 计算购物车中的同一商品数量
  cartCount: function (productId) {
    let count = 0;
    for (var i = 0; i < this.cart.length; i++) {
      if (productId === this.cart[i]) {
        count++;
      }
    }
    return count;
  },
  ```

  ​	

* 既然设置了按键样式，也到库存提示的信息样式了，当小于5个库存的时候提示还剩多少个，但没有的时候提示“All Out”

  * @/components/Main.vue

    ```html
    <!-- 提示库存量信息 -->
    
    <!-- 没有库存 -->
    <span
      class="inventory-message"
      v-if="product.availableInventory - cartCount(product.id) === 0">
      All Out!
    </span>
    
    <!-- 库存只剩下5个以下 -->
    <span
      class="inventory-message"
      v-else-if="product.availableInventory - cartCount(product.id) < 5">
      Only {{product.availableInventory - cartCount(product.id)}} left!!!
    </span>
    
    <!-- 充足库存 -->
    <span class="inventory-message" v-else>Buy Now!</span>
    ```

    





## 暂时完成的页面总结



* Main.vue

  ```vue
  <template>
    <!-- 计算库存信息 -->
    <div  class="container">
      <my-header :cartItemCount="cartItemCount"></my-header>
      <!-- 设置菜单栏 -->
      <div class="main">
        <!-- 循环物品清单每一行显示一个信息 -->
        <div class="list" v-for="product of products" :key="product.id">
          <a-row type="flex" justify="center" align="middle" class="list-row">
            <a-col :span="8">
              <img class="product-img" :src="product.image" :alt="product.title" />
            </a-col>
            <a-col class="list-information" :span="14">
              <h1>{{product.title}}</h1>
              <p v-html="product.description"></p>
              <!-- 价格 使用 filters -->
              <p>{{product.price | formatPrice}}</p>
              <!-- 购买按钮，如果库存没了改变样式 -->
              <a-button
                type="primary"
                size="large"
                v-on:click="addToCart(product)"
                v-if="canAddToCart(product)"
              >Add to cart</a-button>
              <!-- 库存没了的购买按钮样式 -->
              <a-button type="primary" size="large" disabled v-else>Add to cart</a-button>
              <!-- 提示库存量信息 -->
              <span
                class="inventory-message"
                v-if="product.availableInventory - cartCount(product.id) === 0"
              >All Out!</span>
              <span
                class="inventory-message"
                v-else-if="product.availableInventory - cartCount(product.id) < 5"
              >Only {{product.availableInventory - cartCount(product.id)}} left!!!</span>
              <span class="inventory-message" v-else>Buy Now!</span>
              <div class="rating">
                <span v-for="(i, index) of 5" :key="index">
                  <!-- 使用方法确定star图标的theme值，返回一个字符串 -->
                  <a-icon class="star" type="star" v-bind:theme="checkRating(index, product.rating)" />
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
  import MyHeader from "./Header";
  export default {
    data() {
      return {
        products: [],
        // 购物车
        cart: [],
      };
    },
    methods: {
      // 检测rating循环来判定星星是否实体
      checkRating(index, rating) {
        if (index < rating) {
          return "filled";
        } else {
          return "outlined";
        }
      },
      // 点击添加商品到购物车
      addToCart(product) {
        this.cart.push(product.id);
      },
      // 计算库存信息
      canAddToCart: function (product) {
        return product.availableInventory > this.cartCount(product.id);
      },
      // 计算购物车中的同一商品数量
      cartCount: function (productId) {
        let count = 0;
        for (var i = 0; i < this.cart.length; i++) {
          if (productId === this.cart[i]) {
            count++;
          }
        }
        return count;
      },
    },
    computed: {
      // 购物车中商品数量，显示在右上角
      // 需要使用 props 传给 my-header
      cartItemCount: function () {
        return this.cart.length || "";
      },
    },
    components: {
      MyHeader,
    },
    // 创建虚拟DOM时获取物品清单
    created: function () {
      this.axios.get("/static/products.json").then((response) => {
        this.products = response.data.products;
        console.log(this.products);
      });
    },
    // 创建过滤器
    filters: {
      formatPrice: function (price) {
        // 参数如果不是数字
        if (!parseInt(price)) {
          return "0.00";
        }
        // 为价格添加小数点
        var priceString = (price / 100).toFixed(2);
        // 如果价格大于99999用逗号分隔3位
        if (price > 99999) {
          // 将价格设置为数组
          var priceArray = priceString.split("").reverse();
          // 设置位移量
          var index = 3;
          while (priceArray.length > index + 3) {
            // 在数组中每3位插入 ,
            priceArray.splice(index + 3, 0, ",");
            index += 4;
          }
          // 将数组转换成字符串
          priceString = priceArray.reverse().join("");
        }
        return "$ " + priceString;
      },
    },
  };
  </script>
  <style lang="css" scoped>
  .main {
    margin-top: 20px;
  }
  .main .list .list-row {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 40px 0;
  }
  .main .list .product-img {
    max-width: 386px;
  }
  .main .list .list-information {
    padding: 0 15px;
    width: 500px;
  }
  .main .list .list-information p {
    font-size: 150%;
  }
  .main .list .list-information .inventory-message {
    font-size: 150%;
    margin-left: 20px;
    font-weight: bold;
  }
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
  </style>
  ```

  ​	

  

* Header.vue

  ```vue
  <template>
    <div class="header">
      <div class="top-bar">
      <a-row type="flex">
        <!-- 左侧网站名 -->
        <a-col :span="8" :offset="2" :xs="{  span: 24, offset: 0 }" :sm="{ span: 12, offset: 0 }">
          <h1><router-link :to="{name: 'iMain'}">Vue.js Pet Depot</router-link></h1>
        </a-col>
        <!-- 右侧购物车 -->
        <a-col :span="6" :offset="8" :xs="{  span: 24, offset: 0 }" :sm="{ span: 12, offset: 0 }">
          <a-button size="large">
            <a-icon type="shopping-cart" />
            <span>{{cartItemCount}} Checkout</span>
          </a-button>
        </a-col>
      </a-row>
    </div>
    </div>
  </template>
  <script>
  export default {
    props: ['cartItemCount']
  }
  </script>
  
  <style scoped>
    .header .top-bar{
      background-color: rgb(0, 21, 41);
      width: 100%;
  
    }
    .header .top-bar .ant-col {
      line-height: 90px;
      text-align: center
  
    }
    .header .top-bar .ant-col h1{
      font-size: 36px;
      margin: 0;
    }
  </style>
  ```
  
  





# 设置确认购买的邮寄信息（1）





## 创建 Form.vue



* 先创建 Form.vue 文件

  * @/components/Form.vue

  ```html
  <template>
    <div>进入Form.vue</div>
  </template>
  ```

  

* From 路由信息

  * @/router/index.js

  ```js
  //...
  
  import Form from '@/components/Form'
  
  //...
  export default new Router({
    routes: [
      // ...
      // 添加 Form 路由信息
      {
        path: '/form',
        name: 'Form',
        component: Form
      }
    ]
  })
  
  ```

  

* 在 Header.vue 的按键 Checkout 路由到这个文件，使用 router-link 包裹之前的按钮标签

  * @/component/Header.vue
  
    ```vue
    <template>
      <div class="header">
        <div class="top-bar">
          <a-row type="flex">
            <!-- 左侧网站名 -->
            <a-col :span="8" :offset="2" :xs="{  span: 24, offset: 0 }" :sm="{ span: 12, offset: 0 }">
              <h1>
                <router-link :to="{name: 'iMain'}">Vue.js Pet Depot</router-link>
              </h1>
            </a-col>
            <!-- 右侧购物车 -->
            <a-col :span="6" :offset="8" :xs="{  span: 24, offset: 0 }" :sm="{ span: 12, offset: 0 }">
              <router-link :to="{name: 'Form'}">
                <a-button size="large">
                  <a-icon type="shopping-cart" />
                  <span>{{cartItemCount}} Checkout</span>
                </a-button>
              </router-link>
            </a-col>
          </a-row>
        </div>
      </div>
    </template>
    <script>
    export default {
      props: ["cartItemCount"],
    };
    </script>
    
    <style scoped>
    .header .top-bar {
      background-color: rgb(0, 21, 41);
      width: 100%;
    }
    .header .top-bar .ant-col {
      line-height: 90px;
      text-align: center;
    }
    .header .top-bar .ant-col h1 {
      font-size: 36px;
      margin: 0;
    }
    </style>
    ```
  
    





## 设置 Form.vue



* 首先在 Form 导入 Header 组件

  * @/components/Form.vue
  
    ```vue
    <template>
      <div class="container">
        <my-header></my-header>
      </div>
    </template>
    <script>
    import MyHeader from "./Header"
    export default {
      components:{
        MyHeader
      }
    }
    </script>
    ```
  
    






# 滚动条问题



* 在页面切换时，发现滚动条导致页面变形

* 方法1

  * 像例子说的，将 body max-width 设置为 一个固定宽度

  * @/App.vue

    ```css
    body {
        max-width: 970px !important;
    }
    ```

    

* 方法2，隐藏滚动条，在 App.vue 中添加样式，感觉在手机端有奇效

  * @/App.vue

    ```css
    body::-webkit-scrollbar{
        width:0;
    }
    ```

    

  

* 方法3，永远存在滚动条， 在 App.vue 设置，这个方法就一定要设置高度

  * @/App.vue

    ```css
    html {
      overflow-y: auto;
      overflow-x: hidden;
    }
    #app {
      height: 2000px;
      margin-right: calc(100% - 100vw);
      padding-right: 17px;
    }
    ```

    

  

  

* 方法4，将 main 菜单栏样式设置为 position fixed，overflow是 scroll，因为是 scroll 所以必须要设计 height

  * 设置样式，让容器 变成固定定位

  * 这里有个问题，当 窗口变小，fixed中的元素会遮挡Header元素，

  * @/components/Main.vue

    ```css
    .main {
      position: fixed;
      top: 90px;
      /* 减去90px， 不然看不见滚动条末端 */
      height: calc(100% - 90px);
      width: 100%;
      overflow: scroll;
      overflow-x: hidden;
      padding: 100px 0;
  }
    ```


  * 建议还是将内容设置成 relative，这样可以响应式，那就用下面的方法

  

* 方法5， 使用 overflow-y: overlay 跟设置 整个页面两边边框

  * https://blog.csdn.net/weixin_34112208/article/details/88731678

  * @/App.vue

    ```css
    html{
     overflow-y: overlay;
    }
    #app {
        padding: 0 20px;
    }
    ```

    

  * @/components/Main.vue

    ```css
    .main {
      position: relative;
      top: 0px;
      /* 减去90px， 不然看不见滚动条末端 */
      /* height: calc(100% - 90px); */
      width: 100%;
      /* overflow: scroll; */
      padding: 100px 0;
    }
    ```

    



所以是时候使用 Vuex 将购物车cart变量变成共享数据！





# Vuex 购物车测试





## 安装Vuex



​	https://vuex.vuejs.org/zh/installation.html

* 安装指令

  * terminal

    ```sh
    npm install vuex --save
    yarn add vuex
    ```

    

  

* 在 main.js 通过 Vue.use()来安装 Vuex

  * @/main.js
  
    ```js
    // add Vuex
    import Vuex from 'vuex'
    
    Vue.use(Vuex)
    ```

  

## 测试



* 在 src 创建 store文件夹，store 文件夹下创建 modules 文件夹和 index.js

  ```
  | src
    | store
      |- index.js
      |  modules
         |- shoppingCart.js
  ```

  

* shoppingCart.js 文件中创建 store的 state、mutation、getters 对象

  * @/store/modules/shoppingCart.js

    ```js
    const state = {
      item: []
    }
    
    const getters = {
      item: state => state.cart
    }
    
    const mutations = {
      'SET_STORE' (state, id) {
        state.item.push(id);
      }
    };
    
    export default {
      state,
      getters,
      mutations,
    }
    ```

    

  

* index.js 做组装模块并导出 store 的地方

  * @/store/index.js

    ```js
    import Vue from 'vue'
    import Vuex from 'vuex'
    import shoppingCart from './modules/shoppingCart'
    
    Vue.use(Vuex)
    
    export default new Vuex.Store({
      modules: {
        shoppingCart
      }
    })
    ```

    

  

* 修改 main.js，创建 store对象

  * @/main.js

    ```js
    import { store } from './store'
    new Vue({
      
      // 加入store
      store,
      
    })
    ```

    

  

* 在 Main.vue 做测试，在 addToCart() 方法中

  * @/components/Main.vue

  ```js
  methods: {
    // 点击添加商品到购物车
    addToCart(product) {
      this.cart.push(product.id);
      // 回调mutation
      this.$store.commit('SET_STORE', product.id)
      // 显示
      console.log(this.$store.state.shoppingCart.item)
    },
  }
  ```

  

* 修改 Header.vue

  * @/components/Header.vue

    ```html
    <!-- 右侧购物车 -->
    <a-col :span="6" :offset="8" :xs="{  span: 24, offset: 0 }" :sm="{ span: 12, offset: 0 }">
      <router-link :to="{name: 'Form'}">
        <a-button size="large">
          <a-icon type="shopping-cart" />
          <!-- <span>{{cartItemCount}} Checkout</span> -->
          <span>{{count}} Checkout</span>
        </a-button>
      </router-link>
    </a-col>
    ```

    

    ```js
    export default {
      // props: ["cartItemCount"],
      computed: {
        count: function() {
          return this.$store.getters.item.length;
        }
      }
    };
    ```

    

  

* 有趣的地方

  * 纵然shoppingCart文件中放入 state、mutation、getters等，但是 store的下层结构是 state、mutation、getters，而 shoppingCart是在 state下层

    !(https://github.com/MatchaEggTart/petstore_ant_vue/blob/main/document/assets/store-structure.png?raw=true)

    






# 建立模块化的 Vuex Store





## Vuex 购物车



* 安装指令

  * terminal

    ```shell
    # npm 使用
    npm install vuex --save
    
    # yarn
    yarn add vuex
    ```

    

  

* 首先，将测试内容都删掉，也将 main.js 引入 Vuex的三句代码删掉

  * @/main.js

    ```js
    // add Vuex
    import Vuex from 'vuex'
    
    Vue.use(Vuex)
    ```

    

  

* 在 src 下面 创建文件夹 store，文件夹结构

  ```
  └── store
      ├── index.js          # 我们组装模块并导出 store 的地方
      ├── actions.js        # 根级别的 action，这里没有
      ├── mutations.js      # 根级别的 mutation，这里也没有
      └── modules
          ├── shoppingCart       # 购物车模块文件夹
          │   ├─ index.js        # 组装 shoppingCart 的地方
          │   ├─ state.js        # shoppingCart 的 state
          │   ├─ getters.js      # shoppingCart 的 getters
          │   ├─ mutations.js    # shoppingCart 的 mutations
          │   └─ actions.js      # shoppingCart 的 actions
          │
          └── products           # 商品模块文件夹
  ```

  



* 然后在 main.js 引入 store 的 index.js

  * @/main.js

    ```js
    // 导入 store
    import store from './store'
    
    new Vue({
      el: '#app',
      router,
      store,	// ES6 写法， 引入 store
      components: { App },
      template: '<App/>'
    })
    ```

    

  

* 在 store/index.js 声明使用 Vuex，且声明 shoppingCart 模块

  * @/store/index.js

    ```js
    import Vue from 'vue'
    import Vuex from 'vuex'
    import shoppingCart from './modules/shoppingCart'
    
    Vue.use(Vuex)
    
    export default new Vuex.Store({
      modules: {
        // shoppingCart 开启了 namespaced: true
        // 所以要使用这个模块， 前缀一定要加入这里写的 shoppingCart
        shoppingCart,
      },
      
    })
    ```

    

  

* 在 store/modules/shoppingCart/index.js 组装好所有属性

  * @/store/modules/shoppingCart/index.js

    ```js
    import state from "./state"
    import mutations from "./mutations"
    import getters from "./getters"
    import actions from "./actions"
    
    export default {
      namespaced: true,
      state,
      getters,
      mutations,
      actions
    }
    ```

    

  

* 设置 shopping Cart 状态

  * @/store/modules/shoppingCart/state.js

    ```js
    export default {
      // shoppingCart's item
      item: []
    }
    ```

    

  

* 设置 shopping Cart 的 mutation

  * @/store/modules/shoppingCart/mutations.js

    ```js
    // 使用常量代替 mutation 事件
    export const ADD_TO_CART = 'ADD_TO_CART'
    
    export default {
      /*
      addToCart(state, payload) {
        state.item.push(payload);
      }
      */
      [ADD_TO_CART](state, payload) {
        state.item.push(payload);
      }
    }
    ```

    

  

* 设置 shopping Cart 的 getters

  * @/store/modules/shoppingCart/getters.js

    ```js
    export default {
      // 购物车里商品ID数组
      item: state => state.item,
      // 购物车商品总数
      number: state => state.item.length
    }
    ```

    

  

* 设置 shopping Cart 的 actions

  * @/store/modules/shoppingCart/actions.js

    ```js
    export default {
      // 添加商品至购物车
      addToCart({commit}, productId) {
        commit('ADD_TO_CART', productId)
      }
    }
    ```

    

  ​	

  

* 修改 Main.vue

  * @/components/Main.vue

    ```js
    methods: {
        data() {
          return {
            products: [],
            // 购物车，加入 store 后注释掉
            // cart: [],
          };
        },
        // ...
        // 点击添加商品到购物车
        addToCart(product) {
          this.$store.dispatch("shoppingCart/addToCart", product.id);
          // this.cart.push(product.id);
          // console.log(this.$store.state.shoppingCart.item)
        },
    }
    //...
    computed: {
        cart: function () {
          // return this.$store.state.shoppingCart.item
          return this.$store.getters["shoppingCart/item"];
        },
        // 购物车中商品数量，显示在右上角
        // 需要使用 props 传给 my-header
        // cartItemCount: function () {
        //   return this.cart.length || "";
        // },
    }
    ```

    

  

* 修改 Header.vue

  * @/components/Main.vue
  
    ```html
    <script>
    export default {
      // props: ["cartItemCount"],
      computed: {
        cartItemCount: function () {
          // return this.$store.getters.item.length;
          return this.$store.getters["shoppingCart/number"];
        },
      },
    };
    </script>
    ```
  
    





## Vuex 商品



* 在 @/store 文件夹创建 products 文件夹

  ```
  ├── api               	  # 创建接口文件夹
  │   ├─ index.js               # 组装接口模块
  │   └─ products.js            # products 获取后端信息的接口（假的）
  │
  └── store
      ├── index.js          # 我们组装模块并导出 store 的地方
      │
      │
      └── modules
          ├── products           # 商品模块文件夹
          │   ├─ index.js        # 组装 products 的地方
          │   ├─ state.js        # products 的 state
          │   ├─ getters.js      # products 的 getters
          │   ├─ mutations.js    # products 的 mutations
          │   └─ actions.js      # products 的 actions
          │
          └── shoppingCart       # 购物车模块
  ```

  

* 其实购物车也应该是通过接口获取后台数据，毕竟用户购物车也是存储下来的，但是这里就不模拟了

* 商品后台数据暂时没有所以还是用个假文件模拟吧，获取商品就不需要token了，但是用户购物车如果要获取，其实还需要用些工具类来验证token等信息

  

* 在 src 下 创建 api 文件夹，在 store/modules 创建 products 文件夹

  

* src/api/products.js 作获取数据接口

  * @/api/products.js

    ```js
    // 使用了 axios
    import axios from 'axios';
    
    
    function getAllProducts(method) {
      // 参数是 products/actions 的匿名方法
      if (typeof(method) === "function") {
        axios.get("/static/products.json").then((response) => {
          /* 
          调用 actions的 getAllProducts方法，
            将获取的数据作参数交给 actions/getAllProdcts方法
          function (data) {
            commit('GET_ALL_PRODUCTS', data)
          }
          */
          method(response.data.products)
        })
      } else {
        throw "Invalid type of arguments."
      }
    }
    
    export default{
      getAllProducts
    }
    ```

    

  

* src/api/index.js 组装接口文件

  * @/api/index.js

    ```js
    import products from './products'
    export default {
      products
    }
    ```

    

  

* 在 products 创建 index.js、 state.js、 getters.js、 mutations.js、 actions.js

  

* 先设置 products 的组装

  * @/store/modules/products/index.js

    ```js
    import state from './state'
    import mutations from './mutations'
    import getters from './getters'
    import actions from './actions'
    
    export default {
      namespaced: true,
      state,
      mutations,
      getters,
      actions
    }
    ```

    

  

* 设置 products 的 状态

  * @/store/modules/products/state.js

    ```js
    export default {
      all: []
    }
    ```

    

  

* 设置 products 的 getters

  * @/store/modules/products/getters.js

    ```js
    export default{
      all: state => state.all
    }
    ```

    

  

* 设置 products 的 mutations

  * @/store/modules/products/mutations.js

    ```js
    export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS"
    
    export default {
      [GET_ALL_PRODUCTS](state, payload) {
        state.all = payload
      }
    }
    ```

    

  

* 设置 product 的 actions

  * @/store/modules/products/actions.js
  
    ```js
    import api from '@/api'
    
    export default {
      getAllProducts({commit}) {
        api.products.getAllProducts(data =>{
          commit('GET_ALL_PRODUCTS', data)
        })
      }
  }
    ```
  
    



### 设置 products 接收异步 store 数据



* 先在 Main 的 created 里面，使用 dispatch 让 store 获得数据

  * @/components/Main.vue

    ```js
    created: function () {
      /* 使用 store 接收数据，所以注释掉
      this.axios.get("/static/products.json").then((response) => {
        this.products = response.data.products;
        console.log(this.products);
      });
      */
      this.$store.dispatch("products/getAllProducts");
    },
    ```

    

* 问题

  * 如果在 created里面 的 dispatch 后面 将执行 products 赋值，那很大可能获取不了，因为 请求还在申请，这个异步，可能还没获得值，就把空值返回给 products

    

* 解决方法有两个

  

* 方法1

  * 将 products 不放在 data 里， 放在 computed 里， 这样数据一改变，他就能获得值

  * @/components/Main.vue

    ```js
    export default {
      data() {
        return {
          // 商品 使用 computed 代替 data
          // products: [],
          // 购物车，加入 store 后注释掉
          // cart: [],
        };
      },
      // ...
      computed: {
        products: function() {
          // 当 vue 检测到 getters的值发生变化，就能完成赋值
      	  return this.$store.getters['products/all']
        },
      }
      // ...
    }
    ```

    

* 方法2

  * 使用 watch 检测 store 的值

  * @/components/Main.vue

    ```js
    export default {
      data() {
        return {
          // 商品
          products: [],
          // 购物车，加入 store 后注释掉
          // cart: [],
        };
      },
      // ...
      watch: {
        /*
        监听 store 的 products 的 state 中的 all，
        异步完成后数据就会刷新
        */
        "$store.state.products.all": function (newVal) {
          console.log(newVal);
          this.products = newVal;
        },
      },
    }
    ```

    





# 设置确认购买的邮寄信息（2）





讲道理，表单使用 a-form-model，因为支持 v-model，但是我更沉迷 a-row 和 a-col，可是如果不使用 form的话 validator 麻烦， a-form-model 不好布局，比较固定



## 先设置头部信息



* 还是导入 Header 组件
  * @/components/Form.vue

    ```VUE
    <template>
      <div class="container">
        <my-header></my-header>
      </div>
    </template>
    <script>
    import MyHeader from "./Header";
    export default {
      data() {
        components: {
          MyHeader,
      },
    }
    </script>
    ```

    





## 设置表单容器



* 这里用 Grid 栅格 包住表单让 表单 响应式了
  * @/components/Form.vue

    ```vue
    <template>
      <div class="container">
        <my-header></my-header>
        <!-- 表单 -->
        <a-row class="form" type="flex" justify="center">
          <!-- 表单长度 -->
          <a-col class="panel" :xs="xsSize" :md="mdSize" :lg="lgSize">
            <!-- 表单标题 -->
            <a-row class="panel-header">
              <a-col>Pet Depot Checkout</a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
    </template>
    <script>
    import MyHeader from "./Header";
    export default {
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
          components: {
            MyHeader,
          },
        };
      },
      components: {
        MyHeader,
      },
    };
    </script>
    <style lang="css" scoped>
    .form {
      position: relative;
      width: 100%;
      top: 30px;
      height: calc(100% - 90px);
      /* overflow: scroll;
      overflow-x: hidden; */
    }
    .form .panel {
      display: block;
      border: 1px solid #bce8f1;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      margin: 30px 0px;
    }
    .form .panel .panel-header {
      color: #31708f;
      background-color: #d9edf7;
      padding: 10px 15px;
      border-bottom: 1px solid transparent;
      width: 100%;
      font-size: 18px;
    }
    </style>
    ```

  



## 设置表单内容





### 内容



* 提示信息

  * @/components/Form.vue

    ```vue
    <template>
      <div class="container">
        <my-header></my-header>
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
                  <a-col :flex="1">
                    <div>
                      <strong>First Name:</strong>
                    </div>
                    <a-input v-model.trim="order.firstName"></a-input>
                  </a-col>
    
                  <!-- 姓名 -->
                  <a-col :flex="1">
                    <div>
                      <strong>last Name:</strong>
                    </div>
                    <a-input v-model.trim="order.lastName"></a-input>
                  </a-col>
                  
                </a-row>
    
                <!-- 第三行 -->
                <a-row>
                  
                  <!-- 地址栏 -->
                  <a-col>
                    <strong>Address:</strong>
                    <a-input v-model="order.address"></a-input>
                  </a-col>
    
                </a-row>
    
                <!-- 第四行 -->
                <a-row>
    
                  <!-- 城市 -->
                  <a-col>
                    <strong>City:</strong>
                    <a-input v-model="order.city"></a-input>
                  </a-col>
    
                </a-row>
    
                <!-- 第五行 -->
                <a-row type="flex" justify="space-between">
    
                  <!-- 地区 -->
                  <a-col :flex="10">
                    <div>
                      <strong>State:</strong>
                    </div>
                    <a-select v-model="order.state" style="width: 120px">
                      <a-select-option value disabled>state</a-select-option>
                      <a-select-option v-for="(state, name) in states" :key="state">{{ name }}</a-select-option>
                    </a-select>
                  </a-col>
    
                  <!-- 邮政号 -->
                  <a-col :flex="7">
                    <div>
                      <strong>Zip / Postal Code:</strong>
                    </div>
                    <a-input v-model="order.zip"></a-input>
                  </a-col>
    
                </a-row>
    
                <!-- 第六号 -->
                <a-row type="flex" justify="space-between" style="padding-top: 20px">
    
                  <!-- 确认是否礼物 -->
                  <a-col>
                    <a-switch @change="onChange" />
                    <strong>&nbsp;Ship As Gift?</strong>
                  </a-col>
    
                  <!-- 确认地址属性 -->
                  <a-col style="float: right">
                    <a-radio-group v-model="order.method" button-style="solid">
                      <a-radio-button
                        v-for="(method, name) in methods"
                        :key="name"
                        :value="method"
                      >{{ name }}</a-radio-button>
                    </a-radio-group>
                  </a-col>
    
                </a-row>
    
                <!-- 第七行 -->
                <a-row type="flex" justify="center" class="button">
    
                  <!-- 确认按钮 -->
                  <a-col>
                    <a-button size="large" type="primary" v-on:click="submitForm">Place Order</a-button>
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
                    </pre>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
    </template>
    <script>
    import MyHeader from "./Header";
    export default {
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
            AL: "Alabama",
            AK: "Alaska",
            AR: "Arizona",
            CA: "California",
            NV: "Nevada",
          },
          gift: {
            sendGift: "Send As A Gift",
            dontSendGift: "Do Not Send As A Gift",
          },
          methods: {
            Home: "Home Address",
            Business: "Business Address",
          },
          order: {
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            gift: "Do Not Send As A Gift",
            method: "Home Address",
          },
        };
      },
      components: {
        MyHeader,
      },
      methods: {
        onChange(checked) {
          this.order.gift = checked ? this.gift.sendGift : this.gift.dontSendGift;
          console.log(this.order.gift);
        },
        submitForm() {
          alert('submit\n'+ JSON.stringify(this.order))
        }
      },
    };
    </script>
    
    <style lang="css" scoped>
    .form {
      position: relative;
      width: 100%;
      top: 30px;
      height: calc(100% - 90px);
      /* overflow: scroll;
      overflow-x: hidden; */
    }
    .form .panel {
      display: block;
      border: 1px solid #bce8f1;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      margin: 30px 0px;
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
      padding: 3px 15px;
      font-size: 16px;
    }
    .form .panel .panel-body h4 {
      font-size: 20px;
    }
    
    .form .panel .panel-body .button {
      padding: 30px 0;
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
    ```



### 注意



* rules 每个prop 独立一个 ，不能公用，比如 firstName 跟 lastName 不能够用一个 rules的 name

  

### 插入 &lt;a-form-model&gt;



* 首先在表单元素下面添加 &lt;a-form-model&gt;,  然后在每个最底层的 a-col 添加 &lt;a-form-model-item&gt;。最后顺便取消 a-form-item 的样式

* 代码

  * @/components/Form.vue

    ```vue
    <template>
      <div class="container">
        <my-header></my-header>
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
              <a-form-model>
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
                    <a-col :flex="1">
                      <strong>First Name:</strong>
                      <a-form-model-item>
                        <a-input v-model.trim="order.firstName"></a-input>
                      </a-form-model-item>
                    </a-col>
    
                    <!-- 姓名 -->
                    <a-col :flex="1">
                      <strong>last Name:</strong>
                        <a-form-model-item>
                        <a-input v-model.trim="order.lastName"></a-input>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
    
                  <!-- 第三行 -->
                  <a-row>
                    <!-- 地址栏 -->
                    <a-col>
                      <strong>Address:</strong>
                      <a-form-model-item>
                        <a-input v-model="order.address"></a-input>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
    
                  <!-- 第四行 -->
                  <a-row>
                    <!-- 城市 -->
                    <a-col>
                      <strong>City:</strong>
                      <a-form-model-item>
                        <a-input v-model="order.city"></a-input>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
    
                  <!-- 第五行 -->
                  <a-row type="flex" justify="space-between">
                    <!-- 地区 -->
                    <a-col :flex="10">
                      <strong>State:</strong>
                      <a-form-model-item>
                        <a-select v-model="order.state" style="width: 120px">
                          <a-select-option value disabled>state</a-select-option>
                          <a-select-option v-for="(state, name) in states" :key="state">{{ name }}</a-select-option>
                        </a-select>
                      </a-form-model-item>
                    </a-col>
    
                    <!-- 邮政号 -->
                    <a-col :flex="7">
                      <strong>Zip / Postal Code:</strong>
                      <a-form-model-item>
                        <a-input v-model="order.zip"></a-input>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
    
                  <!-- 第六号 -->
                  <a-row type="flex" justify="space-between" style="padding-top: 20px">
                    <!-- 确认是否礼物 -->
                    <a-col>
                      <a-form-model-item>
                        <a-switch @change="onChange" />
                      </a-form-model-item>
                      <strong>&nbsp;Ship As Gift?</strong>
                    </a-col>
    
                    <!-- 确认地址属性 -->
                    <a-col style="float: right">
                      <a-form-model-item>
                        <a-radio-group v-model="order.method" button-style="solid">
                          <a-radio-button
                            v-for="(method, name) in methods"
                            :key="name"
                            :value="method"
                          >{{ name }}</a-radio-button>
                        </a-radio-group>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
    
                  <!-- 第七行 -->
                  <a-row type="flex" justify="center" class="button">
                    <!-- 确认按钮 -->
                    <a-col>
                      <a-button size="large" type="primary" v-on:click="submitForm">Place Order</a-button>
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
                    </pre>
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
    import MyHeader from "./Header";
    export default {
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
            AL: "Alabama",
            AK: "Alaska",
            AR: "Arizona",
            CA: "California",
            NV: "Nevada",
          },
          gift: {
            sendGift: "Send As A Gift",
            dontSendGift: "Do Not Send As A Gift",
          },
          methods: {
            Home: "Home Address",
            Business: "Business Address",
          },
          order: {
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            gift: "Do Not Send As A Gift",
            method: "Home Address",
          },
        };
      },
      components: {
        MyHeader,
      },
      methods: {
        onChange(checked) {
          this.order.gift = checked ? this.gift.sendGift : this.gift.dontSendGift;
          console.log(this.order.gift);
        },
        submitForm() {
          alert("submit\n" + JSON.stringify(this.order));
        },
      },
    };
    </script>
    
    <style lang="css" scoped>
    .form {
      position: relative;
      width: 100%;
      top: 30px;
      height: calc(100% - 90px);
      /* overflow: scroll;
      overflow-x: hidden; */
    }
    .form .panel {
      display: block;
      border: 1px solid #bce8f1;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      margin: 30px 0px;
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
      padding: 3px 15px;
      /* font-size: 16px; */
    }
    /* 取消 加入form-item的位置样式 */
    .form .panel .panel-body .ant-col .ant-form-item {
      margin: 0px;
      /* 设置字体样式 */
      font-size: 16px;
    }
    .form .panel .panel-body h4 {
      font-size: 20px;
    }
    
    .form .panel .panel-body .button {
      padding: 30px 0;
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
    ```





### 设置姓名



* 设置 第二行 姓名
  * @/components/Form.vue

    ```html
    <!-- 第二行 -->
    <a-row type="flex">
      <!-- 名字 -->
      <a-col :flex="10">
        <!-- <strong>First Name:</strong> -->
        <a-form-model-item label="First Name" ref="name" prop="firstName">
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
    ```

    

  * 设置 rules

    ```html
    <script>
    export default {
      data() {
        return {
          // ...
          rules: {
            firstName: [
              {
                required: true,
                message: "Please input Activity first name",
                trigger: "blur",
              },
              {
                min: 3,
                max: 20,
                message: "Length should be 3 to 5",
                trigger: "blur",
              },
            ],
            lastName: [
              {
                required: true,
                message: "Please input Activity last name",
                trigger: "blur",
              },
              {
                min: 3,
                max: 20,
                message: "Length should be 3 to 5",
                trigger: "blur",
              },
            ],
          }
        }
      // ...
      }
    }  
    </script>
    ```

  



### 设置 地址栏

* 设置第三行 地址栏

  * @/components/Form.vue

    ```html
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
    ```

    

  * 设置 rules

    ```js
    rules: {
      // ...
      address: [
        {
          required: true,
          message: "Please input Activity address",
          trigger: "blur",
          },
      ],
    }
    ```

    



### 设置 城市



* 设置第四行 城市

  * @/components/Form.vue

    ```html
    <a-row>
      <!-- 城市 -->
      <a-col>
        <!-- <strong>City:</strong> -->
        <a-form-model-item label="City" prop="city">
          <a-input v-model="order.city"></a-input>
        </a-form-model-item>
      </a-col>
    </a-row>
    ```

    

  * 设置 rules

    ```js
    rules: {
      // ...
      city: [
        {
          required: true,
          message: "Please input Activity city",
          trigger: "blur",
          },
      ],
    }
    ```



### 设置 地区 邮政



* 设置第五行 地区 邮政

  * @/components/Form.vue

    ```html
    <a-row type="flex" justify="space-between">
      <!-- 地区 -->
      <a-col :flex="10">
        <!-- <strong>State:</strong> -->
        <a-form-model-item label="State" prop="state">
          <a-select v-model="order.state" style="width: 120px">
            <a-select-option value disabled>state</a-select-option>
            <a-select-option v-for="(state, name) in states" :key="state">{{ name }}</a-select-option>
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
    ```

    

  * 设置 rules

    ```js
    rules: {
      // ...
      state: [
        {
          required: true,
          message: "Please select Activity state",
          trigger: "change",
        },
      ],
    }
    ```

    



### 设置 礼物 地址属性



* 设置 第六行 礼物 地址属性

  * @/components/Form.vue

    ```html
    <a-row type="flex" justify="space-between" style="padding-top: 20px">
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
            >{{ name }}</a-radio-button>
          </a-radio-group>
        </a-form-model-item>
      </a-col>
    </a-row>
    ```

    

  * 设置 rules

    ```js
    rules: {
      // ...
      state: [
        {
          required: true,
          message: "Please input Activity zip",
          trigger: "blur",
        },
      ],
    }
    ```





### 提交验证



* 设置提交按钮 检验方法

  * @/components/Form.vue

    ```html
    <!-- 第七行 -->
    <a-row type="flex" justify="center" class="button">
      <!-- 确认按钮 -->
      <a-col>
        <a-button size="large" type="primary" v-on:click="submitForm">Place Order</a-button>
      </a-col>
    </a-row>
    ```

    

  * 设置 submitForm方法

    ```js
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    ```

    



## 总结目前页面

### 目前为止的 Form.vue



* lalala

  * @/components/Form.vue

    ```vue
    <template>
      <div class="container">
        <my-header></my-header>
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
                      <a-form-model-item label="First Name" ref="name" prop="firstName">
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
                          <a-select-option v-for="(state, name) in states" :key="state">{{ name }}</a-select-option>
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
                  <a-row type="flex" justify="space-between" style="padding-top: 20px">
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
                          >{{ name }}</a-radio-button>
                        </a-radio-group>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
    
                  <!-- 第七行 -->
                  <a-row type="flex" justify="center" class="button">
                    <!-- 确认按钮 -->
                    <a-col>
                      <a-button size="large" type="primary" v-on:click="submitForm">Place Order</a-button>
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
                    </pre>
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
    import MyHeader from "./Header";
    export default {
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
            AL: "Alabama",
            AK: "Alaska",
            AR: "Arizona",
            CA: "California",
            NV: "Nevada",
          },
          gift: {
            sendGift: "Send As A Gift",
            dontSendGift: "Do Not Send As A Gift",
          },
          methods: {
            Home: "Home Address",
            Business: "Business Address",
          },
          order: {
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            gift: "Do Not Send As A Gift",
            method: "Home Address",
          },
          rules: {
            firstName: [
              {
                required: true,
                message: "Please input Activity firstName",
                trigger: "blur",
              },
              {
                min: 3,
                max: 20,
                message: "Length should be 3 to 5",
                trigger: "blur",
              },
            ],
            lastName: [
              {
                required: true,
                message: "Please input Activity lastName",
                trigger: "blur",
              },
              {
                min: 3,
                max: 20,
                message: "Length should be 3 to 5",
                trigger: "blur",
              },
            ],
            address: [
              {
                required: true,
                message: "Please input Activity address",
                trigger: "blur",
              },
            ],
            city: [
              {
                required: true,
                message: "Please input Activity city",
                trigger: "blur",
              },
            ],
            state: [
              {
                required: true,
                message: "Please select Activity state",
                trigger: "change",
              },
            ],
            zip: [
              {
                required: true,
                message: "Please input Activity zip",
                trigger: "blur",
              },
            ],
          },
        };
      },
      components: {
        MyHeader,
      },
      methods: {
        // 礼物开关判定
        onChange(checked) {
          this.order.gift = checked ? this.gift.sendGift : this.gift.dontSendGift;
          console.log(this.order.gift);
        },
        submitForm() {
          this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              alert("submit!");
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        },
      },
    };
    </script>
    
    <style lang="css" scoped>
    .form {
      position: relative;
      width: 100%;
      top: 30px;
      height: calc(100% - 90px);
      /* overflow: scroll;
      overflow-x: hidden; */
    }
    .form .panel {
      display: block;
      border: 1px solid #bce8f1;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      margin: 30px 0px;
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
    ```



### 目前为止的 Header.vue



* lalala

  * @/components/Header.vue

    ```vue
    <template>
      <div class="header">
        <div class="top-bar">
          <a-row type="flex">
            <!-- 左侧网站名 -->
            <a-col :span="8" :offset="2" :xs="{  span: 24, offset: 0 }" :sm="{ span: 12, offset: 0 }">
              <h1>
                <router-link :to="{name: 'iMain'}">Vue.js Pet Depot</router-link>
              </h1>
            </a-col>
            <!-- 右侧购物车 -->
            <a-col :span="6" :offset="8" :xs="{  span: 24, offset: 0 }" :sm="{ span: 12, offset: 0 }">
              <router-link :to="{name: 'Form'}">
                <a-button size="large" :class="buttonClass">
                  <a-icon type="shopping-cart" />
                  <span>{{cartItemCount}} Checkout</span>
                </a-button>
              </router-link>
            </a-col>
          </a-row>
        </div>
      </div>
    </template>
    <script>
    export default {
      // props: ["cartItemCount"],
      data() {
        return {};
      },
      computed: {
        cartItemCount: function () {
          // return this.$store.getters.item.length;
          return this.$store.getters["shoppingCart/number"];
        },
        // 通过页面检测是否激活样式
        buttonClass: function () {
          if (this.$route.path === "/form") {
            return {
              "router-link-exact-active": {
                color: "#1890ff",
              },
            };
          }
        },
      },
      created() {},
    };
    </script>
    
    <style scoped>
    .header .top-bar {
      background-color: rgb(0, 21, 41);
    }
    .header .top-bar .ant-col {
      line-height: 90px;
      text-align: center;
    }
    .header .top-bar .ant-col h1 {
      font-size: 36px;
      margin: 0;
    }
    a {
      text-decoration: none;
      color: gray;
    }
    .router-link-exact-active {
      color: #1890ff;
    }
    </style>
    ```





### 目前为止的 Main.vue



* lalala

  * @/components/Main.vue

    ```vue
    <template>
      <!-- 计算库存信息 -->
      <div class="container">
        <my-header></my-header>
        <!-- 设置菜单栏 -->
        <div class="main">
          <!-- 循环物品清单每一行显示一个信息 -->
          <div class="list" v-for="product of products" :key="product.id">
            <a-row type="flex" justify="center" align="middle" class="list-row">
              <!-- 商品图片 -->
              <a-col :span="8">
                <img class="product-img" :src="product.image" :alt="product.title" />
              </a-col>
              <!-- 商品信息 -->
              <a-col class="list-information" :span="14">
                <router-link tag="h1" :to="{ name: 'Id', params: { id: product.id }}">{{product.title}}</router-link>
    
                <p v-html="product.description"></p>
                <!-- 价格 使用 filters -->
                <p>{{product.price | formatPrice}}</p>
                <!-- 购买按钮，如果库存没了改变样式 -->
                <a-button
                  type="primary"
                  size="large"
                  v-on:click="addToCart(product)"
                  v-if="canAddToCart(product)"
                >Add to cart</a-button>
                <!-- 库存没了的购买按钮样式 -->
                <a-button type="primary" size="large" disabled v-else>Add to cart</a-button>
                <!-- 提示库存量信息 -->
                <span
                  class="inventory-message"
                  v-if="product.availableInventory - cartCount(product.id) === 0"
                >All Out!</span>
                <span
                  class="inventory-message"
                  v-else-if="product.availableInventory - cartCount(product.id) < 5"
                >Only {{product.availableInventory - cartCount(product.id)}} left!!!</span>
                <span class="inventory-message" v-else>Buy Now!</span>
                <div class="rating">
                  <span v-for="(i, index) of 5" :key="index">
                    <!-- 使用方法确定star图标的theme值，返回一个字符串 -->
                    <a-icon class="star" type="star" v-bind:theme="checkRating(index, product.rating)" />
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
    import MyHeader from "./Header";
    export default {
      data() {
        return {
          // 商品，加入 store 后注释掉
          products: [],
          // 购物车，加入 store 后注释掉
          // cart: [],
        };
      },
      methods: {
        // 检测rating循环来判定星星是否实体
        checkRating(index, rating) {
          if (index < rating) {
            return "filled";
          } else {
            return "outlined";
          }
        },
        // 点击添加商品到购物车
        addToCart(product) {
          this.$store.dispatch("shoppingCart/addToCart", product.id);
          // this.cart.push(product.id);
        },
        // 计算库存信息
        canAddToCart: function (product) {
          return product.availableInventory > this.cartCount(product.id);
        },
        // 计算购物车中的同一商品数量
        cartCount: function (productId) {
          let count = 0;
          for (var i = 0; i < this.cart.length; i++) {
            if (productId === this.cart[i]) {
              count++;
            }
          }
          return count;
        },
      },
      computed: {
        /*
        products: function () {
          // 当 vue 检测到 getters的值发生变化，就能完成赋值
          return this.$store.getters["products/all"];
        },
        */
        cart: function () {
          // return this.$store.state.shoppingCart.item
          return this.$store.getters["shoppingCart/item"];
        },
        // 购物车中商品数量，显示在右上角
        // 需要使用 props 传给 my-header
        // cartItemCount: function () {
        //   return this.cart.length || "";
        // },
      },
      components: {
        MyHeader,
      },
      // 创建虚拟DOM时获取物品清单
      created: function () {
        /* 使用 store 接收数据，所以注释掉
        this.axios.get("/static/products.json").then((response) => {
          this.products = response.data.products;
          console.log(this.products);
        });
        */
        this.$store.dispatch("products/getAllProducts");
      },
      watch: {
        /*
        监听 store 的 products 的 state 中的 all，
        异步完成后数据就会刷新
        */
        "$store.state.products.all": function (newVal) {
          console.log(newVal);
          this.products = newVal;
        },
      },
      // 创建过滤器
      filters: {
        formatPrice: function (price) {
          // 参数如果不是数字
          if (!parseInt(price)) {
            return "0.00";
          }
          // 为价格添加小数点
          var priceString = (price / 100).toFixed(2);
          // 如果价格大于99999用逗号分隔3位
          if (price > 99999) {
            // 将价格设置为数组
            var priceArray = priceString.split("").reverse();
            // 设置位移量
            var index = 3;
            while (priceArray.length > index + 3) {
              // 在数组中每3位插入 ,
              priceArray.splice(index + 3, 0, ",");
              index += 4;
            }
            // 将数组转换成字符串
            priceString = priceArray.reverse().join("");
          }
          return "$ " + priceString;
        },
      },
    };
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
    </style>
    ```







### 目前为止的 Product.vue



* lalala

  * @/components/Product.vue

    ```vue
    <template>
      <!-- 计算库存信息 -->
      <div class="container">
        <my-header></my-header>
        <!-- 设置菜单栏 -->
        <div class="main">
          <!-- 循环物品清单每一行显示一个信息 -->
          <div class="list">
            <a-row type="flex" justify="center" align="middle" class="list-row">
              <!-- 商品图片 -->
              <a-col :span="8">
                <img class="product-img" :src="product.image" :alt="product.title" />
              </a-col>
              <!-- 商品信息 -->
              <a-col class="list-information" :span="14">
                <h1>{{product.title}}</h1>
                <p v-html="product.description"></p>
                <!-- 价格 使用 filters -->
                <p>{{product.price | formatPrice}}</p>
                <!-- 添加修改按钮 -->
                <a-button v-show="editPageState" size="large" v-on:click="edit()">Edit Product </a-button>
                <!-- 添加关闭按钮 -->
                <a-button v-show="!editPageState" size="large" v-on:click="closeEdit()">Close</a-button>
                <div class="rating">
                  <span v-for="(i, index) of 5" :key="index">
                    <!-- 使用方法确定star图标的theme值，返回一个字符串 -->
                    <a-icon class="star" type="star" v-bind:theme="checkRating(index, product.rating)" />
                  </span>
                </div>
              </a-col>
            </a-row>
            <!-- 显示 修改 页面 -->
            <router-view v-show="!editPageState"></router-view>
          </div>
        </div>
      </div>
    </template>
    <script>
    import MyHeader from "./Header";
    
    export default {
      data() {
        return {
          product: {},
          // 是否显示修改页面
          editPageState: true
        };
      },
      methods: {
        edit() {
          // 其实不用传 id，如果刷新页面，没按按钮，就不传id了，肯定获取不了数据
          // 而 因为 用了 router-view，其实 path一直都有进入这个页面的id参数
          // this.$router.push({ name: "EditProduct", params: { productId: id } });
           this.$router.push({ name: "EditProduct"});
           this.editPageState = false
        },
        closeEdit() {
          this.editPageState = true
        },
         // 检测rating循环来判定星星是否实体
        checkRating(index, rating) {
          if (index < rating) {
            return "filled";
          } else {
            return "outlined";
          }
        },
      },
    
      created() {
        this.$store.dispatch("products/getAllProducts");
        /*
        这种一刷新就丢失了数据，因为刷新后 store 清空了
        但是访问页面有时直接访问单个，不应该丢失
        this.product = this.$store.getters["products/all"].filter(
          (data) => data.id == this.$route.params.id
        )[0];
        this.product.image = "/" + this.product.image;
        console.log(this.product);
        */
      },
      watch: {
        "$store.state.products.all"(oldVal, newVal) {
          this.product = this.$store.getters["products/all"].filter(
            (data) => data.id == this.$route.params.id)[0];
          this.product.image = "/" + this.product.image;
        },
      },
    
      filters: {
        formatPrice: function (price) {
          // 参数如果不是数字
          if (!parseInt(price)) {
            return "0.00";
          }
          // 为价格添加小数点
          var priceString = (price / 100).toFixed(2);
          // 如果价格大于99999用逗号分隔3位
          if (price > 99999) {
            // 将价格设置为数组
            var priceArray = priceString.split("").reverse();
            // 设置位移量
            var index = 3;
            while (priceArray.length > index + 3) {
              // 在数组中每3位插入 ,
              priceArray.splice(index + 3, 0, ",");
              index += 4;
            }
            // 将数组转换成字符串
            priceString = priceArray.reverse().join("");
          }
          return "$ " + priceString;
        },
      },
      components: {
        MyHeader,
      },
    };
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
    </style>
    ```







### 目前为止的 EditProduct.vue



* lalala

  * @/components/EditProduct.vue

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
              <a-input type="textarea" v-model="product.description"></a-input>
            </a-form-model-item>
            <a-form-model-item label="Price" prop="price">
              <a-input-number v-model="product.price"></a-input-number>
            </a-form-model-item>
            <a-form-model-item label="Rating" prop="rating">
              <a-input-number :min="0" :max="5" v-model="product.rating"></a-input-number>
            </a-form-model-item>
            <a-form-model-item label="AvailableInventory" prop="availableInventory">
              <a-input-number :min="0" v-model="product.availableInventory"></a-input-number>
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
        };
      },
      computed: {
        // 进入页面后获取数据，如果获取不到就 dispatch store
        // 用 $store.state来判断数据，如果一改变，计算属性就更新
        product() {
          if (this.$store.state.products.all) {
            return this.$store.getters["products/all"].filter(
              (data) => data.id == this.$route.params.id
            )[0];
          } else {
            this.$store.dispatch("products/getAllProducts");
          }
        },
      },
      methods: {},
    };
    </script>
    <style lang="css" scoped>
    .form-row {
      background-color: #f5f5f5;
    }
    </style>
    ```

    









# 设置动态路由





## 设置 Header.vue 的点击样式（动态绑定class）



* 先设置 router-link-exact-active 样式

  * @/components/Header.vue 

    ```css
    a {
      text-decoration: none;
      color: gray;
    }
    .router-link-exact-active {
      color: #1890ff;
    }
    ```

    

  * 这样每次切换 Main页面都有颜色转变

  * 但是 切换 Form 的按键没有变化，原因是 &lt;router-link&gt;  包裹了 &lt;a-button&gt;  无法触发

  * 所以 绑定 class 吧

  

* 设置 button 样式， 跟设置检测的计算属性

  * @/components/Header.vue 

    ```html
    <a-button size="large" :class="buttonClass">
    ```

    

* 设置 buttonClass 计算属性

  * @/components/Header.vue 

    ```js
    computed: {
      // ...
      buttonClass: function () {
        if (this.$route.path === "/form") {
          return {
            "router-link-exact-active": {
              color: "#1890ff",
            },
          };
        }
      },
    },
    ```





## 在 Main 的商品名字添加路由



* 动态路由 需要使用 this.$route.params.变量名 接收， 用 router-link :to 放入动态路由信息

  * 格式

    ```js
    {
      name: '路由名字',
      params: {
        变量名: 值
      }
    }
    ```

    



* 使用 router-link 的 params 属性， 把 参数提交给路由

  * @/components/Main.vue

    ```html
    <!-- 商品信息 -->
    <a-col class="list-information" :span="14">
      <router-link tag="h1" :to="{ name: 'Id', params: { id: product.id }}"》
        {{product.title}}
      </router-link>
      <!-- 省略 -->
    </a-col>
    ```

    



## 设置单个商品页面动态路由



* 在 router/index.js 里设置 动态路由

  * router/index.js

    ```js
    import Product from '@/components/Product'
    
    
    // 动态路由
    {
      path: '/product/:id',
      name: 'Id',
      component: Product,
      props: true
    }
    ```

  

  

* 将 Main.vue 部分路由 复制过去 Product.vue，顺便修改下

  * @/components/Product.vue

    ```vue
    <template>
      <!-- 计算库存信息 -->
      <div class="container">
        <my-header></my-header>
        <!-- 设置菜单栏 -->
        <div class="main">
          <!-- 循环物品清单每一行显示一个信息 -->
          <div class="list">
            <a-row type="flex" justify="center" align="middle" class="list-row">
              <!-- 商品图片 -->
              <a-col :span="8">
                <img class="product-img" :src="product.image" :alt="product.title" />
              </a-col>
              <!-- 商品信息 -->
              <a-col class="list-information" :span="14">
                <h1>{{product.title}}</h1>
                <p v-html="product.description"></p>
                <!-- 价格 使用 filters -->
                <p>{{product.price | formatPrice}}</p>
                <div class="rating">
                  <span v-for="(i, index) of 5" :key="index">
                    <!-- 使用方法确定star图标的theme值，返回一个字符串 -->
                    <a-icon class="star" type="star" v-bind:theme="checkRating(index, product.rating)" />
                  </span>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
    </template>
    <script>
    import MyHeader from "./Header";
    
    export default {
      data() {
        return {
          product: {},
        };
      },
      methods: {
         // 检测rating循环来判定星星是否实体
        checkRating(index, rating) {
          if (index < rating) {
            return "filled";
          } else {
            return "outlined";
          }
        },
      },
    
      created() {
        this.$store.dispatch("products/getAllProducts");
        /*
        这种一刷新就丢失了数据，因为刷新后 store 清空了
        但是访问页面有时直接访问单个，不应该丢失
        this.product = this.$store.getters["products/all"].filter(
          (data) => data.id == this.$route.params.id
        )[0];
        this.product.image = "/" + this.product.image;
        console.log(this.product);
        */
      },
      watch: {
        "$store.state.products.all"(oldVal, newVal) {
          this.product = this.$store.getters["products/all"].filter(
            (data) => data.id == this.$route.params.id)[0];
          this.product.image = "/" + this.product.image;
        },
      },
    
      filters: {
        formatPrice: function (price) {
          // 参数如果不是数字
          if (!parseInt(price)) {
            return "0.00";
          }
          // 为价格添加小数点
          var priceString = (price / 100).toFixed(2);
          // 如果价格大于99999用逗号分隔3位
          if (price > 99999) {
            // 将价格设置为数组
            var priceArray = priceString.split("").reverse();
            // 设置位移量
            var index = 3;
            while (priceArray.length > index + 3) {
              // 在数组中每3位插入 ,
              priceArray.splice(index + 3, 0, ",");
              index += 4;
            }
            // 将数组转换成字符串
            priceString = priceArray.reverse().join("");
          }
          return "$ " + priceString;
        },
      },
      components: {
        MyHeader,
      },
    };
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
    </style>
    ```



## 加入修改按键与页面



* 先添加按钮

  * @/components/Product.vue

    ```html
    <!-- 价格 使用 filters -->
    <p>{{product.price | formatPrice}}</p>
    <!-- 添加修改按钮 -->
    <a-button size="large" v-on:click="edit()">Edit Product</a-button>
    <div class="rating">
    ```

    

  * @/components/Product.vue

    ```js
    methods: {
      edit() {
        // 其实不用传 id，如果刷新页面，没按按钮，就不传id了，肯定获取不了数据
        // 而 因为 用了 router-view，其实 path一直都有进入这个页面的id参数
        // this.$router.push({ name: "EditProduct", params: { productId: id } });
         this.$router.push({ name: "EditProduct"});
      },
    }
    ```

    

  * 因为将使用 router-view，所以 Product的 路由参数是会保留，所以访问 路由的 参数id即可获得 product信息，所以 edit不需要带参数



* 创建 EditProduct.vue

  * @/components/EditProduct.vue

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
              <a-input type="textarea" v-model="product.description"></a-input>
            </a-form-model-item>
            <a-form-model-item label="Price" prop="price">
              <a-input-number v-model="product.price"></a-input-number>
            </a-form-model-item>
            <a-form-model-item label="Rating" prop="rating">
              <a-input-number :min="0" :max="5" v-model="product.rating"></a-input-number>
            </a-form-model-item>
            <a-form-model-item label="AvailableInventory" prop="availableInventory">
              <a-input-number :min="0" v-model="product.availableInventory"></a-input-number>
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
        };
      },
      computed: {
        // 进入页面后获取数据，如果获取不到就 dispatch store
        // 用 $store.state来判断数据，如果一改变，计算属性就更新
        product() {
          if (this.$store.state.products.all) {
            return this.$store.getters["products/all"].filter(
              (data) => data.id == this.$route.params.id
            )[0];
          } else {
            this.$store.dispatch("products/getAllProducts");
          }
        },
      },
      methods: {},
    };
    </script>
    <style lang="css" scoped>
    .form-row {
      background-color: #f5f5f5;
    }
    </style>
    ```

  

* 添加切换按钮

  * @/components/Products.vue

    ```html
    <!-- 添加修改按钮 -->
    <a-button v-show="editPageState" size="large" v-on:click="edit()">Edit Product </a-button>
    <!-- 添加关闭按钮 -->
    <a-button v-show="!editPageState" size="large" v-on:click="closeEdit()">Close</a-button>
    ```

    

  * @/components/Products.vue

    ```html
    <!-- 显示 修改 页面 -->
    <router-view v-show="!editPageState"></router-view>
    ```

    

  * @/components/Products.vue

    ```js
    data() {
      return {
        product: {},
        // 是否显示修改页面
        editPageState: true
      };
    },
    methods: {
      edit() {
        // 其实不用传 id，如果刷新页面，没按按钮，就不传id了，肯定获取不了数据
        // 而 因为 用了 router-view，其实 path一直都有进入这个页面的id参数
        // this.$router.push({ name: "EditProduct", params: { productId: id } });
         this.$router.push({ name: "EditProduct"});
         this.editPageState = false
      },
      closeEdit() {
        this.editPageState = true
      },
    // ...
    ```







## 添加子路由



* 在 Product 路由 下面 添加子路由

  * 注意 path 不要加 /

  * @/router/index.js

    ```js
    import EditProduct from '@/components/EditProduct'
    
    // 动态路由
    {
      path: '/product/:id',
      name: 'Id',
      component: Product,
      props: true,
      // 添加子路由
      children: [
        {
          // 不需要反斜杠添加 根目录
          path: 'edit',
          name: 'EditProduct',
          component: EditProduct,
          props: true
        }
      ]
    }
    ```





## 多次点击 router-link 报错



* 刚刚试了不断点击 router-link 会跳出错误

  ```shell
  Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/product/1001/edit".
      at createRouterError (webpack-internal:///./node_modules/vue-router/dist/vue-router.esm.js:1958:15)
  ```

  ​	

* 网上说添加一段代码在 main.js 可以解决

  * @/main.js

    ```js
    // 避免多次点击路由报错
    // Uncaught (in promise) NavigationDuplicated
    import Router from 'vue-router'
     
    const originalPush = Router.prototype.push
    Router.prototype.push = function push(location) {
      return originalPush.call(this, location).catch(err => err)
    }
    ```





## 使用重定向和通配符



* 在 router/index.js 添加，如果ip对了，路由器没注册的其他路径可以被捕获，可以被 router 送回主页面

  * @/router/index.js

    ```js
    import Vue from 'vue'
    import Router from 'vue-router'
    import HelloWorld from '@/components/HelloWorld'
    // 引入 Main 组件
    import Main from '@/components/Main'
    import Form from '@/components/Form'
    import Product from '@/components/Product'
    import EditProduct from '@/components/EditProduct'
    
    
    Vue.use(Router)
    
    export default new Router({
      routes: [
        {
          path: '/',
          name: 'HelloWorld',
          component: HelloWorld
        },
        // 添加 Main 路由信息
        {
          path: '/main',
          name: 'iMain',
          component: Main
        },
        // 添加 Form 路由信息
        {
          path: '/form',
          name: 'Form',
          component: Form
        },
        // 动态路由
        {
          path: '/product/:id',
          name: 'Id',
          component: Product,
          props: true,
          // 添加子路由
          children: [
            {
              // 不需要反斜杠添加 根目录
              path: 'edit',
              name: 'EditProduct',
              component: EditProduct,
              props: true
            }
          ]
        },
        // 重定向
        {
          path: '*',
          redirect: '/'
        }
      ]
    })
    
    ```





## 隐藏 url 中的 #

https://blog.csdn.net/fifteen718/article/details/82529433



* 如何隐藏，修改router的模式即可

  * @/router/index.js

    ```js
    export default new Router({
      mode: 'history',
      routes: [
        {
          path: '/',
          name: 'HelloWorld',
          // 省略
        }
      ]
    })
    ```

    





# 转场动画



## 转场



* 先在每个页面切换添加转场效果

  * @/App.vue

    ```vue
    <template>
      <div id="app">
        <!-- <img src="./assets/logo.png"> -->
        <!-- 添加转场 -->
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </template>
    
    <script>
    export default {
      name: 'App'
    }
    </script>
    
    <style>
    /*
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    }
    */
    html{
     overflow-y: overlay;
    }
    #app {
        padding: 0 20px;
    }
    
    
    .fade-enter-active, .fade-leave-active {
      transition: opacity .2s ease-out;
    
    }
    
    .fade-enter, .fade-leave-to {
      opacity: 0;
    
    }
    </style>
    
    ```





## 添加 All Out 效果



* 去 Main.vue 添加效果

* transition 包裹的元素就可以实现 转场效果， 用 name 这是属性的值 在css定义就好了

* 因为 span 是个 行内元素，动画难啊，所以要给他 display: inline-block 属性

* transition 元素 可以使用 key特性区分 它下面的 相同标签，当 key attribute 为 空，就没有效果了

  

* 将 transition 元素 包裹 三个 span，还要添加 key 特性（好习惯）

  * @/components/Main.vue

    ```html
    <!-- 添加动画效果 -->
    <transition name="bounce" mode="out-in">
      <!-- 提示库存量信息 -->
      <span
        class="inventory-message"
        v-if="product.availableInventory - cartCount(product.id) === 0"
        key="0"
      >All Out!</span>
      <span
        class="inventory-message"
        v-else-if="product.availableInventory - cartCount(product.id) < 5"
        key=""
      >Only {{product.availableInventory - cartCount(product.id)}} left!!!</span>
      <span class="inventory-message" v-else key="">Buy Now!</span>
    </transition>
    ```

    

* 为 这三个 span 的 样式添加 display: inline-block

  * @/components/Main.vue

    ```css
    /* 购买提示语 */
    .main .list .list-information .inventory-message {
      font-size: 150%;
      margin-left: 20px;
      font-weight: bold;
      display: inline-block;
    }
    ```



* 添加动画效果

  * @/components/Main.vue

    ```css
    /* All out 动画效果 */
    .bounce-enter-active {
      animation: shake 0.72s cubic-bezier(.37,.07,.19,.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
    }
    
    @keyframes shake {
      10%, 90% {
        color: red;
        transform: translate3d(-1px, 0, 0);
      }
    
      20%, 80% {
        transform: translate3d(2px, 0, 0);
      }
    
      30%, 50%, 70% {
        color: red;
        transform: translate3d(-4px, 0, 0);
      }
    
      40%, 60% {
        transform: translate3d(4px, 0, 0);
      }
    }
    ```





## EditProduct 插入效果



* 先用 transition 包裹 Product 的 router-view 标签

  * @/components/Product.vue

    ```html
    <transition name="edit-product" mode="out-in">
      <!-- 显示 修改 页面 -->
      <router-view v-show="!editPageState"></router-view>
    </transition>
    ```

    

* 为这个转场配置css效果

  * @/components/Product.vue

    ```css
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
    ```

  

* 为 按键配置同样的转场时间，

* v-show本身会修改 transition的 remove方法，本身就是一个动画效果，如果 transition 下有多个 v-show，估计不行，除非使用 transition-group

* 但是可以使用 v-if，怕频繁切换的消耗的话，可以是 用 keep-alive 包裹 v-if的标签

  * @/components/Product.vue

    ```html
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
          size="large"
          v-on:click="edit()"
          key="Edit"
          >Edit Product
        </a-button>
        <a-button v-else size="large" v-on:click="closeEdit()" key="Close"
          >Close</a-button
        >
      </keep-alive>
    </transition>
    ```

  

* 顺便把按键大小设置一样吧

  * @/components/Product.vue

    ```css
    /* 按键大小 */
    .main .list .list-information .ant-btn-lg {
      width: 120px;
    }
    ```

  

* 然后配置过场效果

  * @/components/Product.vue

    ```css
    /* 按键过渡属性 */
    .edit-product-button-enter-active,
    .edit-product-button-leave-active {
      transition: all 1s ease;
    }
    /* 按键过渡开始跟结束状态 */
    .edit-product-button-enter,
    .edit-product-button-leave-to{
      opacity: 0;
      transform: translateX(120px);
    }
    ```

    

### 目前为止的 Product.vue



* lalala

  * @/components/Product.vue

    ```vue
    <template>
      <!-- 计算库存信息 -->
      <div class="container">
        <my-header></my-header>
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
                      size="large"
                      v-on:click="edit()"
                      key="Edit"
                      >Edit Product
                    </a-button>
                    <a-button v-else size="large" v-on:click="closeEdit()" key="Close"
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
                      v-bind:theme="checkRating(index, product.rating)"
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
    import MyHeader from "./Header";
    
    export default {
      data() {
        return {
          product: {},
          // 是否显示修改页面
          editPageState: true,
        };
      },
      methods: {
        edit() {
          // 其实不用传 id，如果刷新页面，没按按钮，就不传id了，肯定获取不了数据
          // 而 因为 用了 router-view，其实 path一直都有进入这个页面的id参数
          // this.$router.push({ name: "EditProduct", params: { productId: id } });
          this.$router.push({ name: "EditProduct" });
          this.editPageState = false;
        },
        closeEdit() {
          this.editPageState = true;
        },
        // 检测rating循环来判定星星是否实体
        checkRating(index, rating) {
          if (index < rating) {
            return "filled";
          } else {
            return "outlined";
          }
        },
      },
    
      created() {
        this.$store.dispatch("products/getAllProducts");
        /*
        这种一刷新就丢失了数据，因为刷新后 store 清空了
        但是访问页面有时直接访问单个，不应该丢失
        this.product = this.$store.getters["products/all"].filter(
          (data) => data.id == this.$route.params.id
        )[0];
        this.product.image = "/" + this.product.image;
        console.log(this.product);
        */
      },
      watch: {
        "$store.state.products.all"(oldVal, newVal) {
          this.product = this.$store.getters["products/all"].filter(
            (data) => data.id == this.$route.params.id
          )[0];
          this.product.image = "/" + this.product.image;
        },
      },
    
      filters: {
        formatPrice: function (price) {
          // 参数如果不是数字
          if (!parseInt(price)) {
            return "0.00";
          }
          // 为价格添加小数点
          var priceString = (price / 100).toFixed(2);
          // 如果价格大于99999用逗号分隔3位
          if (price > 99999) {
            // 将价格设置为数组
            var priceArray = priceString.split("").reverse();
            // 设置位移量
            var index = 3;
            while (priceArray.length > index + 3) {
              // 在数组中每3位插入 ,
              priceArray.splice(index + 3, 0, ",");
              index += 4;
            }
            // 将数组转换成字符串
            priceString = priceArray.reverse().join("");
          }
          return "$ " + priceString;
        },
      },
      components: {
        MyHeader,
      },
    };
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
    .edit-product-button-leave-to{
      opacity: 0;
      transform: translateX(120px);
    }
    </style>
    ```

    



# Mixin

* 书上没说使用场景

* 就我这个应用来讲，多个页面都使用了 dispatch store，可以使用 Mixin

  

* 先在 src 先创建 mixins文件夹，加入 productStore.js

  * @/mixins/productStore.js

    ```js
    const dispatchProductsStore = {
        data () {
            return {
                // products: []
            }
        },
        created: function () {
            this.$store.dispatch("products/getAllProducts");
            // console.log("mixin")
        },
    }
    
    export {
        dispatchProductsStore
    }
    ```

    

* 在 Main 注释掉 created 且导入 productsStore

  * @/components/Main.vue

    ```html
    <script>
    // 省略
    import {dispatchProductsStore} from "@/mixins/productsStore"
    // 省略
    export default {
       data() {
        return {
          // 商品
          products: [],
          // 购物车，加入 store 后注释掉
          // cart: [],
        };
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
      watch: {
        
        // 监听 store 的 products 的 state 中的 all，
        // 异步完成后数据就会刷新
        
        "$store.state.products.all": function (newVal) {
          console.log(newVal);
          this.products = newVal;
        },
      },
    }
    </script>
    ```

    

* 在 Product.vue 注释掉 created 且导入 productsStore

  * @/components/Product.vue

    ```html
    <script>
    // 省略
    import {dispatchProductsStore} from "@/mixins/productsStore"
    // 省略
    export default {
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
    }
    </script>
    ```

    

自定义指令 JSX 好像无处可用~



之后使用 Nuxt.js







