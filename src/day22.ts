import { slurp, mod } from "./util";
import { strict as assert } from "assert";
import baretest from "baretest";
const test = baretest("aoc");

type World = number[][];

function parse(s: string): World {
  console.log(s);
  throw "not implemented";
}

function solve(world: World) {}

export async function run() {
  var text: string = await slurp("data/day22.txt");
  var world = parse(text);

  solve(world);
}
