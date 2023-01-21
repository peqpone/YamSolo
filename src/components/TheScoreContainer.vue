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

type ScoresToRender = Record<string, {
  value: number | undefined,
  label: string,
  scoreName: keyof Scores,
}>;

const scoresToRender = computed<ScoresToRender>(() => ({
  threeOfAKind: {
    value: scoresStore.scores.threeOfAKind === undefined
      ? scores.value.threeOfAKind
      : scoresStore.scores.threeOfAKind,
    label: '3 of a K',
    scoreName: 'threeOfAKind',
  },
  fourOfAKind: {
    value: scoresStore.scores.fourOfAKind === undefined
      ? scores.value.fourOfAKind
      : scoresStore.scores.fourOfAKind,
    label: '4 of a K',
    scoreName: 'fourOfAKind',
  },
  fullHouse: {
    value: scoresStore.scores.fullHouse === undefined
      ? scores.value.fullHouse
      : scoresStore.scores.fullHouse,
    label: 'fullHouse',
    scoreName: 'fullHouse',
  },
  smallStraight: {
    value: scoresStore.scores.smallStraight === undefined
      ? scores.value.smallStraight
      : scoresStore.scores.smallStraight,
    label: 'straight',
    scoreName: 'smallStraight',
  },
  largeStraight: {
    value: scoresStore.scores.largeStraight === undefined
      ? scores.value.largeStraight
      : scoresStore.scores.largeStraight,
    label: 'STRAIGHT',
    scoreName: 'largeStraight',
  },
  yams: {
    value: scoresStore.scores.yams === undefined
      ? scores.value.yams
      : scoresStore.scores.yams,
    label: 'yams',
    scoreName: 'yams',
  },
  chance: {
    value: scoresStore.scores.chance === undefined
      ? scores.value.diceSum
      : scoresStore.scores.chance,
    label: 'chance',
    scoreName: 'chance',
  },
}));

type DiceToRender = Array<{
  label: keyof Scores,
  value: number,
}>;

const diceToRender = computed<DiceToRender>(() => [
  {
    label: 1,
    value: scoresStore.scores[1] === undefined
      ? diceStore.getTotal(1)
      : scoresStore.scores[1],
  },
  {
    label: 2,
    value: scoresStore.scores[2] === undefined
      ? diceStore.getTotal(2)
      : scoresStore.scores[2],
  },
  {
    label: 3,
    value: scoresStore.scores[3] === undefined
      ? diceStore.getTotal(3)
      : scoresStore.scores[3],
  },
  {
    label: 4,
    value: scoresStore.scores[4] === undefined
      ? diceStore.getTotal(4)
      : scoresStore.scores[4],
  },
  {
    label: 5,
    value: scoresStore.scores[5] === undefined
      ? diceStore.getTotal(5)
      : scoresStore.scores[5],
  },
  {
    label: 6,
    value: scoresStore.scores[6] === undefined
      ? diceStore.getTotal(6)
      : scoresStore.scores[6],
  },
]);

const canSaveZero = computed(() => !gameStore.canRoll);

function getRenderedScore(label:string, value:number) {
  return value !== undefined || canSaveZero.value ? `${label} ${value || 0}` : label;
}

function getSavedValue(scoreName: keyof Scores):number | undefined {
  return scoresStore.scores[scoreName];
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
        v-for="{ label, value } in diceToRender"
        :key="label"
        @click="saveScore((value || 0) * Number(label), label)"
        @keydown="saveScore((value || 0) * Number(label), label)"
        :class="{ saved: getSavedValue(label) !== undefined }"
      >
        <div v-if="value !== undefined" class="count-dice">{{ value }}</div>
        <img :class="{ active: value !== undefined }" :alt="label.toString()" :src="`/dice/classic/${label}.svg`" />
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
          {{ getRenderedScore(label, Number(label)) }}
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
