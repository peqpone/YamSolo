import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import useScoreStore from './scores';
import useDiceStore from './dice';

const getCleanState = () => ({
  currentAttempt: 0,
  theme: 'classic',
});
export default defineStore(
  'game',
  () => {
    const game = ref<Game>(getCleanState());

    const scoresStore = useScoreStore();
    const diceStore = useDiceStore();

    const isGameFinished = computed(() => Object.values(scoresStore.scores)
      .every((value) => value !== undefined));

    const canRoll = computed(() => {
      if (isGameFinished.value) {
        console.debug('Game is finished');
        return false;
      }
      const { rawDice } = diceStore;
      if (rawDice.length > 0 && rawDice.every((die) => die.isLocked)) {
        console.debug('All dice are locked');
        return false;
      }
      return game.value.currentAttempt < 3;
    });
    function increaseAttempts() {
      game.value.currentAttempt += 1;
    }
    function resetAttempts() {
      game.value.currentAttempt = 0;
    }
    function saveTheme(newTheme:string) {
      if (newTheme === game.value.theme) {
        console.debug(`"${newTheme}" is already the chosen theme`);
      } else {
        console.debug(`Use "${newTheme}" as theme`);
        game.value.theme = newTheme;
      }
    }

    function reset():void {
      // console.debug('Reset Game');
      // game.value = getCleanState();
      // reset only currentAttempt, otherwise any chosen theme would be lost
      // TODO fix this shit, either reset is not called before launching the game,
      // TODO or getCleanState is aware of what to reset
      console.debug('Reset Attempts');
      resetAttempts();
    }

    return {
      game,
      saveTheme,
      increaseAttempts,
      resetAttempts,
      canRoll,
      reset,
      isGameFinished,
    };
  },
  {
    persist: true,
  },
);
