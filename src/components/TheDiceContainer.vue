<script setup lang="ts">
import { computed } from 'vue';
import RenderDie from '@/components/RenderDie.vue';
import useDiceStore from '@/stores/dice';

const diceStore = useDiceStore();
const dice = computed(() => diceStore.dice);
</script>

<template>
  <div class="dice-area">
    <RenderDie v-for="(dieValue, index) in dice" :key="index" :die-value="dieValue" />
  </div>
</template>
