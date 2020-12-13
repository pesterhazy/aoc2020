import { slurp } from "./util";

interface World {
  ts: number;
  ids: number[];
}

function parse(s: string): World {
  let ss = s.split(/\n/);
  return {
    ts: parseInt(ss[0]),
    ids: ss[1].split(/,/).map(sss => parseInt(sss))
  };
}

function solvea(world: World) {
  console.log(world);

  let min = Infinity;
  let r = undefined;

  for (let id of world.ids.filter(n => !isNaN(n))) {
    let rem = world.ts % id;
    let wait = rem === 0 ? 0 : id - rem;

    if (wait < min) {
      min = wait;
      r = id;
    }

    console.log(id, wait);
  }

  if (r !== undefined) {
    console.log(min * r);
  }
}

function div(n: number, factor: number, offset: number): boolean {
  return 0 === (n + offset) % factor;
}

function solveb(world: World) {
  let tt: [number, number][] = [];
  let idx = 0;
  for (let id of world.ids) {
    if (!isNaN(id)) tt.push([id, idx]);
    idx++;
  }
  console.log(tt);

  let count = 0;
  let last = undefined;

  // FIXME bignums

  let start = 0; //7 * 13 * 59 * 31 * 19;
  console.log("start", start);
  for (let n = start; n < start + 10000000; n += 7) {
    if (
      div(n, 7, 0) &&
      div(n, 13, 1) &&
      // div(n, 59, 4) &&
      // div(n, 31, 6) &&
      // div(n, 19, 7) &&
      true
    ) {
      console.log("n", n);
      if (last !== undefined) {
        console.log("gap", n - last);
      }
      last = n;
      if (count++ > 5) return;
    }
  }
}

export async function run() {
  var text: string = await slurp("data/day13.txt");
  var world = parse(text);

  solveb(world);
}
