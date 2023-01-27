<script lang="ts" setup>

import useGameStore from '@/stores/game';
import { computed } from 'vue';

defineProps<{
  dieId: number
  dieValue: number
}>();

const gameStore = useGameStore();

const theme = computed(() => gameStore.game.theme);
</script>

<template>
  <img
    :alt="`${dieId.toString()}-${dieValue.toString()}`"
    :src="`/dice/${theme}/${dieValue}.svg`"
  />
</template>

<style scoped>
img {
  max-width: 16%;
  margin: 6%;
}
</style>
