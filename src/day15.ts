import { slurp } from "./util";

type World = number[];

function solvea(world: World) {
  console.log(world);

  let m: Map<number, number[]> = new Map();

  let last = -1;
  for (let turn = 1; turn <= 30000000; turn++) {
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
    let ts = m.get(n) || [];
    ts.push(turn);
    if (ts.length > 2) ts.shift();
    m.set(n, ts);

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

  solvea(world);
}
