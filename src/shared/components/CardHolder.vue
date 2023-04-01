<script setup lang="ts">
import { toRefs } from 'vue';

interface Props {
  isLoading: boolean;
  update?: boolean;
  remove?: boolean;
}

interface Emits {
  (e: 'on:update'): void;
  (e: 'on:delete'): void;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  update: true,
  remove: true,
});

const emits = defineEmits<Emits>();
const { isLoading } = toRefs(props);
</script>

<template>
  <q-card class="card">
    <section class="card-body">
      <!-- This is the slot that will be used in the UserCard component -->
      <slot name="body" />
      <!-- This section is for the actions -->
      <section class="card-actions">
        <q-btn
          v-if="update"
          flat
          round
          color="info"
          size="sm"
          icon="o_edit"
          @click="emits('on:update')"
          :disable="isLoading"
        />
        <q-btn
          v-if="remove"
          flat
          round
          color="red"
          size="sm"
          icon="o_delete"
          @click="emits('on:delete')"
          :loading="isLoading"
        />
      </section>
    </section>
  </q-card>
</template>

<style lang="scss" scoped></style>
