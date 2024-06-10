import request from '@/utils/request'
// 封装从分类列表请求数据
export const getCategoryData = () => {
  return request.get('/category/list')
}
