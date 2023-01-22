<script setup lang="ts">
import useDiceStore from '@/stores/dice';
import useScoresStore from '@/stores/scores';
import useGameStore from '@/stores/game';
import { computed } from 'vue';

import GetScores from '@/Scores';

const diceStore = useDiceStore();
const scoresStore = useScoresStore();
const gameStore = useGameStore();

const scores = computed(() => new GetScores(diceStore.dice));

const diceScores: Array<{ scoreName: Partial<keyof Scores>, label: string }> = [
  { scoreName: 'die1', label: '1' },
  { scoreName: 'die2', label: '2' },
  { scoreName: 'die3', label: '3' },
  { scoreName: 'die4', label: '4' },
  { scoreName: 'die5', label: '5' },
  { scoreName: 'die6', label: '6' },
];
const otherScores: Array<{ scoreName: Partial<keyof Scores>, label: string }> = [
  { scoreName: 'threeOfAKind', label: '3 of a K' },
  { scoreName: 'fourOfAKind', label: '4 of a K' },
  { scoreName: 'fullHouse', label: 'fullHouse' },
  { scoreName: 'smallStraight', label: 'straight' },
  { scoreName: 'largeStraight', label: 'STRAIGHT' },
  { scoreName: 'yams', label: 'yams' },
  { scoreName: 'chance', label: 'chance' },
];

type ScoreUnit = {
  label: string,
  scoreName: keyof Scores,
  value: number | undefined,
};
type ScoresToRender = Record<Partial<keyof Scores>, ScoreUnit>;

type DiceToRender = Array<ScoreUnit>;

function getSavedValue(scoreName: keyof Scores):number | undefined {
  return scoresStore.scores[scoreName];
}

const getDefinedScore = (scoreName: keyof Scores):number | undefined => {
  const savedValue = getSavedValue(scoreName);
  return savedValue === undefined
    ? scores.value[scoreName]
    : savedValue;
};

const scoresToRender = computed<ScoresToRender>(() => {
  const initialValue = {} as ScoresToRender;
  return otherScores.reduce((accumulator, { scoreName, label }) => {
    accumulator[scoreName] = {
      value: getDefinedScore(scoreName),
      label,
      scoreName,
    };
    return accumulator;
  }, initialValue);
});

const diceToRender = computed<DiceToRender>(() => diceScores
  .map(({ scoreName, label }) => ({
    label,
    scoreName,
    value: getDefinedScore(scoreName),
  })));

const canSaveZero = computed(() => !gameStore.canRoll);

function getRenderedScore(label:string, value:number | undefined) {
  if (value === undefined) {
    return canSaveZero.value ? `${label} 0` : label;
  }
  return `${label} ${value}`;
}

function saveScore(value: number, scoreName: keyof Scores):void {
  const savedValue = getSavedValue(scoreName);
  if (savedValue === undefined) {
    scoresStore.saveScore(scoreName, value);
    gameStore.resetAttempts();
    diceStore.reset();
  } else {
    console.debug(`A score for ${scoreName} has already been saved (${savedValue})`);
  }
}

</script>

<template>
  <div class="score-area">
    <div class="dice-container">
      <div
        v-for="{ scoreName, value, label } in diceToRender"
        :key="scoreName"
        @click="saveScore((value || 0), scoreName)"
        @keydown="saveScore((value || 0), scoreName)"
        :class="{ saved: getSavedValue(scoreName) !== undefined }"
      >
        <div v-if="value !== undefined" class="count-dice">{{ value }}</div>
        <img :class="{ active: value !== undefined }" :alt="label" :src="`/dice/classic/${label}.svg`" />
      </div>
    </div>
    <div class="text-score-container">
      <div
        v-for="({ label, value, scoreName }, index) in scoresToRender"
        :key="index"
        @click="saveScore(value || 0, scoreName)"
        @keydown="saveScore(value || 0, scoreName)"
      >
        <span
          :class="{ active: value !== undefined, saved: getSavedValue(scoreName) !== undefined }"
        >
          {{ getRenderedScore(label, value) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.score-area {
  display: grid;
  grid: 1fr 1fr / auto;
  .dice-container {
    display: grid;
    grid: auto/repeat(6, 1fr);
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
    .saved {
      .count-dice {
        position: absolute;
        margin: 0;
        top: 20%;
        width: 100%;
      }
      img.active {
        opacity: 0.1 !important;
      }
    }
  }
  .text-score-container {
    display: grid;
    grid: auto / repeat(3, 1fr);
    span {
      opacity: 0.3;
    }
  }
}
.active {
  opacity: 1!important;
}
.saved {
  color: #FFF;
}
</style>
