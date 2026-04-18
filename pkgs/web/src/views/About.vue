<script setup lang="ts"></script>

<template>
  <div class="container">
    <section class="section">
      <h1>关于我</h1>
      <p>欢迎 🎉</p>
      <p>我是一名90后开发者，怀揣对技术的热爱与偶尔冒头的完美主义，在代码世界里不断探索与成长。</p>
      <p>闲暇时我喜欢打球、跑步，也常到山里走走，看看风景、放空一下。</p>
      <p>
        <strong>研究现状，研究历史。不凭主观想象，不凭一时热情，从客观的真实的情况出发。</strong>
      </p>
    </section>

    <section class="section">
      <div class="tips">
        <h2>技术栈</h2>
        <div class="tips-line"></div>
      </div>
      <p>
        <strong>Go</strong> 上线 deploy 真的很优雅，入坑项目
        <a href="https://github.com/AlistGo/alist" target="_blank">@AlistGo</a>
      </p>
      <p><strong>PHP</strong> 依旧世界上最好的语言</p>
      <p><strong>TypeScript</strong> “前端体验卡”（Vue3）</p>
      <del
        ><p><strong>Kotlin</strong> 偶然接触到的一门语言，重构过一个自己写的小程序</p></del
      >
    </section>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;

  h1 {
    margin-bottom: 2rem;
  }

  p {
    font-size: 1rem;
    margin-bottom: var(--cdme-small);
  }

  a {
    color: var(--cdme-accent);
    font-weight: 500;

    &:hover {
      color: var(--cdme-accent-hover);
      text-decoration: underline;
    }
  }

  .section {
    margin-bottom: var(--cdme-large);

    .tips {
      position: relative;
      margin-bottom: 1rem;
      display: inline-flex;
      cursor: pointer;

      h2 {
        margin-bottom: 0.2rem;
      }

      .tips-line {
        position: absolute;
        bottom: -0.2rem;
        left: 50%;
        transform: translateX(-50%);
        width: 97%;
        height: 3px;
        border-radius: var(--cdme-radius);
        background-color: var(--cdme-accent);
        transition:
          width 0.4s ease,
          background 0.4s ease,
          opacity 0.4s ease;
      }

      &:hover {
        color: var(--cdme-accent);

        .tips-line {
          width: 100%;
        }
      }
    }
  }
}
</style>
