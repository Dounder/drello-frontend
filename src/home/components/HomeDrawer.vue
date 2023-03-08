<script setup lang="ts">
import { useHome } from 'src/shared/composables';
import { drawerOptions } from '../helpers/drawer-options.helper';

const { isDrawerOpen } = useHome();
</script>

<template>
  <q-drawer dark v-model="isDrawerOpen" show-if-above :width="250" :breakpoint="800" class="bg-dark">
    <q-scroll-area class="fit drawer">
      <q-list padding>
        <template v-for="(option, index) in drawerOptions" :key="index">
          <q-item clickable :to="{ name: option.path }" exact exact-active-class="drawer-item">
            <q-item-section avatar>
              <q-icon :name="option.icon" />
            </q-item-section>

            <q-item-section>{{ option.name }}</q-item-section>
          </q-item>
        </template>

        <q-separator spaced inset dark />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style lang="scss" scoped>
.drawer {
  background: darken($primary, 4);
  border-right: 1px solid $dark;
  &-item {
    background: rgba($white, 0.2);
    color: $white;
  }
}
</style>
