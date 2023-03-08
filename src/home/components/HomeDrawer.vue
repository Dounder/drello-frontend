<script setup lang="ts">
import { toRefs } from 'vue';
import { drawerOptions } from '../helpers/drawer-options.helper';

const props = defineProps<{ drawer: boolean }>();

const { drawer } = toRefs(props);
</script>

<template>
  <q-drawer v-model="drawer" show-if-above :width="250" :breakpoint="500" class="bg-dark" dark>
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
