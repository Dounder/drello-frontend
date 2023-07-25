<template>
  <router-view />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useAuth, useAuthMutation } from './auth/composables';
import { useAuthStore } from './auth/store/auth.store';
import { useCookies } from './shared/composables';

const { getToken, getUser, getCredentials, saveCredentials, saveUserData } = useCookies();
const { setCredentials, logout } = useAuthStore();
const { isTokenExpired } = useAuth();
const { loginMutation } = useAuthMutation();

const token = getToken();
const user = getUser();
const credentials = getCredentials();

const reLogin = () => {
  if (credentials) {
    const { username, password } = credentials;
    loginMutation.mutate({ username, password });
  } else {
    logout();
  }
};

if (token && user) {
  isTokenExpired(token) ? reLogin() : setCredentials({ token, user });
}

watch(
  () => loginMutation.isSuccess.value,
  (success) => {
    if (success) {
      console.log(loginMutation.data.value);
      if (loginMutation.data.value) saveUserData(loginMutation.data.value);
      if (credentials) saveCredentials(credentials.username, credentials.password);
    }
  }
);
</script>
