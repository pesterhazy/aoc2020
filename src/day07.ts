import { slurp } from "./util.ts";

interface Inf {
  label: string;
  vertices: Map<string, number>;
}

type World = Map<string, Inf>;

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

function finda(world: World, label: string): Map<string, number> {
  let result = new Map();

  let inf = world.get(label);
  if (!inf) throw ":(";
  for (let [k, v] of inf.vertices.entries()) {
    result.set(k, (result.get(k) || 0) + 1);
    for (let [a, b] of finda(world, k)) {
      result.set(a, (result.get(a) || 0) + b);
    }
  }
  return result;
}

function solvea(world: World) {
  let ans = 0;

  for (let inf of world.values()) {
    let m = finda(world, inf.label);

    if (m.has("shiny gold")) ans++;
  }

  console.log(ans);
}

function findb(world: World, label: string): number {
  let inf = world.get(label);
  if (!inf) throw ":(";
  let n = 1;
  for (let [k, v] of inf.vertices.entries()) {
    n += v * findb(world, k);
  }
  return n;
}

function solveb(world: World) {
  let ans = findb(world, "shiny gold") - 1;

  console.log(ans);
}

export async function run() {
  var text: string = await slurp("data/day07a.txt");
  var infs = text.split(/\n/).map(parse);

  let world = new Map();
  for (let inf of infs) {
    world.set(inf.label, inf);
  }

  solvea(world);
  solveb(world);
}
