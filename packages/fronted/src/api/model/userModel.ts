import { PageModel } from './baseModel'
export interface GetInfoModel {
  name: string
  num: number
  desc: string
  img: string
}

export type GetPicListsModel = PageModel & {
  lists: {
    id: string
    download_url: string
    show: boolean
    hover: boolean
  }[]
}
