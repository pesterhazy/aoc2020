import { slurp } from "./util.ts";

type Inf = string;

function xform(inf: Inf): number {
  var matches = inf.match(/^(.{7})(.{3})$/);

  if (!matches) throw "boom";
  let [_, a, b] = matches;
  a = a.replace(/F/g, "0").replace(/B/g, "1");
  b = b.replace(/L/g, "0").replace(/R/g, "1");
  var c = a + b;
  return parseInt(c, 2);
}

function solvea(infs: Inf[]) {
  let hi = -1;
  for (let inf of infs) {
    let ans = xform(inf);
    console.log(ans);
    if (ans > hi) hi = ans;
  }
  console.log(hi);
}

function solveb(infs: Inf[]) {
  let xs = infs.map(xform);

  xs.sort(function(a, b) {
    return a - b;
  });

  let last = -1;

  for (let x of xs) {
    // yeah this will print out 2 numbers I know
    if (x !== last + 1) console.log(last);
    last = x;
  }
}

// not 89 or 549

export async function run() {
  console.log("///");
  var text: string = await slurp("data/day05.txt");

  var infs = text.split(/\n/);

  solveb(infs);
}
