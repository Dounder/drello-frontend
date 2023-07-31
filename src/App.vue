<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuth } from './auth/composables';
import { useCookies } from './shared/composables';

const { getAuthData } = useCookies();
const { store } = useAuth();

const data = getAuthData();

if (data) store.setCredentials(data);
</script>
