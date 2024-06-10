import request from '@/utils/request'
// 1.添加到购物车发送请求
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId // 商品规格id
  })
}

// 2.请求购物车列表数据
export const getCartList = () => {
  return request.post('/cart/list')
}

// 3.更新购物车数量数据
export const changeCartCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 4.删除购物车数据
export const delCart = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
