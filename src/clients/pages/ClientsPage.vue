<script setup lang="ts">
import ClientCard from '../components/ClientCard.vue';
import useClient from '../composables/useClient';

const { clientsQuery } = useClient();
</script>

<template>
  <q-page padding class="client">
    <section class="client-header">
      <h2 class="client-title">Clients</h2>
      <q-separator spaced dark />
    </section>
    <section class="client-container" v-if="!clientsQuery.isLoading.value">
      <pre>{{ clientsQuery.data }}</pre>
      <ClientCard :client="client" v-for="client in clientsQuery.data.value" :key="client.id" />
    </section>
    <q-inner-loading :showing="clientsQuery.isLoading.value" dark>
      <q-spinner-gears size="50px" color="secondary" />
    </q-inner-loading>
  </q-page>
</template>

<style lang="scss" scoped>
.client {
  background: darken($primary, 8);
  &-header {
    padding: 0 0 1rem;
  }
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
