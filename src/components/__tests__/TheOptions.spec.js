import {
  describe, it, expect, beforeAll, vi, afterEach,
} from 'vitest';

import { shallowMount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import TheOptions from '../TheOptions.vue';
import useGameStore from '../../stores/game';

describe('TheOptions', () => {
  let gameStore;
  beforeAll(() => {
    setActivePinia(createPinia());
    gameStore = useGameStore();
    gameStore.reset();
    vi.spyOn(gameStore, 'saveTheme');
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  describe('Integration test', () => {
    let wrapper;
    it('should correctly mount initial state', () => {
      wrapper = shallowMount(TheOptions);
      expect(wrapper.html()).toMatchSnapshot();
    });
    it('should correctly render theme selection', async () => {
      await wrapper.find('.cta').trigger('click');
      expect(wrapper.html()).toMatchSnapshot();
    });
    it('choosing a theme should save it to the store', async () => {
      await wrapper.find('.theme-classic').trigger('click');
      expect(gameStore.saveTheme).toHaveBeenCalledWith('classic');
    });
  });
});
