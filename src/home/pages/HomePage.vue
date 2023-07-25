<script setup lang="ts">
import { reactive } from 'vue';

import { BoardGallery } from 'src/boards/component';
import { LateralMenu } from '../components';
import { useBoards } from 'src/boards/composables';
import { useWindow } from 'src/shared/composables';

const { responsive } = useWindow();
const { boardsQuery } = useBoards();
const page = reactive({ offset: 0, minHeight: '100vh' });

const getOffset = (offset: number) => {
  page.offset = offset;
  page.minHeight = offset ? `calc(100vh - ${offset}px)` : '100vh';
  return { minHeight: page.minHeight };
};
</script>

<template>
  <q-page :style-fn="getOffset">
    <LateralMenu v-if="!responsive" :offset="page.offset" :is-drawer="false" />
    <q-inner-loading :showing="boardsQuery.isLoading.value">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
    <BoardGallery v-if="!boardsQuery.isLoading.value" :height="page.minHeight" :boards="boardsQuery.data.value || []" />
  </q-page>
</template>

<style lang="scss" scoped>
@include phone {
  .q-page {
    padding: 1rem;
    width: 100%;
    margin: auto;
  }
}

@include media(1180px) {
  .q-page {
    gap: 1rem;
    width: 70rem;
    @include flex;
  }
}
</style>
