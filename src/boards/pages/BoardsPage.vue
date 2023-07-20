<script setup lang="ts">
import { useWindow } from 'src/shared/composables';
import { reactive } from 'vue';
import { BoardPageGallery, BoardPageMenu } from '../component';
import { useBoards } from '../composables';

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
    <BoardPageMenu v-if="!responsive" :offset="page.offset" :is-drawer="false" />
    <q-inner-loading :showing="boardsQuery.isLoading.value">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
    <BoardPageGallery
      v-if="!boardsQuery.isLoading.value"
      :height="page.minHeight"
      :boards="boardsQuery.data.value || []"
    />
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
