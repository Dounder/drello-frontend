<script setup lang="ts">
import { useHome } from 'src/shared/composables';

const { store } = useHome();

store.setWindowTitle('Projects | Drello');
store.setPageTitle('Projects');
</script>

<template>
  <q-page padding class="flex flex-center">
    <h1>HomePage</h1>
  </q-page>
</template>

<style lang="scss" scoped>
.q-page {
  background: darken($primary, 8);
}
</style>
