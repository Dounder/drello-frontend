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
      d="M240.077-241.077h213.769v-153.769H240.077v153.769Zm0-206.077h213.769v-273.769H240.077v273.769Zm266.077 206.077h213.769v-273.769H506.154v273.769Zm0-326.077h213.769v-153.769H506.154v153.769ZM212.384-145q-27.782 0-48.083-19.982T144-213.384v-535.232q0-27.782 20.301-48.083T212.384-817h535.232q27.782 0 48.083 20.301T816-748.616v80.923h65.308v43.77H816v121.538h65.308v43.77H816v122.538h65.308v43.77H816v78.923q0 28.42-20.301 48.402T747.616-145H212.384Zm0-43.769h535.232q9.23 0 16.923-7.692 7.692-7.693 7.692-16.923v-535.232q0-9.23-7.692-16.923-7.693-7.692-16.923-7.692H212.384q-9.23 0-16.923 7.692-7.692 7.693-7.692 16.923v535.232q0 9.23 7.692 16.923 7.693 7.692 16.923 7.692Zm-24.615-584.462v584.462-584.462Z"
    />
  </svg>
</template>
