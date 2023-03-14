<script setup lang="ts">
import { isValidEmail, requiredString } from 'src/shared/helpers';
import { ref, toRefs, watch } from 'vue';
import { useClientMutation } from '../composables';
import { AddClient } from '../interfaces/client.interface';

interface Props {
  isOpen: boolean;
}

const props = defineProps<Props>();
const { isOpen } = toRefs(props);
const { clientMutation } = useClientMutation();
const clientForm = ref<AddClient>({ name: '', email: '', nit: null });

watch(
  () => clientMutation.isSuccess.value,
  (isSuccess: boolean) => {
    if (isSuccess) {
      clientMutation.reset();
    }
  }
);

const onSubmit = () => {
  console.log(clientForm.value);
};

const onReset = () => {
  clientForm.value = { name: '', email: '', nit: null };
};
</script>

<template>
  <q-dialog v-model="isOpen">
    <q-card dark class="card">
      <p class="text-h5 text-center q-pt-lg">Add Client</p>
      <q-form @submit="onSubmit" @reset="onReset" class="full-width q-pa-md q-gutter-lg">
        <q-input
          dark
          standout
          class="full-width"
          color="dark"
          v-model="clientForm.name"
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
          type="text"
          label="NIT"
          no-error-icon
          lazy-rules
          :rules="[requiredString]"
        />
      </q-form>
      <div class="q-gutter-md row justify-end q-pb-md q-px-md">
        <q-btn label="Cancel" color="red" flat class="q-ml-sm" />
        <q-btn label="Create" type="submit" color="secondary" />
      </div>
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
