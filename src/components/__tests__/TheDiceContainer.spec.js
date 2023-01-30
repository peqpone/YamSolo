import {
  describe, it, expect, beforeAll, vi,
} from 'vitest';

import { shallowMount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import TheDiceContainer from '../TheDiceContainer.vue';
import useDiceStore from '../../stores/dice';

describe('TheDiceContainer', () => {
  let diceStore;
  beforeAll(() => {
    setActivePinia(createPinia());
    Math.random = vi.fn(() => 1);
    diceStore = useDiceStore();
  });
  describe('Integration test', () => {
    let wrapper;
    it('should correctly mount initial state', () => {
      diceStore.$patch({
        rawDice: [
          { value: 1, isLocked: false },
          { value: 1, isLocked: false },
          { value: 1, isLocked: false },
          { value: 1, isLocked: false },
          { value: 1, isLocked: false },
        ],
      });
      wrapper = shallowMount(TheDiceContainer);
      expect(wrapper.html()).toMatchSnapshot();
    });
    it('click on a die should lock it', async () => {
      const die = wrapper.find('[dieid="0"]');
      await die.trigger('click');
      expect(diceStore.rawDice[0].isLocked).toBe(true);
    });
  });
});
