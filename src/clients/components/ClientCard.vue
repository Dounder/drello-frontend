<script setup lang="ts">
import { toRefs } from 'vue';
import { Client } from '../interfaces/client.interface';

interface Props {
  client: Client;
  isLoading: boolean;
}

interface Emits {
  (e: 'on:update', client: Client): void;
  (e: 'on:delete', id: string): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { client } = toRefs(props);
</script>

<template>
  <q-card class="card">
    <section class="card-body full-width">
      <p class="card-text ellipsis"><q-icon name="o_today" class="card-icon" /> {{ new Date().toDateString() }}</p>
      <p class="card-text ellipsis"><q-icon name="o_person" class="card-icon" /> {{ client.name }}</p>
      <p class="card-text ellipsis"><q-icon name="o_alternate_email" class="card-icon" /> {{ client.email }}</p>
      <p class="card-text ellipsis" v-if="client.nit"><q-icon name="o_badge" class="card-icon" /> {{ client.nit }}</p>

      <section class="card-actions">
        <q-btn
          flat
          round
          color="info"
          size="sm"
          icon="o_edit"
          @click="emits('on:update', client)"
          :disable="isLoading"
        />
        <q-btn
          flat
          round
          color="red"
          size="sm"
          icon="o_delete"
          @click="emits('on:delete', client.id)"
          :loading="isLoading"
        />
      </section>
    </section>
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 8rem;
  background: rgba($accent, 0.5);
  border: 1px solid $accent;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  transition: all 0.5s ease;
  &:hover {
    background: $accent;
    transition: all 0.5s ease;
    cursor: pointer;
  }
  &-body {
    width: 100%;
    padding: 1rem;
  }
  &-text {
    margin: 0.3rem 0;
    line-height: 1.5;
  }
  &-icon {
    font-size: 1.2rem;
    margin-right: 0.5rem;
    color: $info;
  }
  &-actions {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    display: flex;
    gap: 0.2rem;
  }
}
</style>
