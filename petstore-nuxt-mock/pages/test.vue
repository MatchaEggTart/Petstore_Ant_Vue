<template>
  <div></div>
</template>

<script>
import axios from 'axios'
export default {
  asyncData() {
    return axios
      .get(
        `http://easy-mock.com/mock/5f7d9efff9d9bd19dca628e4/petstore-mock/products`
      )
      .then((response) => {
        window.console.log(response.data)
      })
  },
}
</script>
