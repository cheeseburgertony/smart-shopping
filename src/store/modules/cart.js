import { changeCartCount, getCartList, delCart } from '@/apis/cart'
export default {
  namespaced: true,
  state: {
    cartList: []
  },
  mutations: {
    // 设置购物车列表
    setCartList (state, newState) {
      state.cartList = newState
    },
    // 改变小复选框状态
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    // 全选框控制反选
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    // 修改购物车数量
    changeCartCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartListAction (context) {
      const { data } = await getCartList()
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    async changeCartCountAction (context, obj) {
      const { goodsId, goodsNum, goodsSkuId } = obj
      // 先修改本地
      context.commit('changeCartCount', { goodsId, goodsNum })
      // 再提交到后台修改
      await changeCartCount(goodsId, goodsNum, goodsSkuId)
    },
    async delCartAction (context) {
      // 获取选中的数据,使用map重新映射成只有id的数组
      const cartIds = context.getters.selCartList.map(item => item.id)
      // 发送请求删除
      await delCart(cartIds)
      // 调用重新获取购物车列表数据 (重新渲染)
      context.dispatch('getCartListAction')
    }
  },
  getters: {
    // 购物车总数
    cartTotal (state) {
      return state.cartList.reduce((prev, current) => prev + current.goods_num, 0)
    },
    // 选中的商品列表
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked === true)
    },
    // 选中的商品数量   如果要想使用getters中其他方法可以直接使用getters.方法名来获取
    selCount (state, getters) {
      return getters.selCartList.reduce((prev, current) => prev + current.goods_num, 0)
    },
    // 选中的商品价格
    selPrice (state, getters) {
      return getters.selCartList.reduce((prev, current) => prev + current.goods_num * current.goods.goods_price_max, 0).toFixed(2)
    },
    // 全选框状态
    isAllCheck (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
