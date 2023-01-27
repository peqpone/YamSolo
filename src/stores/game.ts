import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import useScoreStore from './scores';

const getCleanState = () => ({
  currentAttempt: 0,
  theme: 'classic',
});
export default defineStore(
  'game',
  () => {
    const game = ref<Game>(getCleanState());

    const scoresStore = useScoreStore();

    const isGameFinished = computed(() => Object.values(scoresStore.scores)
      .every((value) => value !== undefined));

    const canRoll = computed(() => {
      if (isGameFinished.value) {
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
      game.value.theme = newTheme;
    }

    function reset():void {
      console.debug('Reset Game');
      game.value = getCleanState();
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
