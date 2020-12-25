import { slurp, mod } from "./util";
import { strict as assert } from "assert";

const mod1 = (x: number, n: number) => mod(x - 1, n) + 1;

function solve(
  init: number[],
  size: number,
  nMoves: number,
  part1: boolean
): number {
  // based on https://github.com/jonathanpaulson/AdventOfCode/blob/master/2020/23.py
  let xs: number[] = [];

  // fill array
  for (let i = 0; i < init.length; i++) {
    xs.push(init[i]);
  }
  for (let i = init.length; i < size; i++) {
    xs.push(i + 1);
  }

  // build linked list
  let next: Map<number, number> = new Map();
  const getNext = (n: number): number => {
    let r = next.get(n);
    if (r === undefined) throw "not found";
    return r;
  };

  for (let i = 0; i < size; i++) {
    next.set(xs[i], xs[(i + 1) % size]);
  }

  let cur = xs[0];
  for (let move = 0; move < nMoves; move++) {
    let pickup = getNext(cur);
    if (pickup === undefined) throw "not found";

    // remove pickups

    next.set(cur, getNext(getNext(getNext(pickup))));

    let dest = mod1(cur - 1, size);
    let abc = [pickup, getNext(pickup), getNext(getNext(pickup))];
    while (abc.indexOf(dest) !== -1) dest = mod1(dest - 1, size);

    next.set(abc[2], getNext(dest));
    next.set(dest, pickup);
    cur = getNext(cur);
  }

  // p1
  if (part1) {
    let ans = [];
    let x = getNext(1);
    while (x !== 1) {
      ans.push(x);
      x = getNext(x);
    }
    return parseInt(ans.join(""));
  } else {
    return getNext(1) * getNext(getNext(1));
  }
}

const explode = (text: string) => [...text].map(s => parseInt(s));

export async function run() {
  console.log("*** part1");
  assert.equal(solve(explode("739862541"), 9, 100, true), 94238657);
  console.log("*** part2");
  assert.equal(
    solve(explode("739862541"), 1000000, 10000000, false),
    3072905352
  );
}
