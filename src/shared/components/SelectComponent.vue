<script setup lang="ts">
import { ValidationRule } from 'quasar';
import { computed, toRefs } from 'vue';

interface Option {
  label: string;
  value: string;
}

interface Props<T> {
  label?: string;
  rules?: ValidationRule[];
  options?: Option[];
  modelValue: T[];
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props<unknown | Option[]>>(), {
  label: 'Label',
  modelValue: () => [],
  isLoading: false,
});
const emits = defineEmits<(event: 'update:modelValue', value: unknown[] | Option[]) => void>();
const { label, rules, options, modelValue } = toRefs(props);

const internalValue = computed({
  get: () => modelValue.value,
  set: (value: unknown[] | Option[]) => {
    // Get the value from the object if it's an object
    // eslint-disable-next-line
    value = value.map((item) => (typeof item === 'object' && 'value' in item! ? item.value : item));
    emits('update:modelValue', value);
  },
});
</script>

<template>
  <q-select
    dark
    standout
    multiple
    class="full-width text-white"
    v-model="internalValue"
    :options="options"
    use-chips
    clearable
    options-selected-class="text-white bg-secondary"
    transition-show="jump-up"
    transition-hide="jump-down"
    map-options
    :loading="false"
    :label="label"
    no-error-icon
    lazy-rules
    :rules="rules"
  />
</template>

<style lang="scss" scoped></style>
