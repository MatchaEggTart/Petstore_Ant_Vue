export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'petstore-nuxt-mock',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['ant-design-vue/dist/antd.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/antd-ui',
    // 添加瀑布流
    { src: '~plugins/vue-infinite-scroll', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // '@nuxtjs/proxy',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    // proxy: true,
    // credentials: true,
  },
  proxy: {
    // '/api': {
    //   target:
    //     'https://easy-mock.com/mock/5f7d9efff9d9bd19dca628e4/petstore-mock/products',
    //   changeOrigin: true,
    // },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
