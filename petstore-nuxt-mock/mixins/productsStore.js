const dispatchProductsStore = {
  data() {
    return {
      products: [],
      product: {},
      // 分页 变量
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
