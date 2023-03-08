<script setup lang="ts">
import { HomeDrawer, HomeHeader } from 'src/home/components';
import { ref } from 'vue';

const drawer = ref(true);
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <HomeHeader @toggle:drawer="drawer = !drawer" />

    <HomeDrawer :drawer="drawer" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
