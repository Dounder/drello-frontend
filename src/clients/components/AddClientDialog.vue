<script setup lang="ts">
import { toRefs, watch } from 'vue';
import { useClientMutation } from '../composables';

interface Props {
  isOpen: boolean;
}

const props = defineProps<Props>();
const { isOpen } = toRefs(props);
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
  <q-dialog v-model="isOpen">
    <q-card dark>
      <q-card-section class="row items-center">
        <q-avatar icon="o_signal_wifi_off" color="primary" text-color="white" />
        <span class="q-ml-sm">You are currently not connected to any network.</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="warning" v-close-popup />
        <q-btn flat label="Turn on Wifi" color="warning" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped></style>
