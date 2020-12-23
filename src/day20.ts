import { slurp } from "./util";
import { strict as assert } from "assert";

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
    ls = ls.slice(1).filter(l => l.length !== 0);

    return [parseInt(m[0]), ls];
  });
}

// E, N, W, S

function hash(grid: Grid): string[] {
  assert.equal(width(grid), height(grid));
  let r: string[] = [];
  {
    let s = "";
    for (let y = 0; y < height(grid); y++) {
      let c = grid[y][width(grid) - 1];
      if (c === undefined) throw new Error("boom");
      s += c;
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
  let h: Map<number, string[]> = new Map();
  let cc: Map<string, Set<number>> = new Map();
  let ccc: Map<number, Set<string>> = new Map();
  for (let [id, grid] of world) {
    let hh = hash(grid);
    hh = [
      ...hh,
      hh[2],
      reverse(hh[1]),
      hh[0],
      reverse(hh[3]),
      reverse(hh[0]),
      hh[3],
      reverse(hh[2]),
      hh[1]
    ];
    h.set(id, hh);

    for (let s of hh) {
      let tmp = cc.get(s) || new Set();
      tmp.add(id);
      cc.set(s, tmp);
    }
  }
  let toRemove = [...cc.entries()]
    .filter(([a, b]) => b.size === 1)
    .map(pair => pair[0]);
  for (let i of toRemove) cc.delete(i);
  for (let [sig, v] of cc)
    for (let vv of v) {
      let tmp = ccc.get(vv) || new Set();
      tmp.add(sig);
      ccc.set(vv, tmp);
    }
  let corners = [];
  for (let [a, b] of ccc) {
    if (b.size === 4) {
      corners.push(a);
    }
  }

  {
    let ans = 1;
    for (let c of corners) {
      ans *= c;
    }
    console.log(ans);
  }

  // direction: SE
  let corner = corners[0];
  let hh = h.get(corner)!;
  let found; // S,E
  for (let i = 0; i < 4; i++) {
    if (cc.has(hh[i]) && cc.has(hh[(i + 1) % 4])) {
      found = [i, (i + 1) % 4];
      break;
    }
  }
  if (!found) throw "Not found";
  let dir = 0; // E

  console.log(hh[found[1]]);
}

export async function run() {
  var text: string = await slurp("data/day20.txt");

  var grid = parse(text);

  solve(grid);
}
