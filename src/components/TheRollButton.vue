<template>
  <div class="button-area">
    <a @click="roll" @keydown="roll">Roll</a>
  </div>
</template>
<script setup lang="ts">
import useDiceStore from '@/stores/dice';

const diceStore = useDiceStore();
const die = () => Math.floor(Math.random() * (6 - 1 + 1) + 1);
const roll = () => {
  const newDice = [die(), die(), die(), die(), die()];
  diceStore.saveDice(newDice);
};
</script>
