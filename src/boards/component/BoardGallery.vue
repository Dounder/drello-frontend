<script setup lang="ts">
import { useRouter } from 'vue-router';
import { BoardCard, GalleryHeader } from '.';
import { Board } from '../interfaces/board.interface';

interface Props {
  height: string;
  boards: Board[];
}

defineProps<Props>();
const router = useRouter();

const handleClick = ({ id, title }: Board) => {
  title = title.replace(/\s/g, '_');
  router.push({ name: 'board-page', params: { id, title } });
};
</script>

<template>
  <section class="container">
    <q-scroll-area :style="{ height: `calc(${height} - 2rem)` }" class="full-width">
      <GalleryHeader />
      <section class="gallery">
        <BoardCard v-for="board in boards" :key="board.id" :board="board" @on:click="handleClick" />
      </section>
    </q-scroll-area>
  </section>
</template>

<style lang="scss" scoped>
@include phone {
  .container {
    width: 100%;
  }
  .gallery {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 6rem;
    grid-gap: 1rem;
    overflow: hidden auto;
    padding-right: 1rem;
    &-header {
      position: sticky;
      top: 0;
      background: white;
      padding: 0 1rem 1rem 0;
    }
    &-menu {
      width: 20rem;
    }
  }
}

@include tablet-portrait-up {
  .gallery {
    grid-template-columns: repeat(3, 1fr);
  }
}

@include tablet-landscape-up {
  .gallery {
    grid-template-columns: repeat(4, 1fr);
  }
}

@include media(1180px) {
  .container {
    width: 80%;
  }
}
</style>
