<template>
  <div id="end-game-container">
    <TheTotalsContainer only-grand-total />
    <div class="main-cta">
      <a class="button" @click="restart" @keydown="restart">Restart</a>
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
import TheTotalsContainer from '@/components/TheTotalsContainer.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const restart = () => {
  router.push({ name: 'home' });
};

</script>
