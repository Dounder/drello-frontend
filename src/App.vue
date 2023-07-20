<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuthStore } from './auth/store/auth.store';
import { useCookies } from './shared/composables';

const { getToken, getUser } = useCookies();
const { setCredentials } = useAuthStore();

const token = getToken();
const user = getUser();

if (token && user) setCredentials({ token, user });
</script>
