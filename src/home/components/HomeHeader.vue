<script setup lang="ts">
import HeaderMenu from './HeaderMenu.vue';

const emits = defineEmits<{ (e: 'toggle:drawer'): void }>();
</script>

<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-btn flat round color="white" icon="o_menu" @click="emits('toggle:drawer')" />
      <q-toolbar-title translate="no"> Drello </q-toolbar-title>

      <q-space />

      <HeaderMenu />
    </q-toolbar>
  </q-header>
</template>

<style lang="scss" scoped></style>
