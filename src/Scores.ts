export default class {
  dice:Dice;

  sortedDice:Dice;

  uniqueDice:Dice;

  diceOccurrences:DiceOccurrences;

  diceSum:number;

  chance:number | undefined;

  die1:number;

  die2:number;

  die3:number;

  die4:number;

  die5:number;

  die6:number;

  threeOfAKind:undefined | number;

  fourOfAKind:undefined | number;

  fullHouse:undefined | 25;

  yams:undefined | 50;

  smallStraight:undefined | 30;

  largeStraight:undefined | 40;

  constructor(dice:Dice) {
    this.dice = dice;
    this.sortedDice = this.sortDice();
    this.uniqueDice = this.removeDuplicates;
    this.diceSum = this.addDice;
    this.chance = this.getChance;
    this.diceOccurrences = this.countOccurrences;
    this.die1 = this.getTotal(1);
    this.die2 = this.getTotal(2);
    this.die3 = this.getTotal(3);
    this.die4 = this.getTotal(4);
    this.die5 = this.getTotal(5);
    this.die6 = this.getTotal(6);
    this.threeOfAKind = this.getThreeOfAKind;
    this.fourOfAKind = this.getFourOfAKind;
    this.fullHouse = this.getFullHouse;
    this.yams = this.getYams;
    this.smallStraight = this.getSmallStraight;
    this.largeStraight = this.getLargeStraight;
  }

  sortDice(dice:Dice = this.dice):Dice {
    return dice.sort((a, b) => a - b);
  }

  get addDice():number {
    return this.dice.reduce((a, b) => a + b, 0);
  }

  get removeDuplicates():Dice {
    return this.sortDice([...new Set(this.dice)]);
  }

  get countOccurrences():DiceOccurrences {
    return this.sortedDice.reduce(
      (result:DiceOccurrences, die) => ({ ...result, [die]: (result[die] || 0) + 1 }),
      {},
    );
  }

  getTotal(diceToCompute:number):number {
    return Object.fromEntries(
      Object.entries(this.diceOccurrences)
        .map(([index, value]) => [Number(index), Number(index) * value]),
    )[diceToCompute];
  }

  get lookForStraights():Array<boolean> {
    return this.uniqueDice
      .map((die, index, sortedDice) => {
        if (index !== sortedDice.length - 1) {
          return die + 1 === sortedDice[index + 1];
        }
        return true;
      });
  }

  get getThreeOfAKind():undefined | number {
    return Object.values(this.diceOccurrences).includes(3)
      ? this.diceSum
      : undefined;
  }

  get getFourOfAKind():undefined | number {
    return Object.values(this.diceOccurrences).includes(4)
      ? this.diceSum
      : undefined;
  }

  get getFullHouse():undefined | 25 {
    return Object.values(this.diceOccurrences).includes(3)
    && Object.values(this.diceOccurrences).includes(2)
      ? 25
      : undefined;
  }

  get getYams():undefined | 50 {
    return Object.values(this.diceOccurrences).includes(5)
      ? 50
      : undefined;
  }

  get getSmallStraight():undefined | 30 {
    const isSmallStraight = this.lookForStraights;
    return isSmallStraight.every(Boolean)
        && isSmallStraight.length >= 4
      ? 30
      : undefined;
  }

  get getLargeStraight():undefined | 40 {
    const isLargeStraight = this.lookForStraights;
    return isLargeStraight.every(Boolean)
        && isLargeStraight.length === 5
      ? 40
      : undefined;
  }

  get getChance():number | undefined {
    return this.diceSum || undefined;
  }
}
