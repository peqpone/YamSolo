import { computed } from 'vue';
import { defineStore } from 'pinia';
import useDiceStore from '@/stores/dice';

export default defineStore(
  'scores',
  () => {
    const diceStore = useDiceStore();
    const dice = computed(() => diceStore.dice);
    const diceOccurrences = computed(() => diceStore.diceOccurrences);
    const uniqueDice = computed(() => diceStore.uniqueDice);
    function addDice():number {
      return dice.value.reduce((a, b) => a + b);
    }

    const diceSum = computed<number>(() => addDice());

    function getThreeOfAKind():number {
      return Object.values(diceOccurrences.value).includes(3)
        ? diceSum.value
        : 0;
    }

    function getFourOfAKind():number {
      return Object.values(diceOccurrences.value).includes(4)
        ? diceSum.value
        : 0;
    }

    function getFullHouse():0 | 25 {
      return Object.values(diceOccurrences.value).includes(3)
          && Object.values(diceOccurrences.value).includes(2)
        ? 25
        : 0;
    }

    function getYams():0 | 50 {
      return Object.values(diceOccurrences.value).includes(5)
        ? 50
        : 0;
    }

    function lookForStraights():Array<boolean> {
      return uniqueDice.value
        .map((die, index, originalSortedDice) => {
          if (index !== originalSortedDice.length - 1) {
            return die + 1 === originalSortedDice[index + 1];
          }
          return true;
        });
    }

    function getSmallStraight():0 | 30 {
      const isSmallStraight = lookForStraights();
      return isSmallStraight.every(Boolean)
          && isSmallStraight.length >= 4
        ? 30
        : 0;
    }

    function getLargeStraight():0 | 40 {
      const isLargeStraight = lookForStraights();
      return isLargeStraight.every(Boolean)
          && isLargeStraight.length === 5
        ? 40
        : 0;
    }

    const threeOfAKind = computed<number>(() => getThreeOfAKind());
    const fourOfAKind = computed<number>(() => getFourOfAKind());
    const fullHouse = computed<0 | 25>(() => getFullHouse());
    const smallStraight = computed<0 | 30>(() => getSmallStraight());
    const largeStraight = computed<0 | 40>(() => getLargeStraight());
    const yams = computed<0 | 50>(() => getYams());

    return {
      diceSum,
      threeOfAKind,
      fourOfAKind,
      fullHouse,
      smallStraight,
      largeStraight,
      yams,
    };
  },
);
