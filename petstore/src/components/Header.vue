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