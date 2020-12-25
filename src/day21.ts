import { slurp, time } from "./util";

type Inf = [string[], string[]];

function solvea(infs: Inf[]) {
  console.log(infs);
}

function parse(s: string): Inf {
  return s
    .split(/contains/)
    .map((ss: string) => ss.match(/[a-zA-Z]+/g)!) as Inf;
}

export async function run() {
  var text: string = await slurp("data/day21.txt");
  var infs = text.split(/\n/).map(parse);

  solvea(infs);
}
