type Dice<T = number> = Array<T>;
type DiceOccurrences = { [x:number]: number };
type Scores = {
  1: number,
  2: number,
  3: number,
  4: number,
  5: number,
  6: number,
  threeOfAKind: number,
  fourOfAKind: number,
  fullHouse: number,
  smallStraight: number,
  largeStraight: number,
  yams: number,
  chance: number,
};
type Game = {
  currentAttempt: number,
};
