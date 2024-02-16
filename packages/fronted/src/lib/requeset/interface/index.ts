export interface Result<T = any> {
  code: number
  status?: number
  message: string
  data: T
}
