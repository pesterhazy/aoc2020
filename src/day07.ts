import { slurp } from "./util.ts";

interface Inf {
  label: string;
  vertices: Map<string, number>;
}

function parse(s: string): Inf {
  let xs = s.split(/ /);
  let inf: Inf;
  if (xs.length === 7) {
    inf = {
      label: xs[0] + " " + xs[1],
      vertices: new Map()
    };
  } else {
    let ss = xs.slice(4);
    let vertices = new Map();

    if (ss.length % 4 !== 0) throw ":(";

    for (let i = 0; i < ss.length; i += 4) {
      vertices.set(ss[i + 1] + " " + ss[i + 2], parseInt(ss[i]));
    }

    inf = {
      label: xs[0] + " " + xs[1],
      vertices: vertices
    };
  }
  return inf;
}

function solvea(infs: Inf[]) {
  let ans = null;
  console.log(ans);
}

// 4431

export async function run() {
  var text: string = await slurp("data/day07.txt");
  var infs = text.split(/\n/).map(parse);

  console.log(infs);

  solvea(infs);
}
