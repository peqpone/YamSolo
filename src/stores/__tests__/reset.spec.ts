import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import useScoresStore from '../scores';
import useGameStore from '../game';
import useDiceStore from '../dice';
import reset from '../reset';

describe('store/reset', () => {
  let scoresStore: ReturnType<typeof useScoresStore>;
  let gameStore: ReturnType<typeof useGameStore>;
  let diceStore: ReturnType<typeof useDiceStore>;
  beforeEach(() => {
    setActivePinia(createPinia());
    scoresStore = useScoresStore();
    gameStore = useGameStore();
    diceStore = useDiceStore();
    scoresStore.reset();
    gameStore.reset();
  });
  describe('reset', () => {
    it('Should reset all stores', () => {
      gameStore.$patch({ game: { currentAttempt: 2 } });
      scoresStore.$patch({ scores: { die1: 3 } });
      diceStore.$patch({ rawDice: [{ value: 1, isLocked: true }] });
      reset();
      expect(gameStore.game).toStrictEqual({ currentAttempt: 0, theme: 'classic' });
      expect(scoresStore.scores).toStrictEqual({
        chance: undefined,
        die1: undefined,
        die2: undefined,
        die3: undefined,
        die4: undefined,
        die5: undefined,
        die6: undefined,
        fourOfAKind: undefined,
        fullHouse: undefined,
        largeStraight: undefined,
        smallStraight: undefined,
        threeOfAKind: undefined,
        yams: undefined,
      });
      expect(diceStore.rawDice).toStrictEqual([]);
    });
  });
});
