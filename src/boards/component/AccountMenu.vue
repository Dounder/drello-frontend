<script setup lang="ts">
import { useAuth } from 'src/auth/composables';
import { useRouter } from 'vue-router';

const { logout } = useAuth();
const { replace } = useRouter();

const handleLogout = () => {
  logout();
  replace({ name: 'auth-page' });
};
</script>

<template>
  <q-menu :offset="[0, 5]">
    <q-list bordered padding class="list">
      <q-item-label header>Account</q-item-label>

      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Janet McMane</q-item-label>
          <q-item-label caption lines="2"> mcjane@google.com </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple dense class="q-mt-md">
        <q-item-section>
          <q-item-label>My account</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon color="accent" name="o_open_in_new" size="1rem" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item clickable v-ripple dense>
        <q-item-section>
          <q-item-label>Settings</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple dense>
        <q-item-section>
          <q-item-label>Help</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator spaced inset />

      <q-item clickable v-ripple v-close-popup dense @click="handleLogout">
        <q-item-section>
          <q-item-label>Log out</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<style lang="scss" scoped>
.list {
  min-width: 15rem;
}
</style>
