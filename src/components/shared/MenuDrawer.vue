<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(true);
const isMini = ref(true);

const options = [
  { icon: 'inbox', name: 'Inbox' },
  { icon: 'star', name: 'Star' },
  { icon: 'send', name: 'Send' },
  { icon: 'drafts', name: 'Drafts' },
];
</script>

<template>
  <q-drawer
    v-model="isOpen"
    show-if-above
    :mini="isMini"
    @mouseout="isMini = true"
    @mouseover="isMini = false"
    mini-to-overlay
    :width="250"
    :breakpoint="500"
    bordered
    class="bg-grey-3"
  >
    <q-scroll-area class="fit">
      <q-list padding>
        <template v-for="{ icon, name } of options" :key="icon">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon :name="icon" />
            </q-item-section>

            <q-item-section> {{ name }} </q-item-section>
          </q-item>

          <q-separator spaced inset v-if="icon === 'send'" />
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
