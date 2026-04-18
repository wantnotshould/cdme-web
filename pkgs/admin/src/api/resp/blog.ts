export interface BlogListItemResp {
  id: number
  category_id: number
  title: string
  slug: string
  status: number
  created_at: string
}

export interface BlogInfoResp {
  id: number
  category_id: number
  title: string
  slug: string
  summary: string
  content: string
  status: number
  created_at: string
}
