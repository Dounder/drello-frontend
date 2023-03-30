<script setup lang="ts">
import { QForm } from 'quasar';
import { DialogHolder } from 'src/shared/components';
import { useNotify } from 'src/shared/composables';
import { requiredString } from 'src/shared/helpers';
import { ref, toRefs } from 'vue';
import useUsers from '../composables/useUsers';
import { AddUser, UpdateUser } from '../interfaces';

interface Props {
  action: 'create' | 'update';
}

const props = defineProps<Props>();
const { action } = toRefs(props);
const userForm = ref<AddUser | UpdateUser>({
  username: '',
  email: '',
  password: '',
});
const { UserDialog, store } = useUsers();
const { notify } = useNotify();

const onSubmit = (form: QForm | null) => {
  if (!form?.validate()) return;

  console.log(userForm.value);
  store.setUserDialog(false);
  notify({ message: `User ${userForm.value.username} created` });
};

const onReset = (form: QForm | null) => {
  store.setUserDialog(false);
  form?.resetValidation();
};
</script>

<template>
  <DialogHolder
    :action="action"
    :is-loading="false"
    on
    :is-open="UserDialog"
    @update:model-value="store.setUserDialog"
    @on:reset="onReset"
    @on:submit="onSubmit"
  >
    <template v-slot:form>
      <q-input
        dark
        standout
        class="full-width"
        color="dark"
        v-model="userForm.username"
        :loading="false"
        type="text"
        label="Name"
        autofocus
        no-error-icon
        lazy-rules
        :rules="[requiredString]"
      />
    </template>
  </DialogHolder>
</template>

<style lang="scss" scoped></style>
