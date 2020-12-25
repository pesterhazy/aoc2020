import { slurp, time } from "./util";

type Inf = [string[], string[]];

const intersection = (a: any, b: any) => new Set([...a].filter(x => b.has(x)));

function solvea(infs: Inf[]) {
  let result: Map<string, number> = new Map();
  let assoc: Map<string, string> = new Map();
  let m: Map<string, Array<Set<string>>> = new Map();

  for (let [xs, ys] of infs) {
    for (let x of xs) result.set(x, (result.get(x) || 0) + 1);
    for (let y of ys) {
      let s = m.get(y) || [];
      s.push(new Set(xs));
      m.set(y, s);
    }
  }
  while (true) {
    if (m.size === 0) break;
    for (let [y, xss] of m.entries()) {
      let s = xss[0];
      for (let xs of xss.slice(1)) s = intersection(s, xs);

      if (s.size === 1) {
        let x = s.values().next().value;
        assoc.set(y, x);

        for (let [y, xss] of m.entries()) {
          for (let xs of xss) {
            xs.delete(x);
          }
        }
        m.delete(y);
        result.delete(x);
        break;
      }
    }
  }
  console.log([...result.values()].reduce((a: number, b: number) => a + b));
}

function parse(s: string): Inf {
  return s
    .split(/contains/)
    .map((ss: string) => ss.match(/[a-zA-Z]+/g)!) as Inf;
}

export async function run() {
  var text: string = await slurp("data/day21a.txt");
  var infs = text.split(/\n/).map(parse);

  solvea(infs);
}
