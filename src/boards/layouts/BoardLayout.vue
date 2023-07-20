<script setup lang="ts">
import { ref } from 'vue';

import { useWindow } from 'src/shared/composables';
import { AccountMenu, BoardPageMenu } from '../component';

const { responsive, breakpoint } = useWindow();
const drawer = ref(false);
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawer = !drawer" v-if="responsive" />
        <q-toolbar-title translate="no">Drello</q-toolbar-title>
        <q-space />
        <q-btn flat round color="white" padding="5px 5px">
          <q-avatar> <img src="https://cdn.quasar.dev/img/avatar2.jpg" /> </q-avatar>
          <q-tooltip anchor="center start" self="center end" class="text-overline bg-transparent"> Account </q-tooltip>
          <AccountMenu />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer :breakpoint="breakpoint" v-model="drawer" side="left" v-if="responsive" bordered>
      <BoardPageMenu :is-drawer="responsive" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped></style>
