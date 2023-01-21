<script setup lang="ts">
import useDiceStore from '@/stores/dice';
import useGameStore from '@/stores/game';
import { computed } from 'vue';

const diceStore = useDiceStore();
const gameStore = useGameStore();

const canRoll = computed(() => gameStore.canRoll);
const die = () => Math.floor(Math.random() * (6 - 1 + 1) + 1);
const roll = () => {
  if (!canRoll.value) {
    console.debug('Cannot roll the dice');
    return;
  }
  const newDice = [die(), die(), die(), die(), die()];
  diceStore.saveDice(newDice);
  gameStore.increaseAttempts();
};
</script>

<template>
  <div class="button-area">
    <a
      class="button"
      :class="{ disabled: !canRoll }"
      @click="roll"
      @keydown="roll"
    >
      Roll
    </a>
  </div>
</template>

<style lang="scss" scoped>
.button-area {
  display: flex;
  align-items: stretch;
  text-align: center;
  justify-content: center;
  .button {
    display: block;
    width: 100%;
    line-height: 5rem;
    font-size: 3rem;
    font-weight: 100;
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }
  }
}
</style>
