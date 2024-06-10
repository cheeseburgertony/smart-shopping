// 封装首页接口
// 获取首页数据
import reques from '@/utils/request'
export const getHomeData = () => {
  return reques.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
