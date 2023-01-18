<template>
  <div id="game-container">
    <TheScoreContainer />
    <TheDiceContainer />
    <div class="button-area">
      <h1>Button</h1>
    </div>
    <div class="total-area">
      <span>totals</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#game-container {
  width: inherit;
  display: grid;
  grid: 2fr 4fr 1fr auto / auto;
  gap: 1rem;
}
</style>
<script setup lang="ts">
import TheScoreContainer from '@/components/TheScoreContainer.vue';
import TheDiceContainer from '@/components/TheDiceContainer.vue';
</script>
