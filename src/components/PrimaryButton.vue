<script setup lang="ts">
defineProps<{ to?: string; href?: string; variant?: 'solid' | 'ghost'; external?: boolean }>()
</script>
<template>
  <RouterLink v-if="to" :to="to" class="btn" :class="variant || 'solid'"><span><slot /></span><span class="btn-arrow" aria-hidden="true">↗</span></RouterLink>
  <a v-else :href="href" class="btn" :class="variant || 'solid'" :target="external ? '_blank' : undefined" :rel="external ? 'noopener' : undefined"><span><slot /></span><span class="btn-arrow" aria-hidden="true">↗</span></a>
</template>
<style scoped lang="scss">
.btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 15px 26px; border-radius: 999px; text-decoration: none;
  font-weight: 700; font-size: .94rem; letter-spacing: .02em;
  border: 1px solid transparent; transition: all .25s ease; cursor: pointer;
  &.solid { background: var(--accent); color: #fff; &:hover { background: var(--accent-deep); transform: translateY(-1px); } }
  &.ghost { border-color: var(--line); color: var(--ink); background: rgba(255,255,255,.02); &:hover { border-color: var(--ink); transform: translateY(-1px); } }
  .btn-arrow { transition: transform .25s ease; }
  &:hover .btn-arrow { transform: translate(2px, -2px); }
}
</style>
