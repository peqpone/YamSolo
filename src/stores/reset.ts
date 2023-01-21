import useDiceStore from '@/stores/dice';
import useScoresStore from '@/stores/scores';
import useGameStore from '@/stores/game';

export default () => {
  const diceStore = useDiceStore();
  const scoresStore = useScoresStore();
  const gameStore = useGameStore();
  [diceStore, scoresStore, gameStore].forEach((store) => {
    store.reset();
  });
};
