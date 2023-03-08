<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(true);
const miniState = ref(true);
</script>

<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    mini-to-overlay
    :width="200"
    :breakpoint="500"
    bordered
    class="bg-primary"
  >
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="o_inbox" />
          </q-item-section>

          <q-item-section> Inbox </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style lang="scss" scoped></style>
