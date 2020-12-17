import { slurp, time } from "./util";

type World = number[];

function solvea(world: World, target: number) {
  console.log(world);

  let m: Map<number, number[]> = new Map();

  let last = -1;
  for (let turn = 1; turn <= target; turn++) {
    let n;
    if (turn < world.length + 1) {
      n = world[turn - 1];
    } else {
      let ts = m.get(last);
      if (ts === undefined) throw "?!";
      if (ts.length === 1) n = 0;
      else {
        n = ts[1] - ts[0];
      }
    }
    {
      let ts = m.get(n);
      if (!ts) {
        ts = [];
        m.set(n, ts);
      }

      if (ts.length === 0) {
        ts[0] = turn;
      } else if (ts.length === 1) {
        ts[1] = turn;
      } else {
        ts[0] = ts[1];
        ts[1] = turn;
      }
    }

    last = n;
    if (turn % 1000000 === 0) {
      console.log(turn, n);
    }
  }
  console.log("=>", last);
}

export async function run() {
  var text: string = await slurp("data/day15.txt");
  var world = text.split(/,/).map(n => parseInt(n));

  time(() => solvea(world, 2020));
  time(() => solvea(world, 30000000));
}
