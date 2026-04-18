<script setup lang="ts">
import {
  blogListCond,
  blogListRes,
  handlerBlogDelete,
  handlerBlogPageChange,
  handlerBlogPerPageChange,
  queryBlogList,
} from '@/compositions/useBlog'
import { timeFormat } from '@blog/shared'
import { useRouter } from 'vue-router'

const router = useRouter()

queryBlogList()

type TagType = 'info' | 'warning' | 'success' | 'danger' | 'primary'

interface StatusInfo {
  text: string
  type: TagType
}

const STATUS_DRAFT = 1
const STATUS_PUBLISHED = 2
const STATUS_UNDER_REVIEW = 3
const STATUS_PRIVATE = 4

const STATUS_MAP: Record<number, StatusInfo> = {
  [STATUS_DRAFT]: { text: 'Draft', type: 'info' },
  [STATUS_PUBLISHED]: { text: 'Published', type: 'success' },
  [STATUS_UNDER_REVIEW]: { text: 'Under Review', type: 'warning' },
  [STATUS_PRIVATE]: { text: 'Private', type: 'danger' },
}

function getStatus(status: number): StatusInfo {
  return STATUS_MAP[status] || { text: 'Unknown', type: 'primary' }
}

const CATEGORY_SHARING = 1
const CATEGORY_TECH = 2
const CATEGORY_ESSAY = 3
const CATEGORY_TUTORIAL = 4

const CATEGORY_MAP: Record<number, string> = {
  [CATEGORY_SHARING]: 'Sharing',
  [CATEGORY_TECH]: 'Tech',
  [CATEGORY_ESSAY]: 'Essay',
  [CATEGORY_TUTORIAL]: 'Tutorial',
}

const CATEGORY_OPTIONS = [
  { label: 'Sharing', value: CATEGORY_SHARING },
  { label: 'Tech', value: CATEGORY_TECH },
  { label: 'Essay', value: CATEGORY_ESSAY },
  { label: 'Tutorial', value: CATEGORY_TUTORIAL },
]
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <div class="header-left">
          <el-button type="primary" @click="router.push({ name: 'blog-create' })">
            Create
          </el-button>
        </div>

        <el-form
          class="header-form"
          :inline="true"
          ref="queryBlogListFormRef"
          :model="blogListCond"
        >
          <el-form-item>
            <el-input
              placeholder="Search content..."
              autocomplete="off"
              clearable
              v-model="blogListCond.keyword"
            />
          </el-form-item>

          <el-form-item label="Category" prop="category_id">
            <el-select
              placeholder="Select category"
              style="width: 260px"
              v-model="blogListCond.category_id"
              clearable
            >
              <el-option label="All" :value="0" />
              <el-option
                v-for="item in CATEGORY_OPTIONS"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="queryBlogList(blogListCond)"> Search </el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>

    <el-table :data="blogListRes.content" border style="width: 100%">
      <el-table-column type="index" label="#" width="100" align="center" />

      <el-table-column label="Category" prop="category_id" width="180" align="center">
        <template #default="{ row }">
          <el-tag>{{ CATEGORY_MAP[row.category_id] || 'Unknown' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="Title" width="180" align="center" />

      <el-table-column prop="slug" label="Slug" width="180" align="center" />

      <el-table-column prop="status" label="Status" width="130" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatus(row.status).type">
            {{ getStatus(row.status).text }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Actions" v-slot="{ row }" width="260" align="center" fixed="right">
        <el-button
          type="primary"
          text
          @click="router.push({ name: 'blog-update', params: { id: row.id } })"
        >
          Edit
        </el-button>

        <el-button type="danger" text @click="handlerBlogDelete({ id: row.id })">
          Delete
        </el-button>
      </el-table-column>

      <el-table-column
        prop="created_at"
        :formatter="timeFormat"
        label="Created At"
        width="230"
        align="center"
      />
    </el-table>

    <template #footer>
      <el-pagination
        v-model:current-page="blogListCond.page"
        v-model:page-size="blogListCond.per_page"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="blogListRes.count"
        @size-change="handlerBlogPerPageChange"
        @current-change="handlerBlogPageChange"
      />
    </template>
  </el-card>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 12px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.header-form {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  .el-form-item {
    margin-bottom: 0;
  }
}
.tag-item {
  margin-right: 6px;
  margin-bottom: 4px;
}
</style>
