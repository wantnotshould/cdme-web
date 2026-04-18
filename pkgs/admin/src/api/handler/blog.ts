import request from '@/utils/request'
import type { BlogCreateReq, BlogListReq, BlogUpdateReq } from '../req/blog'
import type { DeleteReq, InfoReq } from '../req/req'
import type { BlogInfoResp, BlogListItemResp } from '../resp/blog'
import type { CommonResp, PageContent } from '../resp/resp'

export const blogList = (param: BlogListReq) => {
  return request.get<CommonResp<PageContent<BlogListItemResp>>>('/api/v1/admin/posts', {
    params: param,
  })
}

export const blogInfo = (param: InfoReq) => {
  return request.get<CommonResp<BlogInfoResp>>(`/api/v1/admin/posts/${param.id}`)
}

export const blogCreate = (param: BlogCreateReq) => {
  return request.post<CommonResp>('/api/v1/admin/posts', param)
}

export const blogUpdate = (id: number, param: BlogUpdateReq) => {
  return request.put<CommonResp>(`/api/v1/admin/posts/${id}`, param)
}

export const blogDelete = (param: DeleteReq) => {
  return request.delete<CommonResp>(`/api/v1/admin/posts/${param.id}`)
}
