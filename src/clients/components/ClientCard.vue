<script setup lang="ts">
import { useNotify } from 'src/shared/composables';
import { toRefs, watch } from 'vue';
import { useClientMutation } from '../composables';
import { Client } from '../interfaces/client.interface';

interface Props {
  client: Client;
}

interface Emits {
  (e: 'on:update', client: Client): void;
  (e: 'on:delete'): void;
}

const { deleteClientMutation, store } = useClientMutation();
const { notify, confirm } = useNotify();
const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { client } = toRefs(props);

const onDelete = () =>
  confirm({ message: `Are you sure you want to delete "${client.value.name}"?` }).onOk(() =>
    deleteClientMutation.mutate(client.value.id)
  );

watch(
  () => deleteClientMutation.isSuccess.value,
  (isSuccess: boolean) => {
    if (isSuccess) {
      store.deleteClient(client.value.id);
      notify({ message: `Client ${client.value.name} deleted`, type: 'warning' });
      deleteClientMutation.reset();
      emits('on:delete');
    }
  }
);
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
          :disable="deleteClientMutation.isLoading.value"
        />
        <q-btn
          flat
          round
          color="red"
          size="sm"
          icon="o_delete"
          @click="onDelete"
          :loading="deleteClientMutation.isLoading.value"
        />
      </section>
    </section>
  </q-card>
</template>

<style lang="scss" scoped></style>
