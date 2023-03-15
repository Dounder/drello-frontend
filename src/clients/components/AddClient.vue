<script setup lang="ts">
import { QForm } from 'quasar';
import { useNotify } from 'src/shared/composables';
import { isValidEmail, requiredString } from 'src/shared/helpers';
import { ref, watch } from 'vue';
import { useClientMutation } from '../composables';
import { AddClient } from '../interfaces/client.interface';

interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: 'on:close'): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const { clientMutation } = useClientMutation();
const { notify } = useNotify();

const isOpen = ref(false);
const form = ref<QForm | null>(null);
const clientForm = ref<AddClient>({ name: '', email: '', nit: null });

watch(props, () => {
  isOpen.value = props.isOpen;
});

watch(
  () => clientMutation.isSuccess.value,
  (isSuccess: boolean) => {
    if (isSuccess) onReset();
  }
);

const onReset = () => {
  notify({ message: `Client "${clientForm.value.name}" created` });
  form.value?.resetValidation();
  clientForm.value = { name: '', email: '', nit: null };
  clientMutation.reset();
  emits('on:close');
};
</script>

<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card dark class="card">
      <p class="text-h5 text-center q-pt-lg">Add Client</p>
      <q-form @submit="clientMutation.mutate(clientForm)" @reset="onReset" class="full-width q-pa-md q-gutter-lg">
        <q-input
          dark
          standout
          class="full-width"
          color="dark"
          v-model="clientForm.name"
          :loading="clientMutation.isLoading.value"
          type="text"
          label="Name"
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
          :loading="clientMutation.isLoading.value"
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
          :loading="clientMutation.isLoading.value"
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
            :disable="clientMutation.isLoading.value"
            @click="emits('on:close')"
            v-close-popup
          />
          <q-btn label="Create" type="submit" color="secondary" :disable="clientMutation.isLoading.value" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.card {
  width: 20rem;
  &-btn {
    // width: 10rem;
    background: $primary;
    margin-bottom: 1rem;
  }
}
</style>
