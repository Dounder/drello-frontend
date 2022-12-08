import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useExampleStoreStore = defineStore('example-store', () => {
  const count = ref<number>(0);

  return {
    //? Props
    count,

    //* Getters
    square: computed(() => count.value * count.value),

    //! Actions
  };
});
