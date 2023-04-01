<script setup lang="ts">
import { QForm } from 'quasar';
import { DialogHolder, InputComponent, SelectComponent } from 'src/shared/components';
import { isValidEmail, isValidPassword, requiredString } from 'src/shared/helpers';
import { ref, watch } from 'vue';
import { useUserMutation } from '../composables';
import { AddUser, UpdateUser, UserRoles } from '../interfaces';

interface Props {
  action: 'create' | 'update';
}

const props = defineProps<Props>();
const { isDialogOpen, store, addUserMutation, updateUserMutation } = useUserMutation();
const userForm = ref<AddUser | UpdateUser>({
  username: `Username ${Math.floor(Math.random() * 1000)}`,
  email: `email${Math.floor(Math.random() * 1000)}@gmail.com`,
  password: 'Aa1234!',
  roles: [UserRoles.user],
});
const confirmPwd = ref('Aa1234!');
const isLoading = ref(props.action === 'update');
const Qform = ref<QForm | null>(null);

const onSubmit = (form: QForm | null) => {
  if (!form) return;

  Qform.value = form;

  if (!form.validate()) return;

  if (props.action === 'create') return addUserMutation.mutate(userForm.value as AddUser);

  updateUserMutation.mutate(userForm.value as UpdateUser);
};

const onReset = (form: QForm | null) => {
  if (!form) return;
  form.resetValidation();
  userForm.value = { username: '', email: '', password: '', roles: [] };
  confirmPwd.value = '';
  addUserMutation.reset();
  updateUserMutation.reset();
};

watch(
  () => addUserMutation.isSuccess.value,
  (isSuccess: boolean) => {
    if (isSuccess) {
      store.setUserDialog(false);
      onReset(Qform.value);
    }
  }
);

watch(
  () => updateUserMutation.isSuccess.value,
  (isSuccess: boolean) => {
    if (isSuccess) {
      store.setUserDialog(false);
      onReset(Qform.value);
    }
  }
);

watch(
  () => store.user, // Watch client
  (user) => {
    // Set client data to form
    if (user) userForm.value = { ...user, password: '' };
  }
);
</script>

<template>
  <DialogHolder
    :action="action"
    :is-loading="isLoading"
    :is-open="isDialogOpen"
    :title="action === 'create' ? 'Create User' : 'Update User'"
    @update:model-value="store.setUserDialog"
    @on:reset="onReset"
    @on:submit="onSubmit"
  >
    <template v-slot:form>
      <InputComponent :is-loading="isLoading" :rules="[requiredString]" label="Username" v-model="userForm.username" />
      <InputComponent
        :is-loading="isLoading"
        :rules="[requiredString, (val: string) => isValidEmail(val)]"
        label="Email"
        v-model="userForm.email"
      />
      <InputComponent
        v-if="action === 'create'"
        :is-loading="isLoading"
        :rules="[requiredString, (val: string) => isValidPassword(val)]"
        label="Password"
        v-model="userForm.password"
      />
      <InputComponent
        v-if="action === 'create'"
        :is-loading="isLoading"
        :rules="[requiredString,
        ( val: string) => isValidPassword(val),
         (val: string) => val === userForm.password || 'Passwords do not match']"
        label="Confirm Password"
        v-model="confirmPwd"
      />
      <SelectComponent
        :is-loading="isLoading"
        v-model="userForm.roles"
        :options="Object.values(UserRoles).map((role) => ({ label: role, value: role }))"
        label="Roles"
      />
    </template>
  </DialogHolder>
</template>

<style lang="scss" scoped></style>
