import { slurp, mod } from "./util";
import { strict as assert } from "assert";
import baretest from "baretest";
const test = baretest("aoc");

type World = number[][];

function parse(s: string): World {
  return s.split(/\n\n/).map(l =>
    l
      .split(/\n/)
      .slice(1)
      .map(s => parseInt(s))
  );
}

function next(stacks: World): World {
  let a = stacks[0][0];
  let b = stacks[1][0];
  let newStacks: World;
  if (a > b) {
    // first player wins
    newStacks = [[...stacks[0].slice(1), a, b], stacks[1].slice(1)];
  } else {
    newStacks = [stacks[0].slice(1), [...stacks[1].slice(1), b, a]];
  }
  return newStacks;
}

function score(stack: number[]): number {
  let sum = 0;
  for (let i = stack.length - 1, mult = 1; i >= 0; i--, mult++) {
    sum += mult * stack[i];
  }
  return sum;
}

function solve(world: World) {
  let round = 0;
  while (world[0].length > 0 && world[1].length > 0) {
    world = next(world);
    round++;
  }
  console.log(round, world, score(world[0].length > 0 ? world[0] : world[1]));
}

export async function run() {
  var text: string = await slurp("data/day22a.txt");
  var world = parse(text);

  solve(world);
}
