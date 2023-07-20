<script setup lang="ts">
import { QInput } from 'quasar';
import { useWindow } from 'src/shared/composables';
import { computed, ref, watch } from 'vue';
import { useBoardMutation } from '../composables';
import { requiredField } from 'src/shared/helpers';

const { windowSize } = useWindow();
const { boardMutation } = useBoardMutation();
const isMobile = computed(() => windowSize.value < 600);
const input = ref<QInput | null>(null);
const title = ref('');
const showing = ref(false);

const onReset = () => {
  if (!input.value) return;

  showing.value = false;
  input.value.resetValidation();
  title.value = '';
};

const onAdd = async () => {
  if (!input.value) return;

  const isValid = await input.value.validate();
  if (!isValid) return;

  boardMutation.mutate(title.value);
};

watch(
  () => boardMutation.isSuccess.value,
  () => {
    onReset();
  }
);
</script>

<template>
  <section class="flex justify-between items-center q-pr-md gallery-header">
    <h5 class="q-ma-none">Your Boards</h5>
    <q-btn
      :round="isMobile"
      :rounded="!isMobile"
      outline
      color="primary"
      icon="add"
      :label="isMobile ? '' : 'Add Board'"
      size="md"
      no-caps
    >
      <q-menu
        :anchor="isMobile ? 'bottom left' : 'bottom start'"
        :self="isMobile ? 'top left' : 'top middle'"
        persistent
        v-model="showing"
      >
        <section class="column no-wrap q-pa-md q-gutter-y-md" style="width: 15rem">
          <q-input autofocus ref="input" v-model="title" type="text" label="Label" :rules="[requiredField]" />
          <div class="row q-gutter-x-xs justify-end">
            <q-btn
              flat
              color="red"
              label="Cancel"
              @click="onReset"
              no-caps
              v-close-popup
              :disable="boardMutation.isLoading.value"
            />
            <q-btn color="primary" label="Add" @click="onAdd" no-caps :loading="boardMutation.isLoading.value" />
          </div>
        </section>
      </q-menu>
    </q-btn>
  </section>
</template>

<style lang="scss" scoped></style>
