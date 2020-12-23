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

function score(deck: Deck): number {
  let sum = 0;
  for (let i = deck.length - 1, mult = 1; i >= 0; i--, mult++) {
    sum += mult * deck[i];
  }
  return sum;
}

function solve(world: State): State {
  let seen: Set<string> = new Set();

  function next(decks: State): State {
    let key = JSON.stringify(decks);
    if (seen.has(key)) {
      // player 1 wins
      return [[...decks[0], ...decks[1]], []];
    } else {
      seen.add(key);
      let newDecks: State;
      let a = decks[0][0];
      let b = decks[1][0];

      if (decks[0].length > a && decks[1].length > b) {
        // recursive game
        let result = solve([
          decks[0].slice(1, 1 + a),
          decks[1].slice(1, 1 + b)
        ]);
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

  while (world[0].length > 0 && world[1].length > 0) {
    world = next(world);
  }
  return world;
}

export async function run() {
  var text: string = await slurp("data/day22a.txt");
  var world = parse(text);

  let result = solve(world);
  console.log(score(result[winner(result)]));
}
