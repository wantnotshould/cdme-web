import { BlogCategory, BlogStatus } from '@/enums/post'

export const BLOG_CATEGORY_OPTIONS = [
  { label: 'Sharing', value: BlogCategory.Sharing },
  { label: 'Tech', value: BlogCategory.Tech },
  { label: 'Essay', value: BlogCategory.Essay },
  { label: 'Tutorial', value: BlogCategory.Tutorial },
] as const

export const BLOG_STATUS_OPTIONS = [
  { label: 'Draft', value: BlogStatus.Draft },
  { label: 'Under Review', value: BlogStatus.UnderReview },
  { label: 'Published', value: BlogStatus.Published },
  { label: 'Private', value: BlogStatus.Private },
] as const
