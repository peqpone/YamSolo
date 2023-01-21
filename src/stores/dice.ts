import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

const getCleanState = () => [];
export default defineStore(
  'dice',
  () => {
    const dice = ref<Dice>(getCleanState());
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

    function reset():void {
      console.debug('Reset Dice');
      dice.value = getCleanState();
    }

    return {
      dice,
      saveDice,
      uniqueDice,
      diceOccurrences,
      reset,
    };
  },
  {
    persist: true,
  },
);
