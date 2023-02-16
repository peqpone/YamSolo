<script setup lang="ts">
import TheScoreContainer from '@/components/TheScoreContainer.vue';
import TheDiceContainer from '@/components/TheDiceContainer.vue';
import TheRollButton from '@/components/TheRollButton.vue';
import TheTotalsContainer from '@/components/TheTotalsContainer.vue';
import useGameStore from '@/stores/game';
import { computed, onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';

const gameStore = useGameStore();
const isGameFinished = computed(() => gameStore.isGameFinished);

const router = useRouter();

const unwatch = watch(isGameFinished, () => {
  router.push({ name: 'end-game' });
});

onBeforeUnmount(() => {
  unwatch();
});
</script>
<template>
  <div id="game-container">
    <TheScoreContainer />
    <TheDiceContainer />
    <TheRollButton />
    <TheTotalsContainer />
  </div>
</template>

<style lang="scss" scoped>
#game-container {
  width: inherit;
  max-width: 500px;
  display: grid;
  grid: 2fr 4fr 1fr auto / auto;
  gap: 1rem;
}
</style>
