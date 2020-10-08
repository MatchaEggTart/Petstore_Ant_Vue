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
import {dispatchProductsStore} from '@/mixins/productsStore.js'
export default {
  data() {
    return {
      // 商品
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
</style>