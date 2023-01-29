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
      diceStore.$patch({
        rawDice: [
          { value: 1 }, { value: 3 }, { value: 6 }, { value: 4 }, { value: 4 },
        ],
      });

      expect(diceStore.uniqueDice).toStrictEqual([1, 3, 4, 6]);
    });
  });
  describe('diceOccurrences', () => {
    it('Should count dice occurrences', () => {
      const diceStore = useDiceStore();
      diceStore.$patch({
        rawDice: [
          { value: 1 }, { value: 3 }, { value: 6 }, { value: 4 }, { value: 4 },
        ],
      });

      expect(diceStore.diceOccurrences).toStrictEqual({
        1: 1,
        3: 1,
        4: 2,
        6: 1,
      });
    });
  });
});
