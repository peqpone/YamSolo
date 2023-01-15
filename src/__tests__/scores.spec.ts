import { describe, it, expect } from 'vitest';
import scores from '../scores';

describe('scores.ts', () => {
  describe('sortDice', () => {
    it('Should sort the dice', () => {
      const dice = [1, 3, 6, 4, 4];
      const result = scores.sortDice(dice);
      expect(result).toStrictEqual([1, 3, 4, 4, 6]);
    });
  });
  describe('addDice', () => {
    it('Should add all dice', () => {
      const dice = [1, 3, 6, 4, 4];
      const result = scores.addDice(dice);
      expect(result).toBe(18);
    });
  });
  describe('removeDuplicates', () => {
    it('Should remove duplicates', () => {
      const dice = [1, 3, 6, 4, 4];
      const result = scores.removeDuplicates(dice);
      expect(result).toStrictEqual([1, 3, 4, 6]);
    });
  });
  describe('countOccurrences', () => {
    it('Should count dice occurrences', () => {
      const dice = [1, 3, 6, 4, 4];
      const result = scores.countOccurrences(dice);
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
      const dice = [1, 3, 6, 4, 4];
      expect(scores.computeTotal(dice, 1)).toBe(1);
      expect(scores.computeTotal(dice, 2)).toBe(0);
      expect(scores.computeTotal(dice, 3)).toBe(3);
      expect(scores.computeTotal(dice, 4)).toBe(8);
      expect(scores.computeTotal(dice, 5)).toBe(0);
      expect(scores.computeTotal(dice, 6)).toBe(6);
    });
  });
  describe('isThreeOfAKind', () => {
    it('Should return false if not Three Of A Kind', () => {
      const dice = [1, 3, 6, 4, 4];
      const result = scores.isThreeOfAKind(dice);
      expect(result).toBeFalsy();
    });
    it('Should return true if Three Of A Kind', () => {
      const dice = [4, 3, 6, 4, 4];
      const result = scores.isThreeOfAKind(dice);
      expect(result).toBeTruthy();
    });
  });
  describe('isFourOfAKind', () => {
    it('Should return false if not Four Of A Kind', () => {
      const dice = [1, 3, 6, 4, 4];
      const result = scores.isFourOfAKind(dice);
      expect(result).toBeFalsy();
    });
    it('Should return true if Four Of A Kind', () => {
      const dice = [4, 3, 4, 4, 4];
      const result = scores.isFourOfAKind(dice);
      expect(result).toBeTruthy();
    });
  });
  describe('isFullHouse', () => {
    it('Should return false if not Full House', () => {
      const dice = [1, 3, 6, 4, 4];
      const result = scores.isFullHouse(dice);
      expect(result).toBeFalsy();
    });
    it('Should return true if Full House', () => {
      const dice = [4, 3, 4, 4, 3];
      const result = scores.isFullHouse(dice);
      expect(result).toBeTruthy();
    });
  });
  describe('isYams', () => {
    it('Should return false if not Yams', () => {
      const dice = [1, 3, 6, 4, 4];
      const result = scores.isYams(dice);
      expect(result).toBeFalsy();
    });
    it('Should return true if Yams', () => {
      const dice = [4, 4, 4, 4, 4];
      const result = scores.isYams(dice);
      expect(result).toBeTruthy();
    });
  });
  describe('isSmallStraight', () => {
    it('Should return false if not Small Straight', () => {
      const dice = [1, 3, 6, 4, 4];
      const result = scores.isSmallStraight(dice);
      expect(result).toBeFalsy();
    });
    it('Should return true if Small Straight', () => {
      const dice = [4, 2, 5, 5, 3];
      const result = scores.isSmallStraight(dice);
      expect(result).toBeTruthy();
    });
  });
  describe('isLargeStraight', () => {
    it('Should return false if not Large Straight', () => {
      const dice = [1, 3, 6, 4, 4];
      const result = scores.isLargeStraight(dice);
      expect(result).toBeFalsy();
    });
    it('Should return true if Large Straight', () => {
      const dice = [4, 2, 5, 6, 3];
      const result = scores.isLargeStraight(dice);
      expect(result).toBeTruthy();
    });
  });
});
