<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import { useBoardMenu } from '../composables';
import { BoardPageMenu } from '../component';

const { drawerOpen, showDrawerButton, breakpoint, toggleDrawer } = useBoardMenu();

const setWindowSize = () => {
  showDrawerButton.value = window.innerWidth < breakpoint;
};

onMounted(() => {
  window.addEventListener('resize', setWindowSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', setWindowSize);
});
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title translate="no">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Drello
        </q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="toggleDrawer" v-if="showDrawerButton" />
      </q-toolbar>
    </q-header>

    <q-drawer :breakpoint="breakpoint" v-model="drawerOpen" side="right" bordered>
      <BoardPageMenu :is-drawer="showDrawerButton" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped></style>
