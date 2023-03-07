<script setup lang="ts">
import { toRefs } from 'vue';
import { CssUnit } from '../interfaces';

interface Props {
  index: number;
  size?: CssUnit | string;
  top?: CssUnit | string;
  left?: CssUnit | string;
  bottom?: CssUnit | string;
  right?: CssUnit | string;
}

const props = withDefaults(defineProps<Props>(), {
  size: '1rem',
  position: 'top left',
  top: 'auto',
  left: 'auto',
  bottom: 'auto',
  right: 'auto',
});

const { size } = toRefs(props);
</script>

<template>
  <article class="cross" :style="{ top, left, bottom, right, '--delay': index }"></article>
</template>

<style lang="scss" scoped>
.cross {
  width: v-bind(size);
  height: v-bind(size);
  background: rgba($grey, 0.1);
  position: absolute;
  border-radius: 50%;
  animation: float infinite 5s ease-in-out;
  animation-delay: calc(var(--delay) * 0.5s);
}
</style>
