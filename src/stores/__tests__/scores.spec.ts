import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import useScoresStore from '../scores';

describe('store/scores', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  describe('initials store state', () => {
    it('Should have initial state duplicates', () => {
      const scoresStore = useScoresStore();
      const { scores } = scoresStore;

      expect(scores).toStrictEqual({
        1: undefined,
        2: undefined,
        3: undefined,
        4: undefined,
        5: undefined,
        6: undefined,
        chance: undefined,
        threeOfAKind: undefined,
        fourOfAKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yams: undefined,
      });
    });
  });
  describe('saveScore', () => {
    let scoresStore:ReturnType<typeof useScoresStore>;
    beforeEach(() => {
      scoresStore = useScoresStore();
    });
    it('Should save dice score', () => {
      scoresStore.saveScore(1, 6);
      expect(scoresStore.scores[1]).toBe(6);
    });
    it('Should save other score', () => {
      scoresStore.saveScore('threeOfAKind', 40);
      expect(scoresStore.scores.threeOfAKind).toBe(40);
    });
  });
  describe('diceScores', () => {
    it('Should return only dice scores', () => {
      const scoresStore = useScoresStore();
      scoresStore.$patch({
        scores: {
          1: 1, 2: 4, 4: 4, threeOfAKind: 40,
        },
      });
      expect(scoresStore.diceScores).toStrictEqual([1, 4, undefined, 4, undefined, undefined]);
    });
  });
  describe('sumOfDice', () => {
    it('Should return the sum on dice scores only', () => {
      const scoresStore = useScoresStore();
      scoresStore.$patch({
        scores: {
          1: 1, 2: 4, 4: 4, threeOfAKind: 40,
        },
      });
      expect(scoresStore.sumOfDice).toBe(9);
    });
  });
  describe('bonus', () => {
    it('Should be 36 if the sum on dice scores is greater than 62', () => {
      const scoresStore = useScoresStore();
      scoresStore.$patch({
        scores: {
          1: 3, 2: 6, 3: 9, 4: 12, 5: 15, 6: 18, threeOfAKind: 40,
        },
      });
      expect(scoresStore.bonus).toBe(35);
    });
    it('Should be 0 if the sum on dice scores is smaller than 63', () => {
      const scoresStore = useScoresStore();
      scoresStore.$patch({
        scores: {
          1: 3, 2: undefined, 3: 9, 4: 12, 5: 15, 6: 18, threeOfAKind: 40,
        },
      });
      expect(scoresStore.bonus).toBe(0);
    });
  });
  describe('grandTotal', () => {
    it('Should compute the grand total', () => {
      const scoresStore = useScoresStore();
      scoresStore.$patch({
        scores: {
          1: 3, 2: 6, 3: 9, 4: 12, 5: 15, 6: 18, threeOfAKind: 40,
        },
      });
      expect(scoresStore.grandTotal).toBe(103);
    });
    it('Should be 0 at the beginning of the game', () => {
      const scoresStore = useScoresStore();
      scoresStore.reset();
      expect(scoresStore.grandTotal).toBe(0);
    });
  });
});
