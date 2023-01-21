<script setup lang="ts">
import { computed } from 'vue';
import RenderDie from '@/components/RenderDie.vue';
import useDiceStore from '@/stores/dice';

const diceStore = useDiceStore();
const dice = computed(() => diceStore.dice);

const randomRotation = () => Math.floor(Math.random() * (10 + 10) - 10);
const isSelected = computed(() => false);
const style = () => (
  isSelected.value
    ? {}
    : { transform: `rotate(${randomRotation()}deg)` }
);

const selectDice = (index:number, dieValue:number) => {
  console.log(`Select dice ${index} with value ${dieValue}`);
};

</script>

<template>
  <div class="dice-area">
    <RenderDie
      v-for="(dieValue, index) in dice"
      :key="index"
      :die-value="dieValue"
      :style="style()"
      :class="{ selected: isSelected }"
      @click="selectDice(index, dieValue)"
    />
  </div>
</template>
