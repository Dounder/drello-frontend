<script setup lang="ts">
withDefaults(defineProps<{ title: string }>(), { title: 'Add new' });
const emits = defineEmits<{ (e: 'on:click'): void }>();
</script>

<template>
  <q-page-sticky position="bottom-right" :offset="[25, 25]">
    <q-btn round color="secondary" size="1.5rem" icon="o_add" @click="emits('on:click')">
      <q-tooltip class="bg-secondary text-white text-overline" anchor="center start" self="center end">
        {{ title }}
      </q-tooltip>
    </q-btn>
  </q-page-sticky>
</template>

<style lang="scss" scoped></style>
