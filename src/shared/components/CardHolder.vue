<script setup lang="ts">
import { toRefs } from 'vue';

interface Props {
  isLoading: boolean;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const props = defineProps<Props>();
const { isLoading, onUpdate, onDelete } = toRefs(props);
</script>

<template>
  <q-card class="card">
    <slot name="body" />
    <section class="card-actions">
      <q-btn v-if="onUpdate" flat round color="info" size="sm" icon="o_edit" @click="onUpdate" :disable="isLoading" />
      <q-btn v-if="onDelete" flat round color="red" size="sm" icon="o_delete" @click="onDelete" :loading="isLoading" />
    </section>
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 8rem;
  background: rgba($accent, 0.5);
  border: 1px solid $accent;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  transition: all 0.5s ease;
  &:hover {
    background: $accent;
    transition: all 0.5s ease;
    cursor: pointer;
  }
  &-body {
    width: 100%;
    padding: 1rem;
  }
  &-text {
    margin: 0.3rem 0;
    line-height: 1.5;
  }
  &-icon {
    font-size: 1.2rem;
    margin-right: 0.5rem;
    color: $info;
  }
  &-actions {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    display: flex;
    gap: 0.2rem;
  }
}
</style>
