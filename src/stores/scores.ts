import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

const getCleanState = ():Scores => ({
  die1: undefined as unknown as number,
  die2: undefined as unknown as number,
  die3: undefined as unknown as number,
  die4: undefined as unknown as number,
  die5: undefined as unknown as number,
  die6: undefined as unknown as number,
  threeOfAKind: undefined as unknown as number,
  fourOfAKind: undefined as unknown as number,
  fullHouse: undefined as unknown as number,
  smallStraight: undefined as unknown as number,
  largeStraight: undefined as unknown as number,
  yams: undefined as unknown as number,
  chance: undefined as unknown as number,
});

export default defineStore(
  'scores',
  () => {
    const scores = ref<Scores>(getCleanState());

    const diceScores = computed(() => [
      scores.value.die1,
      scores.value.die2,
      scores.value.die3,
      scores.value.die4,
      scores.value.die5,
      scores.value.die6,
    ]);
    function saveScore(scoreName:keyof Scores, value:number):void {
      scores.value[scoreName] = value;
    }

    const sumOfDice = computed<number>(() => {
      let result:number = 0;
      diceScores.value
        .map((die) => die || 0)
        .forEach((die) => {
          result += die;
        });
      return result;
    });

    const bonus = computed<number>(() => (sumOfDice.value >= 63 ? 35 : 0));

    const grandTotal = computed(() => Object.values(scores.value)
      .filter((value) => value !== undefined)
      .reduce((a, b) => a + b, 0));

    function reset():void {
      console.debug('Reset Scores');
      scores.value = getCleanState();
    }

    return {
      scores, bonus, saveScore, sumOfDice, reset, diceScores, grandTotal,
    };
  },
  {
    persist: true,
  },
);
