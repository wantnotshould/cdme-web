export interface InfoReq {
  id: number
}

export interface DeleteReq {
  id: number
}

export interface PageReq {
  page: number
  per_page: number
}

export interface ListReq extends PageReq {}
