<script setup lang="ts">
import { useHome } from 'src/shared/composables';
import { watch } from 'vue';

const { windowTitle } = useHome();

watch(windowTitle, () => {
  document.title = windowTitle.value;
});
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
