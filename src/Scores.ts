type Dice = Array<number>;
type DiceOccurrences = { [x:number]: number };

export default class {
  dice:Dice;

  sortedDice:Dice;

  uniqueDice:Dice;

  diceOccurrences:DiceOccurrences;

  diceSum:number;

  threeOfAKind:number;

  fourOfAKind:number;

  fullHouse: 0 | 25;

  yams: 0 | 50;

  smallStraight:0 | 30;

  largeStraight:0 | 40;

  constructor(dice:Dice) {
    this.dice = dice;
    this.sortedDice = this.sortDice();
    this.uniqueDice = this.removeDuplicates();
    this.diceSum = this.addDice();
    this.diceOccurrences = this.countOccurrences();
    this.threeOfAKind = this.getThreeOfAKind();
    this.fourOfAKind = this.getFourOfAKind();
    this.fullHouse = this.getFullHouse();
    this.yams = this.getYams();
    this.smallStraight = this.getSmallStraight();
    this.largeStraight = this.getLargeStraight();
  }

  sortDice(dice:Dice = this.dice):Dice {
    return dice.sort((a, b) => a - b);
  }

  addDice():number {
    return this.dice.reduce((a, b) => a + b);
  }

  removeDuplicates(dice:Dice = this.dice):Dice {
    return this.sortDice([...new Set(dice)]);
  }

  countOccurrences():DiceOccurrences {
    const result:DiceOccurrences = {};
    this.sortedDice
      .forEach((die) => {
        result[die] = result[die] ? result[die] + 1 : 1;
      });
    return result;
  }

  getTotal(diceToCompute:number):number {
    const totals:DiceOccurrences = {};
    Object.entries(this.diceOccurrences)
      .forEach(([index, value]) => {
        const numberIndex = Number(index);
        totals[numberIndex] = numberIndex * value;
      });
    return totals[diceToCompute] || 0;
  }

  lookForStraights():Array<boolean> {
    return this.uniqueDice
      .map((die, index, sortedDice) => {
        if (index !== sortedDice.length - 1) {
          return die + 1 === sortedDice[index + 1];
        }
        return true;
      });
  }

  getThreeOfAKind():number {
    return Object.values(this.diceOccurrences).includes(3)
      ? this.diceSum
      : 0;
  }

  getFourOfAKind():number {
    return Object.values(this.diceOccurrences).includes(4)
      ? this.diceSum
      : 0;
  }

  getFullHouse():0 | 25 {
    return Object.values(this.diceOccurrences).includes(3)
    && Object.values(this.diceOccurrences).includes(2)
      ? 25
      : 0;
  }

  getYams():0 | 50 {
    return Object.values(this.diceOccurrences).includes(5)
      ? 50
      : 0;
  }

  getSmallStraight():0 | 30 {
    const isSmallStraight = this.lookForStraights();
    return isSmallStraight.every(Boolean)
        && isSmallStraight.length >= 4
      ? 30
      : 0;
  }

  getLargeStraight():0 | 40 {
    const isLargeStraight = this.lookForStraights();
    return isLargeStraight.every(Boolean)
        && isLargeStraight.length === 5
      ? 40
      : 0;
  }
}
