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