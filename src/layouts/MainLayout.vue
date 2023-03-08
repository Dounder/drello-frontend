<script setup lang="ts">
import { HomeDrawer, HomeHeader } from 'src/home/components';
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <HomeHeader />

    <HomeDrawer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
