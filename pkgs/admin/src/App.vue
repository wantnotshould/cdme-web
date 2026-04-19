<script setup lang="ts">
// https://element-plus.org/zh-CN/guide/i18n#configprovider
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
