<script setup lang="ts">
import { toRefs } from 'vue';
import { Client } from '../interfaces/client.interface';

interface Props {
  client: Client;
}

const props = defineProps<Props>();
const { client } = toRefs(props);
</script>

<template>
  <q-card class="card">
    <q-card-section>
      <span class="card-date">{{ new Date().toDateString() }}</span>
    </q-card-section>
    <q-card-section>
      <span>{{ client.name }}</span>
      <span>{{ client.email }}</span>
      <span>{{ client.nit }}</span>
    </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: min(20rem, 100%);
  background: rgba($accent, 0.5);
  border: 1px solid $accent;
  transition: all 0.5s ease;
  &:hover {
    background: $accent;
    transform: scale(1.03);
    transition: all 0.5s ease;
  }
}
</style>
