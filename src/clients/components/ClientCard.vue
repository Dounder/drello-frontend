<script setup lang="ts"></script>

<template>
  <q-card class="card">
    <q-card-section>
      <span class="card-date"></span>
    </q-card-section>
    <q-card-section> Lorem ipsum dolor sit amet, consectetur adipiscing elit </q-card-section>
  </q-card>
</template>

<style lang="scss" scoped>
.card {
  width: min(20rem, 100%);
  margin: auto;
  background: rgba($accent, 0.5);
  border: 1px solid $accent;
  transition: all 0.5s ease;
  &:hover {
    background: $accent;
    transform: scale(1.03);
    transition: all 0.5s ease;
  }
}
</style>
