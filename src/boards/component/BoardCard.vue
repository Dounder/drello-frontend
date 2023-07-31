<script setup lang="ts">
import { Board } from '../interfaces/board.interface';

interface Props {
  board: Board;
}

interface Emits {
  (e: 'on:click', board: Board): void;
}

defineProps<Props>();
const emits = defineEmits<Emits>();
</script>

<template>
  <article class="card flex flex-center" @click="emits('on:click', board)">{{ board.title }}</article>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  background: $secondary;
  height: 100%;
  border-radius: 0.5rem;
}
</style>
