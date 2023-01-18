import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export default defineStore(
  'dice',
  () => {
    const dice = ref<Dice>([]);
    function saveDice(diceToSave:Dice):void {
      dice.value = diceToSave;
    }

    const sortDice = (diceToParse:Dice = dice.value):Dice => diceToParse.sort((a, b) => a - b);
    const removeDuplicates = ():Dice => sortDice([...new Set(dice.value)]);

    const sortedDice = computed<Dice>(() => sortDice());

    function countOccurrences():DiceOccurrences {
      const result:DiceOccurrences = {};
      sortedDice.value
        .forEach((die) => {
          result[die] = result[die] ? result[die] + 1 : 1;
        });
      return result;
    }
    const uniqueDice = computed<Dice>(() => removeDuplicates());
    const diceOccurrences = computed<DiceOccurrences>(() => countOccurrences());

    return {
      dice,
      saveDice,
      uniqueDice,
      diceOccurrences,
    };
  },
  {
    persist: true,
  },
);
