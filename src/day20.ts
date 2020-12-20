import { slurp } from "./util";

function dump(o: any) {
  console.log(JSON.stringify(o, null, 4));
}

type World = [number, Grid][];

type Grid = string[];

function height(grid: string[]) {
  return grid.length;
}

function width(grid: string[]) {
  return grid[0].length;
}

function parse(s: string): World {
  return s.split(/\n\n/).map(ss => {
    let ls = ss.split(/\n/);

    let m = ls[0].match(/\d+/);
    if (!m) throw ":(";
    ls = ls.slice(1);

    return [parseInt(m[0]), ls];
  });
}

// E, N, W, S

function hash(grid: Grid): string[] {
  let r: string[] = [];
  {
    let s = "";
    for (let y = 0; y < height(grid); y++) {
      s += grid[y][width(grid) - 1];
    }
    r.push(s);
  }
  r.push(grid[0]);

  {
    let s = "";
    for (let y = 0; y < height(grid); y++) {
      s += grid[y][0];
    }
    r.push(s);
  }
  r.push(grid[height(grid) - 1]);
  return r;
}

function reverse(s: string) {
  let r = "";
  for (let i = s.length - 1; i >= 0; i--) r += s[i];
  return r;
}

function solve(world: World) {
  let m: Map<string, [number, number][]> = new Map();
  for (let [n, grid] of world.entries()) {
    let grid = world[n][1];
    dump(grid);
    let hashes = hash(grid);
    let sigs = [...hashes, ...hashes.map(reverse)];
    dump(sigs);
    for (let [idx, sig] of sigs.entries()) {
      let v = m.get(sig) || [];
      m.set(sig, [...v, [n, idx]]);
    }
  }
  console.log(m);
}

export async function run() {
  var text: string = await slurp("data/day20.txt");

  var grid = parse(text);

  solve(grid);
}
