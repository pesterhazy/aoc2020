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

function div(n: bigint, factor: bigint, offset: bigint): boolean {
  return 0n === (n + offset) % factor;
}

function solveb(world: World) {
  let tt: [bigint, bigint][] = [];
  let idx = 0;
  for (let id of world.ids) {
    if (!isNaN(id)) tt.push([BigInt(id), BigInt(idx)]);
    idx++;
  }
  console.log(tt);

  let start = 0n;
  let step = 1n;
  while (tt.length > 0) {
    let [id, idx] = tt.shift()!;

    let n;
    for (n = start; !div(n, id, idx); n += step);
    console.log(n);
    start = n;
    step *= id;
  }
}

export async function run() {
  var text: string = await slurp("data/day13a.txt");
  var world = parse(text);

  solveb(world);
}
