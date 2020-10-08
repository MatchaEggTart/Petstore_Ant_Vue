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
