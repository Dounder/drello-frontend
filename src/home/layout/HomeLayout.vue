<script setup lang="ts">
import { ref } from 'vue';

import { useWindow } from 'src/shared/composables';
import { HomeHeader, LateralMenu } from '../components';

const { responsive, breakpoint } = useWindow();
const drawer = ref(false);
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <HomeHeader @on:toggle="drawer = !drawer" />

    <q-drawer :breakpoint="breakpoint" v-model="drawer" side="left" v-if="responsive" bordered>
      <LateralMenu :is-drawer="responsive" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped></style>
