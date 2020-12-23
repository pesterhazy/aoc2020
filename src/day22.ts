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

function solve(world: World) {
  console.log(world);
  world = next(world);
  console.log(world);
}

export async function run() {
  var text: string = await slurp("data/day22.txt");
  var world = parse(text);

  solve(world);
}
