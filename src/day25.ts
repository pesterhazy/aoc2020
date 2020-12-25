import { slurp, mod } from "./util";
import { strict as assert } from "assert";
import { vec2, vec3, vec4 } from "gl-matrix";
import baretest from "baretest";
const test = baretest("aoc");

function step(sn: number, n: number): number {
  return (n * sn) % 20201227;
}

function findLoopSize(key: number) {
  let n = 1;
  let ls;
  for (ls = 0; ; ls++) {
    if (n === key) break;
    n = step(7, n);
  }
  return ls;
}

function solve(keys: number[]) {
  console.log(keys.map(findLoopSize));
}

export async function run() {
  var text: string = await slurp("data/day24a.txt");
  let keys = [5764801, 17807724];

  solve(keys);
}
