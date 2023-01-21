import {
  describe, it, expect, beforeAll, beforeEach,
} from 'vitest';

import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import TheScoreContainer from '../TheScoreContainer.vue';
import useScoresStore from '../../stores/scores';
import useDiceStore from '../../stores/dice';

describe('TheScoreContainer', () => {
  let scoresStore;
  let diceStore;
  beforeAll(() => {
    setActivePinia(createPinia());
  });
  beforeEach(() => {
    scoresStore = useScoresStore();
    diceStore = useDiceStore();
    scoresStore.reset();
    diceStore.reset();
  });
  describe('diceToRender', () => {
    it('should have initial state', () => {
      const wrapper = mount(TheScoreContainer);
      expect(wrapper.vm.diceToRender).toStrictEqual([
        {
          value: undefined,
          label: 1,
        },
        {
          value: undefined,
          label: 2,
        },
        {
          value: undefined,
          label: 3,
        },
        {
          value: undefined,
          label: 4,
        },
        {
          value: undefined,
          label: 5,
        },
        {
          value: undefined,
          label: 6,
        },
      ]);
    });
    it('should take values from the store', () => {
      scoresStore.$patch({
        scores: {
          1: 1,
          2: 4,
          4: 4,
          threeOfAKind: 40,
        },
      });
      const wrapper = mount(TheScoreContainer);
      expect(wrapper.vm.diceToRender).toStrictEqual([
        {
          label: 1,
          value: 1,
        },
        {
          label: 2,
          value: 4,
        },
        {
          label: 3,
          value: undefined,
        },
        {
          label: 4,
          value: 4,
        },
        {
          label: 5,
          value: undefined,
        },
        {
          label: 6,
          value: undefined,
        },
      ]);
    });
    it('should take values from the store and current dice', () => {
      scoresStore.$patch({
        scores: {
          1: 1,
          2: 4,
          4: 4,
          threeOfAKind: 40,
        },
      });
      diceStore.$patch({ dice: [3, 3, 3, 1, 2] });
      const wrapper = mount(TheScoreContainer);
      expect(wrapper.vm.diceToRender).toStrictEqual([
        {
          label: 1,
          value: 1,
        },
        {
          label: 2,
          value: 4,
        },
        {
          label: 3,
          value: 9,
        },
        {
          label: 4,
          value: 4,
        },
        {
          label: 5,
          value: undefined,
        },
        {
          label: 6,
          value: undefined,
        },
      ]);
    });
  });
  describe.skip('saveScore', () => {});
});
