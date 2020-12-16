import { slurp } from "./util";

interface World {
  rules: Map<string, { lo: number; hi: number }[]>;
  mine: number[];
  nearby: number[][];
}

function parse(s: string): World {
  let chunks = s.split(/\n\n/);
  let rules = new Map(
    chunks[0].split(/\n/).map(l => {
      let xs = l.match(/^(.+): (\d+)-(\d+) or (\d+)-(\d+)$/);
      if (!xs) throw "boom";
      return [
        xs[1],
        [
          { lo: parseInt(xs[2]), hi: parseInt(xs[3]) },
          { lo: parseInt(xs[4]), hi: parseInt(xs[5]) }
        ]
      ];
    })
  );
  return {
    rules: rules,
    mine: chunks[1]
      .split(/\n/)[1]
      .split(/,/)
      .map(n => parseInt(n)),
    nearby: chunks[2]
      .split(/\n/)
      .slice(1)
      .map((l: string) => l.split(/,/).map(n => parseInt(n)))
  };
}

function solvea(world: World) {
  let ans = 0;
  for (let n of world.nearby.flatMap(xs => xs)) {
    let valid = false;

    for (let rule of [...world.rules.values()].flatMap(xs => xs)) {
      if (n >= rule.lo && n <= rule.hi) {
        valid = true;
        break;
      }
    }

    if (!valid) ans += n;
  }
  console.log(ans);
}

function solveb(world: World) {
  const isValid = (n: number, rule: { lo: number; hi: number }) =>
    n >= rule.lo && n <= rule.hi;
  console.log(world.rules);
  let tickets: number[][] = [];
  for (let ticket of world.nearby) {
    let ok = true;
    for (let n of ticket) {
      let valid = false;
      for (let rule of [...world.rules.values()].flatMap(xs => xs)) {
        if (n >= rule.lo && n <= rule.hi) {
          valid = true;
          break;
        }
      }
      if (!valid) {
        ok = false;
        break;
      }
    }

    if (ok) tickets.push(ticket);
  }
  let candidates: Map<string, Set<number>> = new Map();

  for (let id of world.rules.keys()) {
    candidates.set(
      id,
      new Set(Array.from({ length: tickets[0].length }, (_, i) => i))
    );
  }

  for (let ticket of tickets) {
    for (let [idx, n] of ticket.entries()) {
      for (let [id, pair] of world.rules.entries()) {
        if (!isValid(n, pair[0]) && !isValid(n, pair[1]))
          candidates.get(id)!.delete(idx);
      }
    }
  }
  let m: Map<string, number> = new Map();
  while (true) {
    let done = true;
    let progress = false;
    for (let [id, options] of candidates) {
      if (options.size === 1) {
        let idx = [...options][0];

        m.set(id, idx);
        for (let options of candidates.values()) options.delete(idx);
        done = false;
        progress = true;
        break;
      }
      if (options.size > 1) {
        done = false;
      }
    }
    if (done) break;
    if (!progress) throw "no progress";
  }
  console.log("m", m);
  let sum = 0;
  for (let [id, idx] of m) {
    if (!id.startsWith("departure")) continue;

    sum += world.mine[idx];
  }
  console.log("ans", sum);
}

export async function run() {
  var text: string = await slurp("data/day16a.txt");
  var world = parse(text);

  solveb(world);
}
