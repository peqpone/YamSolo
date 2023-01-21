import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import useDiceStore from '../dice';

describe('scores.ts', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  describe('uniqueDice', () => {
    it('Should remove duplicates', () => {
      const diceStore = useDiceStore();
      diceStore.$patch({ dice: [1, 3, 6, 4, 4] });

      expect(diceStore.uniqueDice).toStrictEqual([1, 3, 4, 6]);
    });
  });
  describe('diceOccurrences', () => {
    it('Should count dice occurrences', () => {
      const diceStore = useDiceStore();
      diceStore.$patch({ dice: [1, 3, 6, 4, 4] });

      expect(diceStore.diceOccurrences).toStrictEqual({
        1: 1,
        3: 1,
        4: 2,
        6: 1,
      });
    });
  });
  describe('getTotal', () => {
    it('Should compute total dice occurrences', () => {
      const diceStore = useDiceStore();
      diceStore.$patch({ dice: [1, 3, 6, 4, 4] });
      expect(diceStore.getTotal(1)).toBe(1);
      expect(diceStore.getTotal(2)).toBe(undefined);
      expect(diceStore.getTotal(3)).toBe(3);
      expect(diceStore.getTotal(4)).toBe(8);
      expect(diceStore.getTotal(5)).toBe(undefined);
      expect(diceStore.getTotal(6)).toBe(6);
    });
  });
});
