<script setup lang="ts">
import { useWindow } from 'src/shared/composables';
import { AccountMenu } from '.';

interface Emits {
  (e: 'on:toggle'): void;
}

const { responsive } = useWindow();
const emits = defineEmits<Emits>();
</script>

<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="emits('on:toggle')" v-if="responsive" />
      <q-toolbar-title translate="no">Drello</q-toolbar-title>
      <q-space />
      <q-btn flat round color="white" padding="5px 5px">
        <q-avatar> <img src="https://cdn.quasar.dev/img/avatar2.jpg" /> </q-avatar>
        <q-tooltip anchor="center start" self="center end" class="text-overline bg-transparent"> Account </q-tooltip>
        <AccountMenu />
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<style lang="scss" scoped></style>
