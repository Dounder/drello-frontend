<script setup lang="ts">
import { QForm } from 'quasar';
import { useNotify } from 'src/shared/composables';
import { ref, watch } from 'vue';
import { isValidEmail, requiredString } from '../../shared/helpers/validations.helpers';
import { useClientMutation } from '../composables';
import { AddClient, UpdateClient } from '../interfaces/client.interface';

interface Props {
  isOpen: boolean;
  action: 'create' | 'update';
}

interface Emits {
  (e: 'on:close'): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const { createClientMutation, updateClientMutation, store } = useClientMutation();
const { notify } = useNotify();

const isOpen = ref(false);
const form = ref<QForm | null>(null);
const clientForm = ref<AddClient | UpdateClient>({ name: '', email: '', nit: null });

watch(props, () => {
  isOpen.value = props.isOpen; // Open dialog
});

watch(
  () => createClientMutation.isSuccess.value, // Watch create mutation
  (isSuccess: boolean) => {
    if (isSuccess) onSuccess(); // Reset form
  }
);

watch(
  () => updateClientMutation.isSuccess.value, // Watch update mutation
  (isSuccess: boolean) => {
    if (isSuccess) onSuccess(); // Reset form
  }
);

watch(
  () => store.client, // Watch client
  (client) => {
    // Set client data to form
    if (client) clientForm.value = { name: client.name, email: client.email, nit: client.nit, id: client.id };
  }
);

const onSubmit = () => {
  if (!form.value) return; // validate form component is mounted

  if (!form.value?.validate()) return; // validate form

  if (clientForm.value.nit === '') clientForm.value.nit = null; // remove nit if is empty

  if (props.action === 'create') return createClientMutation.mutate(clientForm.value as AddClient); // Create client

  updateClientMutation.mutate(clientForm.value as UpdateClient); // Update client
};

const onSuccess = () => {
  notify({ message: `Client "${clientForm.value.name}" ${props.action === 'create' ? 'created' : 'updated'}` }); // Notify
  onReset(); // Reset form
};

const onReset = () => {
  clientForm.value = { name: '', email: '', nit: null }; // Reset form
  form.value?.resetValidation(); // Reset form validation
  createClientMutation.reset(); // Reset create mutation
  updateClientMutation.reset(); // Reset update mutation
  emits('on:close'); // Close dialog
};
</script>

<template>
  <q-dialog v-model="isOpen" persistent position="top">
    <q-card dark class="card">
      <p class="text-h5 text-center q-pt-lg">{{ action === 'update' ? 'Update Client' : 'Add Client' }}</p>
      <q-form @submit="onSubmit" @reset="onReset" ref="form" class="full-width q-pa-md q-gutter-lg">
        <q-input
          dark
          standout
          class="full-width"
          color="dark"
          v-model="clientForm.name"
          :loading="createClientMutation.isLoading.value"
          type="text"
          label="Name"
          autofocus
          no-error-icon
          lazy-rules
          :rules="[requiredString]"
        />
        <q-input
          dark
          standout
          class="full-width"
          color="dark"
          v-model="clientForm.email"
          :loading="createClientMutation.isLoading.value"
          type="text"
          label="Email"
          no-error-icon
          lazy-rules
          :rules="[requiredString, (val) => isValidEmail(val)]"
        />
        <q-input
          dark
          standout
          class="full-width"
          color="dark"
          v-model="clientForm.nit"
          :loading="createClientMutation.isLoading.value"
          type="text"
          label="NIT"
          no-error-icon
        />
        <q-card-actions align="right" class="q-pa-none">
          <q-btn
            flat
            label="Cancel"
            color="red"
            class="q-mr-sm"
            :disable="createClientMutation.isLoading.value"
            @click="onReset"
            v-close-popup
          />
          <q-btn :label="action" type="submit" color="secondary" :disable="createClientMutation.isLoading.value" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.card {
  width: 25rem;
}
</style>
