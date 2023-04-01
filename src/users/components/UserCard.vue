<script setup lang="ts">
import { CardHolder } from 'src/shared/components';
import { useNotify } from 'src/shared/composables';
import { computed, watch } from 'vue';
import { useUserMutation } from '../composables';
import { User } from '../interfaces';

interface Props {
  user: User;
}

interface Emits {
  (e: 'on:update', user: User): void;
}

const { deleteUserMutation, store } = useUserMutation();
const { notify, confirm } = useNotify();
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const roles = computed(() => props.user.roles?.join(', ') ?? '');

const onDelete = () => {
  confirm({ message: `Are you sure you want to delete "${props.user.username}"?` }).onOk(() =>
    deleteUserMutation.mutate(props.user.id)
  );
};

watch(
  () => deleteUserMutation.isSuccess.value,
  (isSuccess: boolean) => {
    if (isSuccess) {
      store.deleteUser(props.user.id);
      notify({ message: `User ${props.user.username} deleted`, type: 'warning' });
      deleteUserMutation.reset();
    }
  }
);
</script>

<template>
  <CardHolder @on:update="emits('on:update', user)" @on:delete="onDelete">
    <template v-slot:body>
      <p class="card-text ellipsis">
        <q-icon name="o_today" class="card-icon" /> {{ new Date(user.createdAt).toDateString() }}
      </p>
      <p class="card-text ellipsis"><q-icon name="o_person" class="card-icon" />{{ user.username }}</p>
      <p class="card-text ellipsis"><q-icon name="o_alternate_email" class="card-icon" />{{ user.email }}</p>
      <p class="card-text ellipsis"><q-icon name="o_badge" class="card-icon" />{{ roles }}</p>
    </template>
  </CardHolder>
</template>

<style lang="scss" scoped></style>
