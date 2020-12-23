import { slurp, mod } from "./util";
import { strict as assert } from "assert";
import baretest from "baretest";
const test = baretest("aoc");

const N = 9;

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

const findDec = (xs: number[], n: number) => {
  let dest;
  while (true) {
    dest = xs.indexOf(n);
    if (dest !== -1) return dest;
    n = mod1(n - 1, N);
  }
};

function next(xs: number[], curIdx: number): [number[], number] {
  assert.equal(9, xs.length);
  let t = pick(xs, curIdx + 4, 6);
  assert.equal(t.length, 6, "t should have 6 items");
  let destIdx = findDec(t, mod1(xs[curIdx] - 1, N));
  let pickUp = pick(xs, curIdx + 1, 3);
  let newXs = [
    ...pick(t, 0, destIdx + 1),
    ...pickUp,
    ...pick(t, destIdx + 1, 9 - (destIdx + 4))
  ];
  assert.equal(newXs.length, 9, "newXs must have the same length");
  let newCurIdx = newXs.indexOf(xs[curIdx]);
  assert(newCurIdx !== -1);
  return [newXs, mod(newCurIdx + 1, N)];
}

function answer(xs: number[]) {
  let idx = xs.indexOf(1);
  assert.notEqual(idx, -1);

  return pick(xs, idx + 1, 8).join("");
}

function solve(xs: number[]) {
  let cur = 0;
  for (let i = 0; i < 100; i++) {
    [xs, cur] = next(xs, cur);
  }
  console.log("=>", answer(xs));
}

export async function run() {
  await test.run();

  // let text = "389125467";
  let text = "739862541";

  var xs = [...text].map(s => parseInt(s));

  solve(xs);
}
