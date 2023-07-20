<script setup lang="ts">
interface Props {
  title: string;
}

defineProps<Props>();
</script>

<template>
  <article class="card flex flex-center">{{ title }}</article>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  background: $secondary;
  height: 100%;
  border-radius: 0.5rem;
}
</style>
