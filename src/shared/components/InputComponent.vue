<script setup lang="ts">
import { ValidationRule } from 'quasar';
import { computed, toRefs } from 'vue';
import { InputTypes } from '../interfaces';

interface Emits {
  (event: 'update:modelValue', value: string): void;
}

interface Props {
  modelValue: string;
  type?: InputTypes;
  label?: string;
  rules?: ValidationRule[];
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  label: 'Label',
  isLoading: false,
}); // Default value
const emits = defineEmits<Emits>(); // Emits
const { modelValue, type, label, rules } = toRefs(props); // Props

// Value to be used in the component (v-model) and emit the update event
const internalValue = computed({
  get: () => modelValue.value, // Getter
  set: (value: string) => emits('update:modelValue', value), // Setter
});
</script>

<template>
  <q-input
    dark
    standout
    class="full-width"
    color="dark"
    v-model="internalValue"
    :loading="false"
    :type="type"
    :label="label"
    autofocus
    no-error-icon
    lazy-rules
    :rules="rules"
  />
</template>

<style lang="scss" scoped></style>
