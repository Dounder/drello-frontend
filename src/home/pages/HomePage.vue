<script setup lang="ts">
import useProject from '../composables/useProject';

const { projectsQuery } = useProject();
</script>

<template>
  <q-page padding>
    <h1>HomePage</h1>
    <pre>{{ projectsQuery.data }}</pre>
  </q-page>
</template>

<style lang="scss" scoped>
.q-page {
  background: darken($primary, 5);
}
</style>
