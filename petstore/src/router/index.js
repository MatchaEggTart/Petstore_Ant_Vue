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
  mode: 'history',
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
