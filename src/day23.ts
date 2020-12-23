import { slurp, mod } from "./util";
import { strict as assert } from "assert";

const N = 9;

function slice(xs: number[], start: number, end: number): number[] {
  let r = [];
  for (
    let i = mod(start, xs.length);
    i !== mod(end, xs.length);
    i = mod(i + 1, xs.length)
  ) {
    r.push(xs[i]);
  }
  return r;
}

const findDec = (xs: number[], n: number) => {
  let dest;
  while (true) {
    console.log(n);
    dest = xs.indexOf(n);
    if (dest !== -1) return dest;
    n = mod(n - 1, N);
  }
};

function next(xs: number[], curIdx: number): [number[], number] {
  let wrk = slice(xs, curIdx + 1, curIdx + 4);
  let t = [...slice(xs, 0, curIdx + 1), ...slice(xs, curIdx + 4, curIdx + N)];
  let destIdx = findDec(t, mod(xs[curIdx] - 1, N));
  let newXs = [
    ...slice(t, 0, destIdx + 1),
    ...wrk,
    ...slice(t, destIdx + 1, destIdx + t.length - 1)
  ];
  assert.equal(9, newXs.length);
  let newCurIdx = newXs.indexOf(xs[curIdx]);
  assert(newCurIdx !== -1);
  return [newXs, mod(newCurIdx + 1, N)];
}

function solve(xs: number[]) {
  let cur = 0;
  console.log("=>", xs, cur);
  [xs, cur] = next(xs, cur);
  console.log("=>", xs, cur);
}

export async function run() {
  let text = "389125467";

  var xs = [...text].map(s => parseInt(s));

  solve(xs);
}
