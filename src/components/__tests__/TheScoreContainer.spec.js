import {
  describe, it, expect, beforeAll, beforeEach, vi,
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
    vi.spyOn(console, 'debug');
  });
  beforeEach(() => {
    scoresStore = useScoresStore();
    diceStore = useDiceStore();
    scoresStore.reset();
    diceStore.reset();
    console.debug.mockClear();
  });
  describe('diceToRender', () => {
    it('should have initial state', () => {
      const wrapper = mount(TheScoreContainer);
      expect(wrapper.vm.diceToRender).toStrictEqual([
        {
          label: '1',
          scoreName: 'die1',
          value: undefined,
        },
        {
          label: '2',
          scoreName: 'die2',
          value: undefined,
        },
        {
          label: '3',
          scoreName: 'die3',
          value: undefined,
        },
        {
          label: '4',
          scoreName: 'die4',
          value: undefined,
        },
        {
          label: '5',
          scoreName: 'die5',
          value: undefined,
        },
        {
          label: '6',
          scoreName: 'die6',
          value: undefined,
        },
      ]);
    });
    it('should take values from the store', () => {
      scoresStore.$patch({
        scores: {
          die1: 1,
          die2: 4,
          die4: 4,
          threeOfAKind: 40,
        },
      });
      const wrapper = mount(TheScoreContainer);
      expect(wrapper.vm.diceToRender).toStrictEqual([
        {
          label: '1',
          scoreName: 'die1',
          value: 1,
        },
        {
          label: '2',
          scoreName: 'die2',
          value: 4,
        },
        {
          label: '3',
          scoreName: 'die3',
          value: undefined,
        },
        {
          label: '4',
          scoreName: 'die4',
          value: 4,
        },
        {
          label: '5',
          scoreName: 'die5',
          value: undefined,
        },
        {
          label: '6',
          scoreName: 'die6',
          value: undefined,
        },
      ]);
    });
    it('should take values from the store and current dice', () => {
      scoresStore.$patch({
        scores: {
          die1: 1,
          die2: 4,
          die4: 4,
          threeOfAKind: 40,
        },
      });
      diceStore.$patch({
        rawDice: [
          { value: 3 }, { value: 3 }, { value: 3 }, { value: 1 }, { value: 2 },
        ],
      });
      const wrapper = mount(TheScoreContainer);
      expect(wrapper.vm.diceToRender).toStrictEqual([
        {
          label: '1',
          scoreName: 'die1',
          value: 1,
        },
        {
          label: '2',
          scoreName: 'die2',
          value: 4,
        },
        {
          label: '3',
          scoreName: 'die3',
          value: 9,
        },
        {
          label: '4',
          scoreName: 'die4',
          value: 4,
        },
        {
          label: '5',
          scoreName: 'die5',
          value: undefined,
        },
        {
          label: '6',
          scoreName: 'die6',
          value: undefined,
        },
      ]);
    });
  });
  describe('saveScore', () => {
    beforeEach(() => {
      scoresStore.$patch({
        scores: {
          die1: 1,
          die2: 4,
          die4: 4,
          threeOfAKind: 0,
        },
      });
    });
    it('Should not save already stored scores', () => {
      const wrapper = mount(TheScoreContainer);
      wrapper.vm.saveScore(3, 'die1');
      expect(console.debug).toHaveBeenCalledWith('A score for die1 has already been saved (1)');
      expect(scoresStore.scores.die1).toBe(1);
    });
    it('Should not save already stored scores even if zero (non-reg)', () => {
      const wrapper = mount(TheScoreContainer);
      wrapper.vm.saveScore(40, 'threeOfAKind');
      expect(console.debug).toHaveBeenCalledWith('A score for threeOfAKind has already been saved (0)');
      expect(scoresStore.scores.threeOfAKind).toBe(0);
    });
    it('Should save a new score', () => {
      const wrapper = mount(TheScoreContainer);
      wrapper.vm.saveScore(40, 'fourOfAKind');
      expect(console.debug).not.toHaveBeenCalledWith('A score for fourOfAKind has already been saved (undefined)');
      expect(scoresStore.scores.fourOfAKind).toBe(40);
    });
  });
  describe('scoresToRender', () => {
    it('should have initial state', () => {
      const wrapper = mount(TheScoreContainer);
      expect(wrapper.vm.scoresToRender).toStrictEqual({
        chance: {
          label: 'chance',
          scoreName: 'chance',
          value: undefined,
        },
        fourOfAKind: {
          label: '4 of a K',
          scoreName: 'fourOfAKind',
          value: undefined,
        },
        fullHouse: {
          label: 'fullHouse',
          scoreName: 'fullHouse',
          value: undefined,
        },
        largeStraight: {
          label: 'STRAIGHT',
          scoreName: 'largeStraight',
          value: undefined,
        },
        smallStraight: {
          label: 'straight',
          scoreName: 'smallStraight',
          value: undefined,
        },
        threeOfAKind: {
          label: '3 of a K',
          scoreName: 'threeOfAKind',
          value: undefined,
        },
        yams: {
          label: 'yams',
          scoreName: 'yams',
          value: undefined,
        },
      });
    });
    it('should take values from the store', () => {
      scoresStore.$patch({
        scores: {
          1: 1,
          threeOfAKind: 40,
        },
      });
      const wrapper = mount(TheScoreContainer);
      expect(wrapper.vm.scoresToRender).toEqual(
        expect.objectContaining({
          threeOfAKind: {
            label: '3 of a K',
            scoreName: 'threeOfAKind',
            value: 40,
          },
        }),
      );
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
      diceStore.$patch({
        rawDice: [
          { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 2 },
        ],
      });
      const wrapper = mount(TheScoreContainer);
      expect(wrapper.vm.scoresToRender).toEqual(
        expect.objectContaining({
          chance: {
            label: 'chance',
            scoreName: 'chance',
            value: 12,
          },
          smallStraight: {
            label: 'straight',
            scoreName: 'smallStraight',
            value: 30,
          },
          threeOfAKind: {
            label: '3 of a K',
            scoreName: 'threeOfAKind',
            value: 40,
          },
        }),
      );
    });
  });
});
