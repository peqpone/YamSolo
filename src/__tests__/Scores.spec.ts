import { describe, it, expect } from 'vitest';
import Scores from '../Scores';

describe('Scores.ts', () => {
  describe('sortedDice/sortDice()', () => {
    it('Should sort the dice', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      expect(scores.sortedDice).toStrictEqual([1, 3, 4, 4, 6]);
    });
  });
  describe('diceSum/addDice()', () => {
    it('Should add all dice', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      expect(scores.diceSum).toBe(18);
    });
  });
  describe('uniqueDice/removeDuplicates', () => {
    it('Should remove duplicates', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      expect(scores.uniqueDice).toStrictEqual([1, 3, 4, 6]);
    });
  });
  describe('diceOccurrences/countOccurrences()', () => {
    it('Should count dice occurrences', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      expect(scores.diceOccurrences).toStrictEqual({
        1: 1,
        3: 1,
        4: 2,
        6: 1,
      });
    });
  });
  describe('computeTotal', () => {
    it('Should compute total dice occurrences', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      expect(scores.getTotal(1)).toBe(1);
      expect(scores.getTotal(2)).toBe(undefined);
      expect(scores.getTotal(3)).toBe(3);
      expect(scores.getTotal(4)).toBe(8);
      expect(scores.getTotal(5)).toBe(undefined);
      expect(scores.getTotal(6)).toBe(6);
    });
  });
  describe('isThreeOfAKind', () => {
    it('Should return false if not Three Of A Kind', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      expect(scores.threeOfAKind).toBe(undefined);
    });
    it('Should return true if Three Of A Kind', () => {
      const scores = new Scores([4, 3, 6, 4, 4]);
      expect(scores.threeOfAKind).toBe(21);
    });
  });
  describe('isFourOfAKind', () => {
    it('Should return false if not Four Of A Kind', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      expect(scores.fourOfAKind).toBe(undefined);
    });
    it('Should return true if Four Of A Kind', () => {
      const scores = new Scores([4, 3, 4, 4, 4]);
      expect(scores.fourOfAKind).toBe(19);
      expect(scores.threeOfAKind).toBe(19);
    });
  });
  describe('isFullHouse', () => {
    it('Should return false if not Full House', () => {
      const scores = new Scores([4, 3, 6, 4, 4]);
      expect(scores.fullHouse).toBe(undefined);
    });
    it('Should return true if Full House', () => {
      const scores = new Scores([4, 3, 4, 4, 3]);
      expect(scores.fullHouse).toBe(25);
      expect(scores.threeOfAKind).toBe(18);
    });
  });
  describe('isYams', () => {
    it('Should return false if not Yams', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      expect(scores.yams).toBe(undefined);
    });
    it('Should return true if Yams', () => {
      const scores = new Scores([4, 4, 4, 4, 4]);
      expect(scores.yams).toBe(50);
      expect(scores.fullHouse).toBe(25);
      expect(scores.fourOfAKind).toBe(20);
      expect(scores.threeOfAKind).toBe(20);
    });
  });
  describe('isSmallStraight', () => {
    it('Should return false if not Small Straight', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      expect(scores.smallStraight).toBe(undefined);
    });
    it('Should return true if Small Straight', () => {
      const scores = new Scores([4, 2, 5, 5, 3]);
      expect(scores.smallStraight).toBe(30);
    });
  });
  describe('isLargeStraight', () => {
    it('Should return false if not Large Straight', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      expect(scores.largeStraight).toBe(undefined);
    });
    it('Should return true if Large Straight', () => {
      const scores = new Scores([4, 2, 5, 6, 3]);
      expect(scores.largeStraight).toBe(40);
    });
  });
});
