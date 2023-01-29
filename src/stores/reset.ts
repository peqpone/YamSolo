import useDiceStore from '@/stores/dice';
import useScoresStore from '@/stores/scores';
import useGameStore from '@/stores/game';

export default () => {
  [useDiceStore(), useScoresStore(), useGameStore()].forEach((store) => {
    store.reset();
  });
};
