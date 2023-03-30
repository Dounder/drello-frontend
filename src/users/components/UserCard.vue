<script setup lang="ts">
import { CardHolder } from 'src/shared/components';
import { User } from '../interfaces';

interface Props {
  user: User;
}

interface Emits {
  (e: 'on:update'): void;
  (e: 'on:delete'): void;
}

const onUpdate = () => {
  console.log('onUpdate');
};

const onDelete = () => {
  console.log('onDelete');
};
</script>

<template>
  <CardHolder :on-update="onUpdate" :on-delete="onDelete" :is-loading="false"> </CardHolder>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 8rem;
  background: rgba($accent, 0.5);
  border: 1px solid $accent;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  transition: all 0.5s ease;
  &:hover {
    background: $accent;
    transition: all 0.5s ease;
    cursor: pointer;
  }
  &-body {
    width: 100%;
    padding: 1rem;
  }
  &-text {
    margin: 0.3rem 0;
    line-height: 1.5;
  }
  &-icon {
    font-size: 1.2rem;
    margin-right: 0.5rem;
    color: $info;
  }
  &-actions {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    display: flex;
    gap: 0.2rem;
  }
}
</style>
