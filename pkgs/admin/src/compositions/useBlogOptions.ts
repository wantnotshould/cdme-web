import { BLOG_CATEGORY_OPTIONS, BLOG_STATUS_OPTIONS } from '@/constants/post'

export function useBlogOptions() {
  return {
    categoryOptions: BLOG_CATEGORY_OPTIONS,
    statusOptions: BLOG_STATUS_OPTIONS,
  }
}
