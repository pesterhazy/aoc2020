import { slurp, mod } from "./util";
import { strict as assert } from "assert";
import { vec2, vec3, vec4 } from "gl-matrix";
import baretest from "baretest";
const test = baretest("aoc");

function step(sn: number, n: number): number {
  return (n * sn) % 20201227;
}

function xform(sn: number, ls: number): number {
  let n = 1;

  for (let i = 0; i < ls; i++) n = step(sn, n);

  return n;
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
  let lss = keys.map(findLoopSize);

  console.log(xform(keys[0], lss[1]));
}

export async function run() {
  var text: string = await slurp("data/day24a.txt");
  // let keys = [5764801, 17807724];
  let keys = [10943862, 12721030];

  solve(keys);
}
