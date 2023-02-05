<script lang="ts" setup>

import useGameStore from '@/stores/game';
import { computed } from 'vue';

const props = defineProps<{
  dieValue: number
  forceTheme?: string
}>();

const gameStore = useGameStore();

const theme = computed(() => props.forceTheme || gameStore.game.theme);
</script>

<template>
  <img
    :alt="`${dieValue.toString()}`"
    :src="`/dice/${theme}/${dieValue}.svg`"
  />
</template>

<style scoped>
img {
  max-width: 16%;
  margin: 6%;
}
</style>
