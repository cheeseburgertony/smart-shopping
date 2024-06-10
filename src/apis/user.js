// 获取个人信息
import request from '@/utils/request'
export const getUserInfoDetail = () => {
  return request.get('/user/info')
}
