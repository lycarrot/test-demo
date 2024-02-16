import api from '@/lib/requeset'
import {
  GetInfoModel,
  // UserListsParams,
  GetPicListsModel,
} from './model/userModel'
import { PageParams } from './model/baseModel'
const baseUrl = '/user'

enum Api {
  UserInfo = `${baseUrl}/info`,
  PicLists = `${baseUrl}/pic-lists`,
  // SetInfo = `${baseUrl}/setInfo`,
}

// get请求
export const _getUserInfo = () => {
  return api.get<GetInfoModel>({
    url: `${Api.UserInfo}`,
  })
}

//get请求query
export const _getPicLists = (params: PageParams) => {
  return api.get<GetPicListsModel>({
    url: Api.PicLists,
    params,
  })
}
