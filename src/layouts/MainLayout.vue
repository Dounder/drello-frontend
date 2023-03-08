<script setup lang="ts">
import HomeDrawer from 'src/home/components/HomeDrawer.vue';
import { ref } from 'vue';

const drawer = ref(true);
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="o_menu" @click="drawer = !drawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <HomeDrawer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
