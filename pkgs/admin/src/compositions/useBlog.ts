import { blogCreate, blogDelete, blogInfo, blogList, blogUpdate } from '@/api/handler/blog'
import type { BlogCreateReq, BlogListReq, BlogUpdateReq } from '@/api/req/blog'
import type { DeleteReq, InfoReq } from '@/api/req/req'
import type { BlogInfoResp, BlogListItemResp } from '@/api/resp/blog'
import type { PageContent } from '@/api/resp/resp'
import { handlerError } from '@/utils/error'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref } from 'vue'

export const blogListLoading = ref(false)
export const blogListCond = reactive<BlogListReq>({
  page: 1,
  per_page: 20,
})
export const blogListRes = ref<PageContent<BlogListItemResp>>({
  count: 0,
  content: [],
})

export const queryBlogList = async (param: BlogListReq = { page: 1, per_page: 20 }) => {
  blogListLoading.value = true
  Object.assign(blogListCond, param)
  try {
    const { data } = await blogList(param)
    if (data.status) {
      blogListRes.value = data.data
    } else {
      throw new Error(data.message)
    }
  } catch (err) {
  } finally {
    blogListLoading.value = false
  }
}
export const handlerBlogPageChange = (page: number) => {
  blogListCond.page = page
  queryBlogList(blogListCond)
}
export const handlerBlogPerPageChange = (perPage: number) => {
  blogListCond.per_page = perPage
  handlerBlogPageChange(1)
}

export const blogInfoLoading = ref(false)
export const blogInfoRes = ref<BlogInfoResp>({
  id: 0,
  category_id: 0,
  title: '',
  slug: '',
  summary: '',
  content: '',
  status: 1,
  created_at: '',
})
export const queryBlogInfo = async (param: InfoReq) => {
  blogInfoLoading.value = true
  try {
    const { data } = await blogInfo(param)
    if (data.status) {
      blogInfoRes.value = data.data
    } else {
      throw new Error(data.message)
    }
  } catch (err) {
  } finally {
    blogInfoLoading.value = false
  }
}

export const blogCreateLoading = ref(false)
export const handlerBlogCreate = async (param: BlogCreateReq) => {
  blogCreateLoading.value = true

  try {
    const { data } = await blogCreate(param)
    if (data.status) {
      return true
    } else {
      throw new Error(data.message)
    }
  } catch (err) {
    handlerError(err)
  } finally {
    blogCreateLoading.value = false
  }
}

export const blogUpdateLoading = ref(false)
export const handlerBlogUpdate = async (id: number, param: BlogUpdateReq) => {
  blogUpdateLoading.value = true

  try {
    const { data } = await blogUpdate(id, param)
    if (data.status) {
      return true
    } else {
      throw new Error(data.message)
    }
  } catch (err) {
    handlerError(err)
  } finally {
    blogUpdateLoading.value = false
  }
}

export const blogDeleteLoading = ref(false)
export const handlerBlogDelete = async (param: DeleteReq) => {
  const confirmDelete = await ElMessageBox.confirm(
    'Are you sure you want to delete this item?',
    'Confirm Deletion',
    {
      type: 'warning',
    }
  ).catch(() => {
    ElMessage.info('Deletion canceled')
    return false
  })

  if (!confirmDelete) return

  blogDeleteLoading.value = true
  try {
    const { data } = await blogDelete(param)
    if (data.status) {
      ElMessage.success('Deleted successfully')
    } else {
      throw new Error(data.message)
    }
  } catch (err) {
    handlerError(err)
  } finally {
    blogDeleteLoading.value = false
    queryBlogList()
  }
}
