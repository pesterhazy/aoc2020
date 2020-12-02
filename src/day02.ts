import { slurp } from "./util.ts";

interface Inf {
  low: number;
  high: number;
  c: string;
  password: string;
}

function parse(l: string): Inf {
  var matches = l.match(/^(\d+)-(\d+) ([a-zA-Z]): ([a-zA-Z]+)$/);

  if (!matches || matches.length < 5) throw "parse error";

  return {
    low: parseInt(matches[1]),
    high: parseInt(matches[2]),
    c: matches[3],
    password: matches[4]
  };
}

function solvea(infs: Inf[]) {
  var valid = 0;
  for (var inf of infs) {
    let count = 0;
    for (var c of inf.password) {
      if (c === inf.c) count++;
    }
    if (!(count < inf.low || count > inf.high)) valid++;
  }
  console.log(valid);
}

function solveb(infs: Inf[]) {
  var valid = 0;
  for (var inf of infs) {
    let count =
      (inf.password[inf.low - 1] === inf.c ? 1 : 0) +
      (inf.password[inf.high - 1] === inf.c ? 1 : 0);

    if (count === 1) valid++;
  }
  console.log(valid);
}

export async function run() {
  var text: string = await slurp("data/day02a.txt");

  var infs = text.split(/\n/).map(parse);

  solveb(infs);
}
