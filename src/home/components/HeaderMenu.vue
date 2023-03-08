<script setup lang="ts">
import useAuth from 'src/auth/composables/useAuth';
import { useRouter } from 'vue-router';

const router = useRouter();
const { store } = useAuth();

const logout = () => {
  store.deleteAuthData();
  router.replace({ name: 'login' });
};
</script>

<template>
  <q-btn flat round color="white">
    <q-avatar size="42px">
      <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
    </q-avatar>
    <q-menu class="text-dark" :offset="[0, 10]" transition-show="jump-down" transition-hide="jump-up">
      <div class="column items-center q-pa-md">
        <q-avatar size="72px">
          <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
        </q-avatar>

        <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

        <q-btn color="primary" label="Logout" push size="md" v-close-popup @click="logout" />
      </div>
    </q-menu>
  </q-btn>
</template>

<style lang="scss" scoped></style>
