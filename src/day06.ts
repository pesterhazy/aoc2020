import { slurp } from "./util";

type Inf = string[];

function parse(s: string): Inf {
  let ps = s.split(/\n/);
  return ps;
}

function solvea(infs: Inf[]) {
  let ans = infs
    .map(persons => {
      let s = new Set();
      for (let c of persons[0]) {
        s.add(c);
      }
      console.log(s);
      for (let p of persons) {
        let t = new Set();
        for (let c of p) {
          t.add(c);
        }
        s = new Set([...s].filter(x => t.has(x)));
      }
      console.log(s.size);
      return s.size;
    })

    .reduce((a: number, b: number) => a + b);
  console.log(ans);
}

// 4431

export async function run() {
  var text: string = await slurp("data/day06a.txt");
  var infs = text.split(/\n\n/).map(parse);

  console.log(infs);

  solvea(infs);
}
