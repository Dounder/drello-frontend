<template>
  <router-view />
</template>

<script setup lang="ts">
import useAuth from 'src/auth/composables/useAuth';

useAuth().store.reloadData();
</script>
