import { slurp, mod } from "./util";
import { strict as assert } from "assert";
import baretest from "baretest";
const test = baretest("aoc");

type Deck = number[];
type State = Deck[];

function parse(s: string): State {
  return s.split(/\n\n/).map(l =>
    l
      .split(/\n/)
      .slice(1)
      .map(s => parseInt(s))
  );
}

function winner(stacks: State): number {
  if (stacks[0].length === 0) return 1;
  if (stacks[1].length === 0) return 0;
  throw "We should never get here";
}

function next(decks: State): State {
  if (false) {
    // FIXME: first rule
  } else {
    let newDecks: State;
    let a = decks[0][0];
    let b = decks[1][0];

    if (decks[0].length > a && decks[1].length > b) {
      // recursive game
      let result = solve([decks[0].slice(1, 1 + a), decks[1].slice(1, 1 + b)]);
      if (winner(result) === 0) {
        // first player wins
        newDecks = [[...decks[0].slice(1), a, b], decks[1].slice(1)];
      } else {
        newDecks = [decks[0].slice(1), [...decks[1].slice(1), b, a]];
      }
    } else {
      if (a > b) {
        // first player wins
        newDecks = [[...decks[0].slice(1), a, b], decks[1].slice(1)];
      } else {
        newDecks = [decks[0].slice(1), [...decks[1].slice(1), b, a]];
      }
    }
    return newDecks;
  }
}

function score(stack: number[]): number {
  let sum = 0;
  for (let i = stack.length - 1, mult = 1; i >= 0; i--, mult++) {
    sum += mult * stack[i];
  }
  return sum;
}

function solve(world: State): State {
  while (world[0].length > 0 && world[1].length > 0) {
    world = next(world);
  }
  return world;
}

export async function run() {
  var text: string = await slurp("data/day22a.txt");
  var world = parse(text);

  solve(world);
}
