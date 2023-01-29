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
  const diceToSave:Array<Die> = [];
  // at the beginning of any attempt the store holds no dice
  // create an array of placeholder dice to overate over
  const emptyDice = Array
    .from({ length: 5 })
    .fill({ isLocked: false, value: undefined }) as Array<Die>;

  const iterateOver:Array<Die> = diceStore.rawDice.length > 0 ? diceStore.rawDice : emptyDice;
  iterateOver.forEach(({ isLocked, value }) => {
    diceToSave.push({ isLocked, value: isLocked ? value : die() });
  });
  diceStore.saveDice(diceToSave);
  gameStore.increaseAttempts();
};
</script>

<template>
  <div class="main-cta">
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
