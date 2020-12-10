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
    console.log(step);
    steps.set(step, (steps.get(step) || 0) + 1);
    prev = n;
  }
  console.log(steps.get(1)! * steps.get(3)!);
}

interface Job {
  todo: number[];
  prevs: number[];
}

function solveb(infs: Inf[]) {
  let ns = [...infs];

  ns.sort(function(a, b) {
    return a - b;
  });
  ns.push(ns[ns.length - 1] + 3);

  let q: Job[] = [{ todo: [...ns], prevs: [0] }];

  let wins: number = 0;
  while (q.length > 0) {
    let job = q.pop()!;
    console.log(job);

    if (job.todo.length === 0) {
      wins++;
      continue;
    }

    let left = Math.min(3, job.todo.length);

    for (let i = 0; i < left; i++) {
      let v = job.todo[i];
      if (v - job.prevs[job.prevs.length - 1] > 3) continue;
      q.push({ todo: job.todo.slice(i + 1), prevs: [...job.prevs, v] });
    }
  }
  console.log("wins", wins);
}

export async function run() {
  var text: string = await slurp("data/day10.txt");
  var infs = text.split(/\n/).map(parse);

  // solvea(infs);
  solveb(infs);
}
