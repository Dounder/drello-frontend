<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const { id, title } = route.params;
</script>

<template>
  <p>Board: {{ title }} - {{ id }}</p>
</template>

<style lang="scss" scoped></style>
