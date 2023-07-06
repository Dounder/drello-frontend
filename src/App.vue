<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuthStore } from './auth/store/auth.store';
import { useCookies } from './shared/composables';

const { loadToken, loadUser } = useCookies();
const { setCredentials } = useAuthStore();

const token = loadToken();
const user = loadUser();

if (token && user) setCredentials({ token, user });
</script>
