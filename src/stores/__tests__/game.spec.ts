import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import useScoresStore from '../scores';
import useGameStore from '../game';

describe('store/game', () => {
  let scoresStore: ReturnType<typeof useScoresStore>;
  let gameStore: ReturnType<typeof useGameStore>;
  beforeEach(() => {
    setActivePinia(createPinia());
    scoresStore = useScoresStore();
    gameStore = useGameStore();
    scoresStore.reset();
    gameStore.reset();
  });
  describe('initials store state', () => {
    it('Should have initial state', () => {
      const { game } = gameStore;

      expect(game).toStrictEqual({ currentAttempt: 0, theme: 'classic' });
    });
  });
  describe('gameIsFinished', () => {
    it('Should return false if some score is undefined', () => {
      scoresStore.$patch({
        scores: {
          die1: 3,
          die2: 6,
          die3: undefined,
          die4: undefined,
          die5: 10,
          die6: 12,
          chance: 12,
          threeOfAKind: 12,
          fourOfAKind: 12,
          fullHouse: undefined,
          smallStraight: undefined,
          largeStraight: undefined,
          yams: undefined,
        },
      });

      expect(gameStore.isGameFinished).toBe(false);
    });
    it('Should return true if all scores are defined', () => {
      scoresStore.$patch({
        scores: {
          die1: 3,
          die2: 6,
          die3: 0,
          die4: 0,
          die5: 10,
          die6: 12,
          chance: 12,
          threeOfAKind: 12,
          fourOfAKind: 12,
          fullHouse: 0,
          smallStraight: 0,
          largeStraight: 0,
          yams: 0,
        },
      });

      expect(gameStore.isGameFinished).toBe(true);
    });
  });
  describe('canRoll', () => {
    it('Should be true if game is not finished and there are attempts left', () => {
      gameStore.$patch({ game: { currentAttempt: 2 } });
      expect(gameStore.canRoll).toBe(true);
    });
    it('Should be true if game is not finished and there are no attempts left', () => {
      gameStore.$patch({ game: { currentAttempt: 3 } });
      expect(gameStore.canRoll).toBe(false);
    });
    it('Should be false if game is finished and there are attempts left', () => {
      gameStore.$patch({ game: { currentAttempt: 2 } });
      scoresStore.$patch({
        scores: {
          die1: 3,
          die2: 6,
          die3: 0,
          die4: 0,
          die5: 10,
          die6: 12,
          chance: 12,
          threeOfAKind: 12,
          fourOfAKind: 12,
          fullHouse: 0,
          smallStraight: 0,
          largeStraight: 0,
          yams: 0,
        },
      });
      expect(gameStore.canRoll).toBe(false);
    });
  });
});
