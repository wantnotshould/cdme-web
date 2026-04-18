<script setup lang="ts">
interface Props {
  text: string
  speed?: number
  loop?: boolean
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  speed: 99,
  loop: false,
  delay: 100,
})

const displayText = ref('')

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const type = async () => {
  await sleep(props.delay)

  let i = 0

  const run = async () => {
    await sleep(props.delay)
    displayText.value = ''

    while (i < props.text.length) {
      displayText.value += props.text[i]
      i++
      await sleep(props.speed)
    }

    if (props.loop) {
      await sleep(1000)
      i = 0
      run()
    }
  }

  run()
}

onMounted(() => {
  type()
})
</script>

<template>
  <span class="typewriter">
    {{ displayText }}
  </span>
</template>

<style lang="scss" scoped>
.typewriter {
  display: inline-block;
  white-space: nowrap;
}
</style>
