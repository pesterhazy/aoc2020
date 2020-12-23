import { slurp, mod } from "./util";
import { strict as assert } from "assert";
import baretest from "baretest";
const test = baretest("aoc");

const mod1 = (x: number, n: number) => mod(x - 1, n) + 1;

function pick(xs: number[], start: number, len: number): number[] {
  let r = [];
  let i = mod(start, xs.length);
  while (len > 0) {
    r.push(xs[i]);
    i = mod(i + 1, xs.length);
    len--;
  }
  return r;
}

function next(xs: number[]): number[] {
  const findDec = (ns: number[], n: number) => {
    let dest;
    while (true) {
      dest = ns.indexOf(n);
      if (dest !== -1) return dest;
      n = mod1(n - 1, xs.length);
    }
  };
  let t = pick(xs, 4, xs.length - 3);
  let destIdx = findDec(t, mod1(xs[0] - 1, xs.length));
  let pickUp = pick(xs, 1, 3);
  let newXs = [
    ...pick(t, 0, destIdx + 1),
    ...pickUp,
    ...pick(t, destIdx + 1, xs.length - (destIdx + 4))
  ];
  assert.equal(newXs.length, xs.length, "newXs must have the same length");
  return newXs;
}

function answer(xs: number[]) {
  let idx = xs.indexOf(1);
  assert.notEqual(idx, -1);

  return pick(xs, idx + 1, 8).join("");
}

function fill(xs: number[], n: number) {
  let r = [];

  for (let i = 0; i < xs.length; i++) r.push(xs[i]);
  for (let i = xs.length; i < n; i++) r.push(i);
  return r;
}

function solve(xs: number[], nMoves: number) {
  let seen: Set<string> = new Set();
  for (let i = 0; i < nMoves; i++) {
    if (i % 100 === 0) console.log("...", i);
    let key = JSON.stringify(xs);
    if (seen.has(key)) {
      throw "cycle detected i=" + i;
    }
    seen.add(key);
    xs = next(xs);
  }
  return answer(xs);
}

const explode = (text: string) => [...text].map(s => parseInt(s));

export async function run() {
  // let text = "389125467";
  console.log("*** part1");
  assert.equal(solve(fill(explode("389125467"), 9), 100), "67384529");
  console.log("*** part2");
  assert.equal(solve(fill(explode("389125467"), 1000000), 1000), "xxx");
}
