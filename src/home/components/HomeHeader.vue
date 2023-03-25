<script setup lang="ts">
import { useHome } from 'src/shared/composables';
import HeaderMenu from './HeaderMenu.vue';

const { store, pageTitle } = useHome();
</script>

<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-btn flat round color="white" icon="o_menu" @click="store.toggleDrawer" />
      <q-toolbar-title translate="no"> {{ pageTitle }} </q-toolbar-title>

      <q-space />

      <HeaderMenu />
    </q-toolbar>
  </q-header>
</template>

<style lang="scss" scoped></style>
