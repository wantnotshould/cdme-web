import { userLogin } from '@/api/handler/user'
import { useUserStore } from '@/stores/userStore'
import { handlerError, handlerFormValidationError } from '@/utils/error'
import type { FormInstance } from 'element-plus'

export const useLogin = () => {
  const loginFormRef = ref<FormInstance>()

  const loginForm = reactive({
    username: '',
    password: '',
  })

  const loading = ref(false)

  const login = async () => {
    loading.value = true

    try {
      await loginFormRef.value?.validate()
    } catch (err) {
      handlerFormValidationError(err)
      return false
    }

    try {
      const { data } = await userLogin(loginForm)

      if (!data.status) {
        throw new Error(data.message)
      }

      const userStore = useUserStore()
      await userStore.fetchUserInfo(true)

      return true
    } catch (err) {
      handlerError(err)
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    loginFormRef,
    loginForm,
    loading,
    login,
  }
}
