type Dice = Array<number>;
type DiceOccurrences = { [x:number]: number };

export default {
  sortDice(dice:Dice):Dice {
    return dice.sort((a, b) => a - b);
  },
  addDice(dice:Dice):number {
    return dice.reduce((a, b) => a + b);
  },
  removeDuplicates(dice:Dice):Dice {
    return this.sortDice([...new Set(dice)]);
  },
  countOccurrences(dice:Dice):DiceOccurrences {
    const result:DiceOccurrences = {};
    this.sortDice(dice)
      .forEach((die) => {
        result[die] = result[die] ? result[die] + 1 : 1;
      });
    return result;
  },
  computeTotal(dice:Dice, diceToCompute:number):number {
    const occurrences = this.countOccurrences(dice);
    const totals:DiceOccurrences = {};
    Object.entries(occurrences).forEach(([index, value]) => {
      const numberIndex = Number(index);
      totals[numberIndex] = numberIndex * value;
    });
    return totals[diceToCompute] || 0;
  },
  lookForStraights(dice:Dice):Array<boolean> {
    return this.removeDuplicates(dice)
      .map((die, index, sortedDice) => {
        if (index !== sortedDice.length - 1) {
          return die + 1 === sortedDice[index + 1];
        }
        return true;
      });
  },
  isThreeOfAKind(dice:Dice):boolean {
    const occurrences = this.countOccurrences(dice);
    return Object.values(occurrences).includes(3);
  },
  isFourOfAKind(dice:Dice):boolean {
    const occurrences = this.countOccurrences(dice);
    return Object.values(occurrences).includes(4);
  },
  isFullHouse(dice:Dice):boolean {
    const occurrences = this.countOccurrences(dice);
    return Object.values(occurrences).includes(3) && Object.values(occurrences).includes(2);
  },
  isYams(dice:Dice):boolean {
    const occurrences = this.countOccurrences(dice);
    return Object.values(occurrences).includes(5);
  },
  isSmallStraight(dice:Dice):boolean {
    const isSmallStraight = this.lookForStraights(dice);
    return isSmallStraight.every(Boolean) && isSmallStraight.length >= 4;
  },
  isLargeStraight(dice:Dice):boolean {
    const isLargeStraight = this.lookForStraights(dice);
    return isLargeStraight.every(Boolean) && isLargeStraight.length === 5;
  },
};
