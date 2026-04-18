<script setup lang="ts">
import MdEditor from '@/components/MdEditor.vue'
import { blogInfoRes, handlerBlogUpdate, queryBlogInfo } from '@/compositions/useBlog'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

queryBlogInfo({ id: props.id })

const handlerUpdate = async () => {
  const result = await handlerBlogUpdate(blogInfoRes.value.id, {
    title: blogInfoRes.value.title,
    slug: blogInfoRes.value.slug,
    summary: blogInfoRes.value.summary,
    category_id: blogInfoRes.value.category_id,
    content: blogInfoRes.value.content,
    status: blogInfoRes.value.status,
  })

  if (result) {
    ElMessage.success('success')
    router.push({ name: 'blog' })
  }
}
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Edit Blog Post</span>
      </div>
    </template>

    <el-form :model="blogInfoRes" label-width="120px" ref="editFormRef">
      <el-form-item label="Title" prop="title">
        <el-input v-model="blogInfoRes.title" placeholder="Enter the title" autocomplete="off" />
      </el-form-item>

      <el-form-item label="Category" prop="category_id">
        <el-select
          v-model="blogInfoRes.category_id"
          placeholder="Select a category"
          style="width: 200px"
        >
          <el-option label="Unselected" :value="0" />
          <el-option label="Sharing" :value="1" />
          <el-option label="Tech" :value="2" />
          <el-option label="Essay" :value="3" />
          <el-option label="Tutorial" :value="4" />
        </el-select>
      </el-form-item>

      <el-form-item label="Slug" prop="slug">
        <el-input v-model="blogInfoRes.slug" placeholder="Enter a URL-friendly slug" clearable />
      </el-form-item>

      <el-form-item label="Summary" prop="summary">
        <el-input
          v-model="blogInfoRes.summary"
          type="textarea"
          :rows="3"
          placeholder="Enter a brief summary"
          clearable
        />
      </el-form-item>

      <el-form-item label="Status" prop="status">
        <el-select v-model="blogInfoRes.status" placeholder="Select status" style="width: 200px">
          <el-option label="Draft" :value="1" />
          <el-option label="Under Review" :value="2" />
          <el-option label="Published" :value="3" />
          <el-option label="Private" :value="4" />
        </el-select>
      </el-form-item>

      <el-form-item label="Content" prop="content">
        <MdEditor v-model="blogInfoRes.content" height="400px" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handlerUpdate"> Save </el-button>
        <el-button @click="router.push({ name: 'blog' })"> Cancel </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped></style>
