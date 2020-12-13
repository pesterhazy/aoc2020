import { slurp } from "./util";

interface World {
  ts: number;
  ids: number[];
}

function parse(s: string): World {
  let ss = s.split(/\n/);
  return {
    ts: parseInt(ss[0]),
    ids: ss[1]
      .split(/,/)
      .map(sss => parseInt(sss))
      .filter(n => !isNaN(n))
  };
}

function solvea(world: World) {
  console.log(world);

  let min = Infinity;
  let r = undefined;

  for (let id of world.ids) {
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

export async function run() {
  var text: string = await slurp("data/day13a.txt");
  var world = parse(text);

  solvea(world);
}
