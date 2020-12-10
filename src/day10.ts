import { slurp } from "./util";

type Inf = number;

function parse(s: string): Inf {
  return parseInt(s);
}

function solvea(infs: Inf[]) {
  let ns = [...infs];

  ns.sort(function(a, b) {
    return a - b;
  });
  ns.push(ns[ns.length - 1] + 3);

  let steps: Map<number, number> = new Map();
  let prev = 0;
  for (let n of ns) {
    let step = n - prev;
    steps.set(step, (steps.get(step) || 0) + 1);
    prev = n;
  }
  console.log(steps.get(1)! * steps.get(3)!);
}

function solveb(infs: Inf[]) {
  let ns = [...infs];

  ns.sort(function(a, b) {
    return a - b;
  });
  ns.push(ns[ns.length - 1] + 3);

  let answers: Map<number, number> = new Map();

  function find(ns: number[], prev: number) {
    if (ns.length === 0) return 1;
    let cached = answers.get(ns[0]);
    if (cached !== undefined) return cached;

    let r = 0;
    for (let i = 0; i < Math.min(3, ns.length); i++) {
      let v = ns[i];
      if (v - prev > 3) continue;

      r += find(ns.slice(i + 1), v);
    }

    answers.set(ns[0], r);
    return r;
  }

  console.log(find(ns, 0));
}

export async function run() {
  var text: string = await slurp("data/day10a.txt");
  var infs = text.split(/\n/).map(parse);

  solvea(infs);
  solveb(infs);
}
