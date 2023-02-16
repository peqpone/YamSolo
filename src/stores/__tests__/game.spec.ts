import {
  describe, it, expect, beforeEach, vi, afterEach, beforeAll,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import useScoresStore from '../scores';
import useGameStore from '../game';
import useDiceStore from '../dice';

describe('store/game', () => {
  let scoresStore: ReturnType<typeof useScoresStore>;
  let gameStore: ReturnType<typeof useGameStore>;
  let diceStore: ReturnType<typeof useDiceStore>;
  beforeAll(() => {
    setActivePinia(createPinia());
    scoresStore = useScoresStore();
    gameStore = useGameStore();
    diceStore = useDiceStore();
  });
  beforeEach(() => {
    scoresStore.reset();
    gameStore.reset();
    diceStore.reset();
    vi.spyOn(console, 'debug');
  });
  afterEach(() => {
    // @ts-ignore
    console.debug.mockClear();
  });
  describe('initials store state', () => {
    it('Should have initial state', () => {
      const { game } = gameStore;

      expect(game).toStrictEqual({ currentAttempt: 0, theme: 'classic' });
    });
  });
  describe('increaseAttempts', () => {
    it('Should increase currentAttempt count', () => {
      const { game } = gameStore;

      gameStore.increaseAttempts();

      expect(game.currentAttempt).toBe(1);
    });
  });
  describe('increaseAttempts', () => {
    it('Should save a new theme', () => {
      const { game } = gameStore;

      gameStore.saveTheme('someTheme');

      expect(game.theme).toBe('someTheme');
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
    it('Should be true if no dice', () => {
      diceStore.$patch({
        rawDice: [],
      });
      expect(gameStore.canRoll).toBe(true);
    });
    it('Should be false if all dice are locked', () => {
      diceStore.$patch({
        rawDice: [
          { isLocked: true, value: 2 },
          { isLocked: true, value: 2 },
          { isLocked: true, value: 2 },
          { isLocked: true, value: 2 },
          { isLocked: true, value: 2 },
        ],
      });
      expect(gameStore.canRoll).toBe(false);
    });
  });

  describe('saveTheme', () => {
    it('Should save theme', () => {
      const { game } = gameStore;

      gameStore.saveTheme('someNewTheme');

      expect(game.theme).toBe('someNewTheme');
      expect(console.debug).toHaveBeenCalledWith('Use "someNewTheme" as theme');
    });
    it('Should not save theme if already set', () => {
      const { game } = gameStore;

      gameStore.saveTheme('someNewTheme');

      expect(game.theme).toBe('someNewTheme');
      expect(console.debug).toHaveBeenCalledWith('"someNewTheme" is already the chosen theme');
    });
  });
});
