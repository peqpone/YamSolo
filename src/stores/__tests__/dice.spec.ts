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
  describe('toggleLock', () => {
    it('Should toggle isLocked property of dice', () => {
      const diceStore = useDiceStore();
      diceStore.$patch({
        rawDice: [
          { value: 1, isLocked: true },
        ],
      });

      diceStore.toggleLock(0);

      expect(diceStore.rawDice[0].isLocked).toBe(false);
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
  describe('saveDice', () => {
    it('Should save dice', () => {
      const diceStore = useDiceStore();
      const dice = [{ value: 1, isLocked: true }];
      diceStore.saveDice(dice);

      expect(diceStore.dice).toStrictEqual([1]);
      expect(diceStore.rawDice).toStrictEqual(dice);
    });
  });
});
