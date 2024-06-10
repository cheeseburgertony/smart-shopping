import request from '@/utils/request'
// 1.订单结算确认
// mode:cart => cartIds
// mode:buyNow => goodsId,goodsNum,goodsSkuId
export const checkOrder = (mode, obj) => {
  // 这里部分要求传参不太一样
  return request.get('/checkout/order', {
    params: {
      mode, // 结算模式（buyNow立即购买 cart购物车）
      delivery: 10, // 配送方式（10快递配送 20上门自提）
      couponId: 0, // 优惠券ID
      isUsePoints: 0, // 是否使用积分抵扣（1使用 0不使用）
      ...obj
    }
  })
}

// 2.提交订单
// mode:cart => cartIds,remark
// mode:buyNow => goodsId,goodsNum,goodsSkuId,remark
export const commitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode, // 结算模式（buyNow立即购买 cart购物车）
    delivery: 10, // 配送方式（10快递配送 20上门自提）
    couponId: 0, // 优惠券ID
    isUsePoints: 0, // 是否使用积分抵扣（1使用 0不使用）
    payType: 10, // 支付方式，10：余额支付
    ...obj
  })
}

// 3.获取订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
