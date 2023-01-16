import { describe, it, expect } from 'vitest';
import Scores from '../Scores';

describe('Scores.ts', () => {
  describe('sortDice', () => {
    it('Should sort the dice', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      const result = scores.sortDice();
      expect(result).toStrictEqual([1, 3, 4, 4, 6]);
    });
  });
  describe('addDice', () => {
    it('Should add all dice', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      const result = scores.addDice();
      expect(result).toBe(18);
    });
  });
  describe('removeDuplicates', () => {
    it('Should remove duplicates', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      const result = scores.removeDuplicates();
      expect(result).toStrictEqual([1, 3, 4, 6]);
    });
  });
  describe('countOccurrences', () => {
    it('Should count dice occurrences', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      const result = scores.countOccurrences();
      expect(result).toStrictEqual({
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
      expect(scores.getTotal(2)).toBe(0);
      expect(scores.getTotal(3)).toBe(3);
      expect(scores.getTotal(4)).toBe(8);
      expect(scores.getTotal(5)).toBe(0);
      expect(scores.getTotal(6)).toBe(6);
    });
  });
  describe('isThreeOfAKind', () => {
    it('Should return false if not Three Of A Kind', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      const result = scores.getThreeOfAKind();
      expect(result).toBeFalsy();
    });
    it('Should return true if Three Of A Kind', () => {
      const scores = new Scores([4, 3, 6, 4, 4]);
      const result = scores.getThreeOfAKind();
      expect(result).toBeTruthy();
    });
  });
  describe('isFourOfAKind', () => {
    it('Should return false if not Four Of A Kind', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      expect(scores.fourOfAKind).toBe(0);
    });
    it('Should return true if Four Of A Kind', () => {
      const scores = new Scores([4, 3, 4, 4, 4]);
      expect(scores.fourOfAKind).toBe(19);
    });
  });
  describe('isFullHouse', () => {
    it('Should return false if not Full House', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      expect(scores.fullHouse).toBe(0);
    });
    it('Should return true if Full House', () => {
      const scores = new Scores([4, 3, 4, 4, 3]);
      expect(scores.fullHouse).toBe(25);
    });
  });
  describe('isYams', () => {
    it('Should return false if not Yams', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      expect(scores.yams).toBe(0);
    });
    it('Should return true if Yams', () => {
      const scores = new Scores([4, 4, 4, 4, 4]);
      expect(scores.yams).toBe(50);
    });
  });
  describe('isSmallStraight', () => {
    it('Should return false if not Small Straight', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      expect(scores.smallStraight).toBe(0);
    });
    it('Should return true if Small Straight', () => {
      const scores = new Scores([4, 2, 5, 5, 3]);
      expect(scores.smallStraight).toBe(30);
    });
  });
  describe('isLargeStraight', () => {
    it('Should return false if not Large Straight', () => {
      const scores = new Scores([1, 3, 6, 4, 4]);
      expect(scores.largeStraight).toBe(0);
    });
    it('Should return true if Large Straight', () => {
      const scores = new Scores([4, 2, 5, 6, 3]);
      expect(scores.largeStraight).toBe(40);
    });
  });
});
