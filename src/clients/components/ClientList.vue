<script setup lang="ts">
import { ClientCard } from '.';
import { Client } from '../interfaces/client.interface';

interface Props {
  clients: Client[];
}

const props = defineProps<Props>();
</script>

<template>
  <ClientCard :client="client" v-for="client in props.clients" :key="client.id" />
</template>

<style lang="scss" scoped></style>
