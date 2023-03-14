<script setup lang="ts">
import useClientMutation from '../composables/useClientMutation';
import { PageHeader } from 'src/shared/components';
import ClientCard from '../components/ClientCard.vue';
import useClient from '../composables/useClient';
import { watch } from 'vue';

const { clientsQuery } = useClient();
const { clientMutation } = useClientMutation();

watch(
  () => clientMutation.isSuccess.value,
  (isSuccess: boolean) => {
    if (isSuccess) {
      clientMutation.reset();
    }
  }
);
</script>

<template>
  <q-page padding class="client">
    <PageHeader
      title="Clients"
      tooltip="Add new Client"
      @on:add="clientMutation.mutate({ email: 'client1@info.com', name: 'Client 1' })"
    />

    <q-separator spaced dark />

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
