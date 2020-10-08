export default {
    // 购物车里商品ID数组
    item: state => state.item,
    // 购物车商品总数
    number: state => state.item.length
}