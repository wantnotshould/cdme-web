<script setup lang="ts">
import MdEditor from '@/components/MdEditor.vue'
import { handlerBlogCreate } from '@/compositions/useBlog'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  title: '',
  slug: '',
  category_id: 0,
  summary: '',
  status: 1,
  content: '',
})

const handlerCreate = async () => {
  const { title, slug, summary, category_id, status, content } = formData.value

  const result = await handlerBlogCreate({
    title,
    slug,
    summary,
    category_id,
    status,
    content,
  })

  if (result) {
    ElMessage.success('success')
    router.push({ name: 'blog' })
  }
}

// 重置
const handlerReset = () => {
  formData.value = {
    title: '',
    slug: '',
    category_id: 0,
    summary: '',
    status: 1,
    content: '',
  }
}
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Create Blog Post</span>
      </div>
    </template>

    <el-form :model="formData" label-width="120px" ref="blogCreateFormRef">
      <el-form-item label="Title" prop="title">
        <el-input v-model="formData.title" placeholder="Enter the title" autocomplete="off" />
      </el-form-item>

      <el-form-item label="Category" prop="category_id">
        <el-select
          v-model="formData.category_id"
          placeholder="Select a category"
          style="width: 200px"
        >
          <el-option label="Sharing" :value="1" />
          <el-option label="Tech" :value="2" />
          <el-option label="Essay" :value="3" />
          <el-option label="Tutorial" :value="4" />
        </el-select>
      </el-form-item>

      <el-form-item label="Slug" prop="slug">
        <el-input v-model="formData.slug" placeholder="Enter a URL-friendly slug" clearable />
      </el-form-item>

      <el-form-item label="Summary" prop="summary">
        <el-input
          v-model="formData.summary"
          type="textarea"
          placeholder="Enter a brief summary"
          :rows="3"
          clearable
        />
      </el-form-item>

      <el-form-item label="Status" prop="status">
        <el-select v-model="formData.status" placeholder="Select status" style="width: 200px">
          <el-option label="Draft" :value="1" />
          <el-option label="Published" :value="2" />
          <el-option label="Under Review" :value="3" />
          <el-option label="Private" :value="4" />
        </el-select>
      </el-form-item>

      <el-form-item label="Content" prop="content">
        <MdEditor v-model="formData.content" height="400px" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handlerCreate"> Save </el-button>
        <el-button @click="handlerReset"> Reset </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped></style>
