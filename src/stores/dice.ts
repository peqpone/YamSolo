import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

const getCleanDice = () => [];
const getRawDice = () => [];
export default defineStore(
  'dice',
  () => {
    const rawDice = ref<RawDice>(getRawDice());
    const dice = computed<Dice>(() => rawDice.value.map(({ value }) => value));

    function saveDice(diceToSave:RawDice):void {
      rawDice.value = diceToSave;
    }
    function toggleLock(index:number):void {
      const isCurrentlyLocked = rawDice.value[index].isLocked;
      rawDice.value[index].isLocked = !isCurrentlyLocked;
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
      rawDice.value = getCleanDice();
      rawDice.value = getRawDice();
    }

    return {
      dice,
      rawDice,
      saveDice,
      uniqueDice,
      diceOccurrences,
      reset,
      toggleLock,
    };
  },
  {
    persist: true,
  },
);
