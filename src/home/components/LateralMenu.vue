<script setup lang="ts">
import { boardMenuOptions } from '../helpers';

interface Props {
  offset?: number;
  isDrawer: boolean;
}

defineProps<Props>();
</script>

<template>
  <section :class="isDrawer ? 'menu-drawer' : 'menu'" :style="{ top: `56px` }">
    <q-list>
      <template v-for="{ icon, label, routeName } in boardMenuOptions" :key="routeName">
        <q-item clickable :to="{ name: routeName }" exact exact-active-class="active-link" v-ripple>
          <q-item-section avatar>
            <q-icon :name="icon" />
          </q-item-section>
          <q-item-section>
            {{ label }}
          </q-item-section>
        </q-item>
      </template>
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
