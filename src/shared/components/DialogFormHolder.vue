<script setup lang="ts">
import { QForm } from 'quasar';
import { toRefs, watch, ref } from 'vue';

interface Props {
  isOpen: boolean;
  isLoading: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  title?: string;
  action: 'create' | 'update';
  persistent?: boolean;
}
interface Emits {
  (e: 'update:model-value', isOpen: boolean): void;
  (e: 'on:submit', form: QForm | null): void;
  (e: 'on:reset', form: QForm | null): void;
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top',
  title: 'Dialog',
  persistent: true,
});
const emit = defineEmits<Emits>();
const isOpen = ref(false);
const form = ref<QForm | null>(null);
const { position, persistent, isLoading, action, title } = toRefs(props);

watch(props, () => {
  isOpen.value = props.isOpen; // Open dialog
});
</script>

<template>
  <q-dialog
    v-model="isOpen"
    :persistent="persistent"
    :position="position"
    @update:model-value="emit('update:model-value', $event)"
  >
    <q-card dark class="dialog">
      <p class="text-h5 text-center q-pt-lg">{{ title }}</p>
      <q-form
        @submit="emit('on:submit', form)"
        @reset="emit('on:reset', form)"
        ref="form"
        class="full-width q-pa-md q-gutter-lg"
      >
        <slot name="form" />

        <q-card-actions align="right" class="q-pa-none">
          <q-btn
            flat
            label="Cancel"
            color="red"
            class="q-mr-sm"
            :disable="isLoading"
            @click="emit('on:reset', form)"
            v-close-popup
          />
          <q-btn :label="action" type="submit" color="secondary" :disable="isLoading" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.dialog {
  width: 30rem;
}
</style>
