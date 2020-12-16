import { slurp } from "./util";

interface World {
  rules: Map<string, Array<{ lo: number; hi: number }>>;
}

function parse(s: string): World {
  let chunks = s.split(/\n\n/);
  console.log(chunks);
  throw new Error(":(");
}

function solvea(world: World) {
  console.log(world);
}

export async function run() {
  var text: string = await slurp("data/day15.txt");
  var world = parse(text);

  solvea(world);
}
