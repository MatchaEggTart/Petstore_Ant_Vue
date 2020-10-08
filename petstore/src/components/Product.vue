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
                <a-button
                  v-else
                  size="large"
                  v-on:click="closeEdit()"
                  key="Close"
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
import { dispatchProductsStore } from "@/mixins/productsStore";

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
.edit-product-button-leave-to {
  opacity: 0;
  transform: translateX(120px);
}
</style>