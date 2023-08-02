<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useAuth } from 'src/auth/composables';
import { HomeIcon } from 'src/shared/components';
import { useWindow } from 'src/shared/composables';
import { AccountMenu } from '.';

interface Emits {
  (e: 'on:toggle'): void;
}

const router = useRouter();
const { user } = useAuth();
const { responsive } = useWindow();
const emits = defineEmits<Emits>();
</script>

<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="emits('on:toggle')" v-if="responsive" />
      <q-toolbar-title translate="no">
        <q-btn
          color="primary"
          no-caps
          @click="router.push({ name: 'home-page', params: { username: user?.username } })"
        >
          <template v-slot:default>
            <HomeIcon :width="30" :height="30" :stroke-width="20" />
            <p translate="no" class="header-title">Drello</p>
          </template>
        </q-btn>
      </q-toolbar-title>
      <q-space />
      <q-btn flat round color="white" padding="5px 5px">
        <q-avatar> <img src="https://cdn.quasar.dev/img/avatar2.jpg" /> </q-avatar>
        <q-tooltip anchor="center start" self="center end" class="text-overline bg-transparent"> Account </q-tooltip>
        <AccountMenu />
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<style lang="scss" scoped>
.header {
  &-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 500;
    margin-left: 0.2rem;
    letter-spacing: 1px;
  }
}
</style>
