import { slurp, mod } from "./util";
import { strict as assert } from "assert";
import baretest from "baretest";
const test = baretest("aoc");

const N = 9;

function slice(xs: number[], start: number, end: number): number[] {
  let r = [];
  for (
    let i = start;
    i !== end;
    i = mod(i + 1, xs.length), end = mod(end, xs.length)
  ) {
    r.push(xs[i]);
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
  let tparts = [slice(xs, 0, curIdx + 1), slice(xs, curIdx + 4, 0)];
  let t = Array.prototype.concat(...tparts);
  assert.equal(6, t.length);
  let destIdx = findDec(t, mod(xs[curIdx] - 1, N));
  console.log("t", t);
  console.log("destIdx", destIdx);
  console.log("dest", t[destIdx]);
  let wrk = slice(xs, curIdx + 1, curIdx + 4);
  let parts = [slice(t, 0, destIdx + 1), wrk, slice(t, destIdx + 1, 0)];
  console.log("parts", parts);
  let newXs = Array.prototype.concat(...parts);
  assert.equal(newXs.length, 9, "newXs must have the same length");
  let newCurIdx = newXs.indexOf(xs[curIdx]);
  assert(newCurIdx !== -1);
  return [newXs, mod(newCurIdx + 1, N)];
}

function solve(xs: number[]) {
  let cur = 0;
  console.log("=>", xs, cur);
  for (let i = 0; i < 10; i++) {
    [xs, cur] = next(xs, cur);
    console.log("=>", xs, cur);
  }
}

test("slice", function() {
  let xs = [100, 101, 102];
  assert.deepEqual(slice(xs, 0, 1), [100]);
  assert.deepEqual(slice(xs, 0, 2), [100, 101]);
  assert.deepEqual(slice(xs, 1, 2), [101]);
  assert.deepEqual(slice(xs, 1, 0), [101, 102]);
  assert.deepEqual(slice(xs, 1, 1), []);
  assert.deepEqual(slice(xs, 1, 4), [101, 102, 100]);
});

export async function run() {
  await test.run();

  let text = "389125467";

  var xs = [...text].map(s => parseInt(s));

  solve(xs);
}
