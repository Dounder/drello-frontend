<script setup lang="ts">
import { toRefs } from 'vue';

interface Props {
  title: string;
  tooltip?: string;
}

interface Emits {
  (e: 'on:add'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { title, tooltip } = toRefs(props);
</script>

<template>
  <section class="header">
    <h2 class="client-title">{{ title }}</h2>
    <q-btn round outline color="secondary" icon="o_add" @click="emits('on:add')">
      <q-tooltip v-if="tooltip" class="bg-secondary text-white" anchor="center right" self="center left">
        {{ tooltip }}
      </q-tooltip>
    </q-btn>
  </section>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 1rem;
  padding: 0.5rem 0;
}
</style>
