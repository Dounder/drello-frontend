<script setup lang="ts">
interface Props {
  fill?: string;
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  pathFill?: string;
}

withDefaults(defineProps<Props>(), {
  fill: 'currentColor',
  width: 48,
  height: 48,
  stroke: 'currentColor',
  strokeWidth: 0,
  pathFill: 'currentColor',
});
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :height="height" viewBox="0 -960 960 960" :width="width" :fill="fill">
    <path
      :fill="pathFill"
      :stroke-width="strokeWidth"
      :stroke="stroke"
      d="M231.769-190.769h149.539v-247h198.384v247h148.539v-372.846L480-751.462 231.769-564.205v373.436ZM188-147v-439l292-219.539L772-586v439H535.923v-247H425.077v247H188Zm292-324.231Z"
    />
  </svg>
</template>

<style lang="scss" scoped></style>
