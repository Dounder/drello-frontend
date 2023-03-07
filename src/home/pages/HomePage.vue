<script setup lang="ts">
import useProject from '../composables/useProject';

const { projectsQuery } = useProject();
</script>

<template>
  <q-page padding>
    <h1 class="text-dark">HomePage</h1>
    <pre>
    <code>
      {{ projectsQuery.isLoading.value }}
    </code>
    </pre>
    <pre>
    <code>
      {{ projectsQuery.data.value }}
    </code>
    </pre>
  </q-page>
</template>

<style lang="scss" scoped></style>
