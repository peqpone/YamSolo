<script lang="ts" setup>

import useGameStore from '@/stores/game';
import { computed } from 'vue';

const props = defineProps<{
  dieId: number
  dieValue: number
  forceTheme?: string
}>();

const gameStore = useGameStore();

const theme = computed(() => props.forceTheme || gameStore.game.theme);
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
