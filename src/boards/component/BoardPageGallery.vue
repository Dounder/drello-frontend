<script setup lang="ts">
import { BoardCard } from '.';

interface Props {
  height: string;
}

defineProps<Props>();
</script>

<template>
  <section class="container">
    <q-scroll-area :style="{ height: `calc(${height} - 2rem)` }" class="full-width">
      <section class="gallery">
        <BoardCard v-for="index in 100" :key="index" />
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
  }

  ::-webkit-scrollbar {
    width: 8px;
    &-track {
      background: #f1f1f1;
    }
    &-thumb {
      background: #888;
      border-radius: 4px;
      &:hover {
        background: #555;
      }
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
