<script setup lang="ts"></script>

<template>
  <article class="bg">
    <section class="bg-container">
      <span class="bg-shape" v-for="i in 5" :key="i"></span>
    </section>
  </article>
</template>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  &-container {
    width: 100%;
    height: 30rem;
    position: absolute;
    top: -5rem;
    right: 0;
    transform: rotate(-25deg);
    transform-origin: top right;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  &-shape {
    flex: 1;
    height: 6rem;
    background: rgba($white, 0.1);
    border-radius: 10rem 0 0 10rem;
  }
  .bg-shape:nth-of-type(even) {
    position: relative;
    &::after {
      content: '';
      width: 5rem;
      height: 100%;
      background: $primary;
      position: absolute;
      top: 0;
      left: -1px;
      border-radius: 0 10rem 10rem 0;
    }
  }
  .bg-shape:nth-of-type(1) {
    width: 60%;
  }
  .bg-shape:nth-of-type(2) {
    width: 50%;
  }
  .bg-shape:nth-of-type(3) {
    width: 90%;
  }
  .bg-shape:nth-of-type(4) {
    width: 30%;
  }
  .bg-shape:nth-of-type(5) {
    width: 50%;
  }
}
</style>
