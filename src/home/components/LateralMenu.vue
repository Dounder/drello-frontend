<script setup lang="ts">
import { useAuth } from 'src/auth/composables';
import { BoardIcon } from 'src/shared/components';

interface Props {
  offset?: number;
  isDrawer: boolean;
}

defineProps<Props>();
const { user } = useAuth();
</script>

<template>
  <section :class="isDrawer ? 'menu-drawer' : 'menu'" :style="{ top: `56px` }">
    <q-list>
      <q-item
        clickable
        :to="{ name: 'home-page', params: { username: user?.username } }"
        exact
        exact-active-class="active-link"
        v-ripple
      >
        <q-item-section avatar>
          <q-icon>
            <BoardIcon />
          </q-icon>
        </q-item-section>
        <q-item-section> Boards </q-item-section>
      </q-item>
    </q-list>
  </section>
</template>

<style lang="scss" scoped>
.menu {
  width: 20%;
  overflow: hidden;
  position: sticky;
}

.menu-drawer {
  width: 100%;
  overflow: hidden;
  .q-item {
    border-radius: 0;
    margin: 0;
  }
}

.q-item {
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
