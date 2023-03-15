<script setup lang="ts">
import { PageHeader } from 'src/shared/components';
import { ref } from 'vue';
import { ClientCard } from '../components';
import AddClient from '../components/AddClient.vue';
import { useClient } from '../composables';

const { clientsQuery } = useClient();
const isOpen = ref<boolean>(false);
</script>

<template>
  <q-page padding class="client">
    <PageHeader title="Clients" tooltip="Add new Client" @on:add="isOpen = true" />

    <q-separator spaced dark />

    <section class="client-container" v-if="!clientsQuery.isLoading.value">
      <ClientCard :client="client" v-for="client in clientsQuery.data.value" :key="client.id" />
    </section>

    <q-inner-loading :showing="clientsQuery.isLoading.value" dark>
      <q-spinner-gears size="50px" color="secondary" />
    </q-inner-loading>

    <AddClient :is-open="isOpen" @on:close="isOpen = false" />
  </q-page>
</template>

<style lang="scss" scoped>
.client {
  background: darken($primary, 8);
  &-title {
    margin: 0;
  }
  &-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap: 1rem;
    grid-auto-flow: dense;
  }
}
</style>
