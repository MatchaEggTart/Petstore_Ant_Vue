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
