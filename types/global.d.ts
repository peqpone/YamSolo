type Dice<T = number> = Array<T>;
type Die<T = number> = { isLocked: boolean, value: T };
type RawDice<T = number> = Array<Die<T>>;

type DiceOccurrences = { [x:number]: number };
type Scores = {
  die1: number,
  die2: number,
  die3: number,
  die4: number,
  die5: number,
  die6: number,
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
  theme: string,
};
