import { slurp, mod } from "./util";
import { strict as assert } from "assert";
import baretest from "baretest";
const test = baretest("aoc");

const N = 9;

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

const findDec = (xs: number[], n: number) => {
  let dest;
  while (true) {
    dest = xs.indexOf(n);
    if (dest !== -1) return dest;
    n = mod(n - 1, N);
  }
};

function next(xs: number[], curIdx: number): [number[], number] {
  assert.equal(9, xs.length);
  let t = pick(xs, curIdx + 4, 6);
  assert.equal(t.length, 6, "t should have 6 items");
  let destIdx = findDec(t, mod(xs[curIdx] - 1, N));
  let pickUp = pick(xs, curIdx + 1, 3);
  console.log("pick up", pickUp);
  let parts = [
    pick(t, 0, destIdx + 1),
    pickUp,
    pick(t, destIdx + 1, 9 - (destIdx + 4))
  ];
  let newXs = Array.prototype.concat(...parts);
  assert.equal(newXs.length, 9, "newXs must have the same length");
  let newCurIdx = newXs.indexOf(xs[curIdx]);
  assert(newCurIdx !== -1);
  return [newXs, mod(newCurIdx + 1, N)];
}

function solve(xs: number[]) {
  let cur = 0;
  for (let i = 0; i < 10; i++) {
    console.log("*** move", i + 1);
    console.log("*** ", xs, cur);
    [xs, cur] = next(xs, cur);
    console.log();
  }
  console.log("=>", xs, cur);
}

export async function run() {
  await test.run();

  let text = "389125467";

  var xs = [...text].map(s => parseInt(s));

  solve(xs);
}
