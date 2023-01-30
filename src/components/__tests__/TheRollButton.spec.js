import {
  describe, it, expect, beforeAll, vi, afterEach,
} from 'vitest';

import { shallowMount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import TheRollButton from '../TheRollButton.vue';
import useDiceStore from '../../stores/dice';
import useGameStore from '../../stores/game';

describe('TheRollButton', () => {
  let diceStore;
  let gameStore;
  beforeAll(() => {
    setActivePinia(createPinia());
    diceStore = useDiceStore();
    gameStore = useGameStore();
    diceStore.reset();
    gameStore.reset();
    vi.spyOn(diceStore, 'saveDice');
    vi.spyOn(gameStore, 'increaseAttempts');
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  describe('Integration test', () => {
    let wrapper;
    it('should correctly mount initial state', () => {
      wrapper = shallowMount(TheRollButton);
      expect(wrapper.html()).toMatchSnapshot();
    });
    it('should disable the button', async () => {
      await gameStore.$patch({ game: { currentAttempt: 3 } });
      expect(wrapper.html()).toMatchSnapshot();
    });
    it('click on the button should not roll the dices', async () => {
      const button = wrapper.find('.main-cta a');
      await button.trigger('click');
      expect(diceStore.saveDice).not.toHaveBeenCalled();
      expect(gameStore.increaseAttempts).not.toHaveBeenCalled();
    });
    it('click on the button should save dice and increase attempts counter', async () => {
      await gameStore.$patch({ game: { currentAttempt: 1 } });
      const button = wrapper.find('.main-cta a');
      await button.trigger('click');
      expect(diceStore.saveDice).toHaveBeenCalledWith([
        { isLocked: false, value: expect.any(Number) },
        { isLocked: false, value: expect.any(Number) },
        { isLocked: false, value: expect.any(Number) },
        { isLocked: false, value: expect.any(Number) },
        { isLocked: false, value: expect.any(Number) },
      ]);
      expect(gameStore.increaseAttempts).toHaveBeenCalled();
    });
    it('click on the button should save dice and increase attempts counter', async () => {
      await gameStore.$patch({ game: { currentAttempt: 1 } });
      await diceStore.$patch({
        rawDice: [
          { value: 1, isLocked: false },
          { value: 1, isLocked: true },
          { value: 1, isLocked: false },
          { value: 1, isLocked: true },
          { value: 1, isLocked: false },
        ],
      });
      const button = wrapper.find('.main-cta a');
      await button.trigger('click');
      expect(diceStore.saveDice).toHaveBeenCalledWith([
        { isLocked: false, value: expect.any(Number) },
        { isLocked: true, value: 1 },
        { isLocked: false, value: expect.any(Number) },
        { isLocked: true, value: 1 },
        { isLocked: false, value: expect.any(Number) },
      ]);
      expect(gameStore.increaseAttempts).toHaveBeenCalled();
    });
  });
});
