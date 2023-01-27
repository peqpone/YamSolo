<script setup lang="ts">
import { computed } from 'vue';
import RenderDie from '@/components/RenderDie.vue';
import useDiceStore from '@/stores/dice';

const diceStore = useDiceStore();
const dice = computed(() => diceStore.dice);

const randomRotation = () => Math.floor(Math.random() * (10 + 10) - 10);
const isSaved = (dieId:number) => diceStore.savedDice[dieId];
const style = () => ({ transform: `rotate(${randomRotation()}deg)` });

const saveDice = (index:number, dieValue:number) => {
  if (isSaved(index)) {
    console.log(`UnSave dice ${index} with value ${dieValue}`);
    diceStore.removeFromSavedDice(index);
  } else {
    console.log(`Save dice ${index} with value ${dieValue}`);
    diceStore.addToSavedDice(index, dieValue);
  }
};

</script>

<template>
  <div class="dice-area">
    <RenderDie
      v-for="(dieValue, index) in dice"
      :key="index"
      :die-id="index"
      :die-value="dieValue"
      :style="style()"
      :class="{ selected: isSaved(index) }"
      @click="saveDice(index, dieValue)"
    />
  </div>
</template>
