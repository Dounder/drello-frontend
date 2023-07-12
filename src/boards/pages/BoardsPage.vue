<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive } from 'vue';
import { BoardPageGallery, BoardPageMenu } from '../component';
import { useBoardMenu } from '../composables';

const { showMenu, breakpoint } = useBoardMenu();
const page = reactive({ offset: 0, minHeight: '100vh' });

const setWindowSize = () => {
  showMenu.value = window.innerWidth >= breakpoint;
};

const getOffset = (offset: number) => {
  page.offset = offset;
  page.minHeight = offset ? `calc(100vh - ${offset}px)` : '100vh';
  return { minHeight: page.minHeight };
};

onMounted(() => {
  window.addEventListener('resize', setWindowSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', setWindowSize);
});
</script>

<template>
  <q-page :style-fn="getOffset">
    <BoardPageMenu v-if="showMenu" :offset="page.offset" :is-drawer="false" />
    <BoardPageGallery :height="page.minHeight" />
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
