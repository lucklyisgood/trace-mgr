export interface NetResp<T = unknown> {
  code: number,
  msg: string,
  data?: T
}
