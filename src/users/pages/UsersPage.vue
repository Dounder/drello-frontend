<script setup lang="ts">
import { useHome } from 'src/shared/composables';

const { store } = useHome();

store.setWindowTitle('Users | Drello');
store.setPageTitle('Users');
</script>

<template>
  <q-page padding class="flex flex-center">
    <h1>Users Page</h1>
  </q-page>
</template>

<style lang="scss" scoped>
.q-page {
  background: darken($primary, 8);
}
</style>
