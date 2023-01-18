<script setup lang="ts">
import useScoreStore from '@/stores/scores';
import useDiceStore from '@/stores/dice';
import { computed } from 'vue';

const scoreStore = useScoreStore();
const diceStore = useDiceStore();

const scores = computed(() => scoreStore);
const diceOccurrences = computed(() => diceStore.diceOccurrences);

const scoresToRender = computed(() => ({
  threeOfAKind: {
    value: scores.value.threeOfAKind,
    label: '3 of a K',
  },
  fourOfAKind: {
    value: scores.value.fourOfAKind,
    label: '4 of a K',
  },
  fullHouse: {
    value: scores.value.fullHouse,
    label: 'fullHouse',
  },
  smallStraight: {
    value: scores.value.smallStraight,
    label: 'straight',
  },
  largeStraight: {
    value: scores.value.largeStraight,
    label: 'STRAIGHT',
  },
  yams: {
    value: scores.value.yams,
    label: 'yams',
  },
  diceSum: {
    value: scores.value.diceSum,
    label: 'chance',
  },
}));

const diceToRender = computed(() => [
  {
    value: diceOccurrences.value['1'],
    label: '1',
  },
  {
    value: diceOccurrences.value['2'],
    label: '2',
  },
  {
    value: diceOccurrences.value['3'],
    label: '3',
  },
  {
    value: diceOccurrences.value['4'],
    label: '4',
  },
  {
    value: diceOccurrences.value['5'],
    label: '5',
  },
  {
    value: diceOccurrences.value['6'],
    label: '6',
  },
]);

function getRenderedScore(label:string, value:number) {
  return value ? `${label} ${value}` : label;
}

</script>

<template>
  <div class="score-area">
    <div class="dice-container">
      <div v-for="{ label, value } in diceToRender" :key="label">
        <div v-if="value" class="count-dice">{{ value }}</div>
        <img :class="{ active: value }" :alt="label" :src="`/dice/classic/${label}.svg`" />
      </div>
    </div>
    <div class="text-score-container">
      <div
        v-for="({ label, value }, index) in scoresToRender"
        :key="index"
      >
        <span :class="{ active: value }">{{ getRenderedScore(label, value) }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.score-area {
  display: grid;
  grid: 1fr 3fr / auto;
  .dice-container {
    display: grid;
    grid: auto/repeat(6, 1fr);
  }
  .text-score-container {
    display: grid;
    grid: auto / repeat(3, 1fr);
    span {
      opacity: 0.3;
    }
  }
}
.dice-container {
  text-align: center;
  margin-bottom: 1rem;
  .count-dice {
    line-height: 1em;
    margin-top: -0.5rem;
    margin-bottom: 0.5rem;
  }
  img {
    width: 70%;
    max-width: 3rem;
    opacity: 0.3;
  }
}
.active {
  opacity: 1!important;
}
</style>
