import request from '@/utils/request'
// 1.获取搜索商品列表数据
export const getProList = (obj) => {
  const { sortType, sortPrice, categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      sortType,
      sortPrice,
      categoryId,
      goodsName,
      page
    }
  })
}

// 2.获取商品详情
export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

// 3.获取商品评论
export const getProComment = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
