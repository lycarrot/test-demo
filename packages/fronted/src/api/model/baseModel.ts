export interface PageParams {
  page: number
  limit: number
}

export type PageModel = PageParams & {
  total: number
}
