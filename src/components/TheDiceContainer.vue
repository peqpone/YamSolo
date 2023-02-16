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

const isLocked = (die:Die) => die.isLocked;

</script>

<template>
  <div class="dice-area">
    <template
      v-for="(die, index) in rawDice"
      :key="index"
    >
      <render-die
        v-if="!isLocked(die)"
        :die-value="die.value"
        :style="style()"
        :class="`die-${index}`"
        @click="toggleLock(index)"
      />
    </template>
  </div>
  <div class="locked-dice-area">
    <template
      v-for="(die, index) in rawDice"
      :key="index"
    >
      <render-die
        v-if="isLocked(die)"
        :die-value="die.value"
        class="selected`"
        :class="`die-${index}`"
        @click="toggleLock(index)"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.selected {
  width: 15%;
  margin: 3%;
}
</style>
