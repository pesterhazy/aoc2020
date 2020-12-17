import { slurp, time } from "./util";
import { vec2, vec3, vec4 } from "gl-matrix";

// 3d

type Grid3 = Map<number, Map<number, Map<number, string>>>;

function bounds3(grid: Grid3): [vec2, vec2, vec2] {
  let r: [vec2, vec2, vec2] = [
    [Infinity, -Infinity],
    [Infinity, -Infinity],
    [Infinity, -Infinity]
  ];
  for (let [x, a] of grid)
    for (let [y, b] of a)
      for (let [z, _] of b) {
        r[0][0] = Math.min(r[0][0], x);
        r[0][1] = Math.max(r[0][1], x);
        r[1][0] = Math.min(r[1][0], y);
        r[1][1] = Math.max(r[1][1], y);
        r[2][0] = Math.min(r[2][0], z);
        r[2][1] = Math.max(r[2][1], z);
      }

  return r;
}

function count3(grid: Grid3): number {
  let r = 0;
  for (let a of grid.values())
    for (let b of a.values())
      for (let v of b.values()) {
        if (v === "#") r++;
      }

  return r;
}

function peek3(grid: Grid3, p: vec3): string | undefined {
  let m: Map<number, any> = grid;
  if (!m.has(p[0])) return undefined;
  m = m.get(p[0]);
  if (!m.has(p[1])) return undefined;
  m = m.get(p[1]);
  return m.get(p[2]);
}

function poke3(grid: Grid3, p: vec3, v: string) {
  let m: Map<number, any> = grid;
  if (!m.has(p[0])) m.set(p[0], new Map());
  m = m.get(p[0]);
  if (!m.has(p[1])) m.set(p[1], new Map());
  m = m.get(p[1]);
  m.set(p[2], v);
}

function makeDeltas3(): vec3[] {
  let r: vec3[] = [];
  for (let x = -1; x <= 1; x++)
    for (let y = -1; y <= 1; y++)
      for (let z = -1; z <= 1; z++) {
        if (x === 0 && y === 0 && z === 0) continue;

        r.push([x, y, z]);
      }
  return r;
}

const DELTAS3 = makeDeltas3();

function next3(grid: Grid3): Grid3 {
  let r: Grid3 = new Map();
  let b = bounds3(grid);

  for (let x = b[0][0] - 1; x <= b[0][1] + 1; x++) {
    for (let y = b[1][0] - 1; y <= b[1][1] + 1; y++) {
      for (let z = b[2][0] - 1; z <= b[2][1] + 1; z++) {
        let p: vec3 = [x, y, z];
        let neighbors = 0;
        for (let delta of DELTAS3) {
          let pp = vec3.add(vec3.create(), p, delta);
          if (peek3(grid, pp) === "#") neighbors++;
        }
        let v = peek3(grid, p);
        if (v === "#" && !(neighbors === 2 || neighbors === 3)) v = ".";
        else if (v !== "#" && neighbors === 3) v = "#";
        if (v === "#") poke3(r, p, v);
      }
    }
  }

  return r;
}

function parse3(lines: string[]): Grid3 {
  let grid: Grid3 = new Map();
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      poke3(grid, [x, y, 0], lines[y][x]);
    }
  }
  return grid;
}

// 4d

type Grid4 = Map<number, Map<number, Map<number, Map<number, string>>>>;

function bounds4(grid: Grid4): [vec2, vec2, vec2, vec2] {
  let r: [vec2, vec2, vec2, vec2] = [
    [Infinity, -Infinity],
    [Infinity, -Infinity],
    [Infinity, -Infinity],
    [Infinity, -Infinity]
  ];
  for (let [x, a] of grid) {
    for (let [y, b] of a) {
      for (let [z, c] of b) {
        for (let [w, _] of c) {
          r[0][0] = Math.min(r[0][0], x);
          r[0][1] = Math.max(r[0][1], x);
          r[1][0] = Math.min(r[1][0], y);
          r[1][1] = Math.max(r[1][1], y);
          r[2][0] = Math.min(r[2][0], z);
          r[2][1] = Math.max(r[2][1], z);
          r[3][0] = Math.min(r[3][0], w);
          r[3][1] = Math.max(r[3][1], w);
        }
      }
    }
  }

  return r;
}

function count4(grid: Grid4): number {
  let r = 0;
  for (let a of grid.values())
    for (let b of a.values())
      for (let c of b.values())
        for (let v of c.values()) {
          if (v === "#") r++;
        }

  return r;
}

function peek4(grid: Grid4, p: vec4): string | undefined {
  let m: Map<number, any> = grid;
  if (!m.has(p[0])) return undefined;
  m = m.get(p[0]);
  if (!m.has(p[1])) return undefined;
  m = m.get(p[1]);
  if (!m.has(p[2])) return undefined;
  m = m.get(p[2]);
  return m.get(p[3]);
}

function poke4(grid: Grid4, p: vec4, v: string) {
  let m: Map<number, any> = grid;
  if (!m.has(p[0])) m.set(p[0], new Map());
  m = m.get(p[0]);
  if (!m.has(p[1])) m.set(p[1], new Map());
  m = m.get(p[1]);
  if (!m.has(p[2])) m.set(p[2], new Map());
  m = m.get(p[2]);
  m.set(p[3], v);
}

function makeDeltas4(): vec4[] {
  let r: vec4[] = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        for (let w = -1; w <= 1; w++) {
          if (x === 0 && y === 0 && z === 0 && w === 0) continue;

          r.push([x, y, z, w]);
        }
      }
    }
  }
  return r;
}

const DELTAS4 = makeDeltas4();

function next4(grid: Grid4): Grid4 {
  let r: Grid4 = new Map();
  let b = bounds4(grid);

  for (let x = b[0][0] - 1; x <= b[0][1] + 1; x++) {
    for (let y = b[1][0] - 1; y <= b[1][1] + 1; y++) {
      for (let z = b[2][0] - 1; z <= b[2][1] + 1; z++) {
        for (let w = b[3][0] - 1; w <= b[3][1] + 1; w++) {
          let p: vec4 = [x, y, z, w];
          let neighbors = 0;
          for (let delta of DELTAS4) {
            let pp = vec4.add(vec4.create(), p, delta);
            if (peek4(grid, pp) === "#") neighbors++;
          }
          let v = peek4(grid, p);
          if (v === "#" && !(neighbors === 2 || neighbors === 3)) v = ".";
          else if (v !== "#" && neighbors === 3) v = "#";
          if (v === "#") poke4(r, p, v);
        }
      }
    }
  }

  return r;
}

function parse4(lines: string[]): Grid4 {
  let grid: Grid4 = new Map();
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      poke4(grid, [x, y, 0, 0], lines[y][x]);
    }
  }
  return grid;
}

function solvea(grid: Grid3) {
  for (let i = 0; i < 6; i++) {
    grid = next3(grid);
  }
  console.log(count3(grid));
}

function solveb(grid: Grid4) {
  for (let i = 0; i < 6; i++) {
    grid = next4(grid);
  }
  console.log(count4(grid));
}

export async function run() {
  var text: string = await slurp("data/day17a.txt");

  time(() => solvea(parse3(text.split(/\n/))));
  time(() => solveb(parse4(text.split(/\n/))));
}
