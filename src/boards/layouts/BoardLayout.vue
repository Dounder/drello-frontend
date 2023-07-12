<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import { useBoardMenu } from '../composables';
import { AccountMenu, BoardPageMenu } from '../component';

const { drawerOpen, showDrawer, breakpoint, toggleDrawer } = useBoardMenu();

const setWindowSize = () => {
  showDrawer.value = window.innerWidth < breakpoint;
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
        <q-btn dense flat round icon="menu" @click="toggleDrawer" v-if="showDrawer" />
        <q-toolbar-title translate="no">Drello</q-toolbar-title>
        <q-space />
        <q-btn flat round color="white" padding="5px 5px">
          <q-avatar> <img src="https://cdn.quasar.dev/img/avatar2.jpg" /> </q-avatar>
          <q-tooltip anchor="center start" self="center end" class="text-overline bg-transparent"> Account </q-tooltip>
          <AccountMenu />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer :breakpoint="breakpoint" v-model="drawerOpen" side="left" v-if="showDrawer" bordered>
      <BoardPageMenu :is-drawer="showDrawer" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped></style>
