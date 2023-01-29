<script setup lang="ts">
import { computed } from 'vue';
import RenderDie from '@/components/RenderDie.vue';
import useDiceStore from '@/stores/dice';

const diceStore = useDiceStore();
const rawDice = computed(() => diceStore.rawDice);

const randomRotation = () => Math.floor(Math.random() * (10 + 10) - 10);
const style = () => ({ transform: `rotate(${randomRotation()}deg)` });

const toggleLock = (index:number) => {
  diceStore.toggleLock(index);
};

</script>

<template>
  <div class="dice-area">
    <RenderDie
      v-for="(die, index) in rawDice"
      :key="index"
      :die-id="index"
      :die-value="die.value"
      :style="style()"
      :class="{ selected: die.isLocked }"
      @click="toggleLock(index)"
    />
  </div>
</template>

<style scoped lang="scss">
.selected {
  zoom: 0.2;
}
</style>
