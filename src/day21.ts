import { slurp, time } from "./util";

type Inf = [string[], string[]];

const intersection = (a: any, b: any) => new Set([...a].filter(x => b.has(x)));

function solvea(infs: Inf[]) {
  console.log(infs);

  let assoc: Map<string, string> = new Map();
  let m: Map<string, Array<Set<string>>> = new Map();

  for (let [xs, ys] of infs) {
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
        let v = s.values().next().value;
        assoc.set(y, v);

        for (let [y, xss] of m.entries()) {
          for (let xs of xss) {
            xs.delete(v);
          }
        }
        m.delete(y);
        break;
      }
    }
  }
  console.log(assoc);
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
