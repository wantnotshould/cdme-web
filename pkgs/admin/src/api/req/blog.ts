import type { ListReq } from '@/api/req/req'

export interface BlogListReq extends ListReq {
  keyword?: string
  category_id?: number
  status?: number
}

export interface BlogCreateReq {
  category_id: number
  status: number
  slug: string
  title: string
  summary: string
  content: string
}

export interface BlogUpdateReq {
  category_id: number
  status: number
  slug: string
  title: string
  summary: string
  content: string
}
