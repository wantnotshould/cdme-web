<script setup lang="ts">
import { userLogin } from '@/api/handler/user'
import { useUIState } from '@/stores/uiStore'
import { useUserStore } from '@/stores/userStore'
import { handlerError, handlerFormValidationError } from '@/utils/error'
import type { FormInstance } from 'element-plus'

const uiState = useUIState()
const router = useRouter()
const route = useRoute()

const title = 'cdme'
const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  username: '',
  password: '',
})

const isLoading = ref(false)
const onSubmit = async () => {
  isLoading.value = true
  await loginFormRef.value?.validate().catch(err => {
    handlerFormValidationError(err)
    isLoading.value = false
    throw err
  })

  try {
    const { data } = await userLogin(loginForm)
    if (!data.status) {
      isLoading.value = false
      throw new Error(data.message)
    }

    isLoading.value = false
    ElMessage.success('登录成功')
    const userStore = useUserStore()
    await userStore.fetchUserInfo(true)
    router.push(typeof route.query.r === 'string' ? route.query.r : '/')
  } catch (err) {
    isLoading.value = false
    handlerError(err)
  }
}
</script>

<template>
  <div class="login">
    <div class="theme-toggle">
      <el-icon @click="uiState.toggleTheme()">
        <i-ep-sunny v-if="uiState.isDark" />
        <i-ep-moon v-else />
      </el-icon>
    </div>

    <div class="login-panel">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        label-width="120px"
        label-position="top"
        size="large"
        class="form-login"
        @keydown.enter="onSubmit"
      >
        <div class="logo-container">
          <img src="@/assets/img/logo.png" alt="Logo" class="logo" />
          <h2>{{ title }}</h2>
        </div>
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            show-password
            autocomplete="off"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="isLoading" :disabled="isLoading">
            {{ isLoading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  min-height: calc(100vh - 32px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  transition:
    background-color 0.3s,
    color 0.3s;

  .theme-toggle {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
  }

  .login-panel {
    width: 100%;
    max-width: 360px;
    background-color: var(--cdme-bg);
    border-radius: 12px;
    border: solid 1px var(--cdme-border);
    padding: 34px 26px;
    text-align: center;

    h2,
    h3 {
      font-size: 26px;
      color: var(--cdme-text);
      font-weight: 600;
    }

    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .logo {
      width: 57px;
      height: 57px;
      margin-right: 10px;
      border-radius: 50%;
      border: 1px solid var(--cdme-border-img);
    }

    .form-login {
      text-align: left;

      .el-form-item {
        margin-top: 20px;
      }

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
