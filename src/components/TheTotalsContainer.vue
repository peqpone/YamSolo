<script setup lang="ts">
import { computed } from 'vue';
import useScoresStore from '../stores/scores';

defineProps<{
  onlyGrandTotal?: boolean
}>();

const scoresStore = useScoresStore();

const grandTotal = computed(() => scoresStore.grandTotal);
const bonus = computed(() => scoresStore.bonus);
const sumOfDice = computed(() => scoresStore.sumOfDice);

</script>

<template>
  <div class="total-area" :class="{ 'no-grid': onlyGrandTotal }">
    <span v-if="!onlyGrandTotal">tot {{ sumOfDice }}</span>
    <span v-if="!onlyGrandTotal">bonus {{ bonus }}</span>
    <span>total {{ grandTotal }}</span>
  </div>
</template>

<style lang="scss" scoped>
.total-area {
  display: grid;
  grid: auto/ repeat(3, 1fr);
  &.no-grid {
    display: block;
  }
}
</style>
