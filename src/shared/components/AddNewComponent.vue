<script setup lang="ts">
import { toRefs } from 'vue';

interface Props {
  title?: string;
}

interface Emits {
  (e: 'on:click'): void;
}

const emits = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  title: 'Add new',
});
const { title } = toRefs(props);
</script>

<template>
  <q-card class="card" @click="emits('on:click')">
    <q-icon class="card-icon" name="o_add_circle" />
    <p class="card-text">{{ title }}</p>
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 8rem;
  background: rgba($secondary, 0.6);
  border: 2px dashed $secondary;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: all 0.5s ease;
  &:hover {
    background: rgba($secondary, 0.8);
    transition: all 0.5s ease;
    cursor: pointer;
  }
  &-icon {
    font-size: 1.5rem;
  }
  &-text {
    font-size: 1.2rem;
    margin: 0.5rem 0 0;
  }
}
</style>
