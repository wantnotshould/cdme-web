<script setup lang="ts">
const currentYear = new Date().getFullYear()
const app = import.meta.env.VITE_APP
const icp = import.meta.env.VITE_ICP
</script>

<template>
  <footer>
    <div class="footer-con">
      <p class="copyright-txt">©{{ currentYear }} {{ app }}</p>
      <a class="copyright-link" href="https://beian.miit.gov.cn/" target="_blank">{{ icp }}</a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  width: 100%;
  flex-shrink: 0;

  .footer-con {
    padding: 6px 12px;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 0.97rem;
    text-align: center;
    gap: 6px;

    .copyright-txt {
      color: var(--cdme-a);
    }

    .copyright-link {
      color: var(--cdme-text-second);
      text-decoration: underline;

      &:hover {
        color: var(--cdme-accent);
      }
    }
  }
}
</style>
