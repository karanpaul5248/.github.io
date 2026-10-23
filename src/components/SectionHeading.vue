<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; lede?: string }>()
</script>
<template>
  <div class="section-heading" data-reveal>
    <p class="eyebrow">{{ eyebrow }}</p>
    <!-- eslint-disable-next-line vue/no-v-html -- title is authored in-house, allows <em> accents -->
    <h2 v-html="title" />
    <p v-if="lede" class="lede">{{ lede }}</p>
    <slot />
  </div>
</template>
<style scoped lang="scss">
.section-heading { max-width: 720px; margin-bottom: clamp(36px, 5vw, 60px);
  h2 { font-size: clamp(2rem, 4.4vw, 3.3rem); margin-top: 16px; }
  .lede { margin-top: 18px; }
}
</style>
