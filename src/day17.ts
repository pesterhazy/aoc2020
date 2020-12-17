import { slurp } from "./util";
import { vec2, vec3, vec4 } from "gl-matrix";

type Grid = Map<number, Map<number, Map<number, Map<number, string>>>>;

function bounds(grid: Grid): [vec2, vec2, vec2, vec2] {
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

function count(grid: Grid): number {
  let r = 0;
  for (let a of grid.values())
    for (let b of a.values())
      for (let c of b.values())
        for (let v of c.values()) {
          if (v === "#") r++;
        }

  return r;
}

function peek(grid: Grid, p: vec4): string | undefined {
  let m: Map<number, any> = grid;
  if (!m.has(p[0])) return undefined;
  m = m.get(p[0]);
  if (!m.has(p[1])) return undefined;
  m = m.get(p[1]);
  if (!m.has(p[2])) return undefined;
  m = m.get(p[2]);
  return m.get(p[3]);
}

function poke(grid: Grid, p: vec4, v: string) {
  let m: Map<number, any> = grid;
  if (!m.has(p[0])) m.set(p[0], new Map());
  m = m.get(p[0]);
  if (!m.has(p[1])) m.set(p[1], new Map());
  m = m.get(p[1]);
  if (!m.has(p[2])) m.set(p[2], new Map());
  m = m.get(p[2]);
  m.set(p[3], v);
}

function makeDeltas(): vec4[] {
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

const DELTAS = makeDeltas();

// function print(grid: Grid) {
//   let b = bounds(grid);

//   for (let z = b[2][0]; z <= b[2][1]; z++) {
//     console.log("z=" + z);
//     for (let y = b[1][0]; y <= b[1][1]; y++) {
//       let s = "";
//       for (let x = b[0][0]; x <= b[0][1]; x++) {
//         let p: vec3 = [x, y, z];
//         let v = peek(grid, p) || ".";
//         s += v;
//       }
//       console.log(s);
//     }
//     console.log();
//   }
// }

function next(grid: Grid): Grid {
  let r: Grid = new Map();
  let b = bounds(grid);

  for (let x = b[0][0] - 1; x <= b[0][1] + 1; x++) {
    for (let y = b[1][0] - 1; y <= b[1][1] + 1; y++) {
      for (let z = b[2][0] - 1; z <= b[2][1] + 1; z++) {
        for (let w = b[3][0] - 1; w <= b[3][1] + 1; w++) {
          let p: vec4 = [x, y, z, w];
          let neighbors = 0;
          for (let delta of DELTAS) {
            let pp = vec4.add(vec4.create(), p, delta);
            if (peek(grid, pp) === "#") neighbors++;
          }
          let v = peek(grid, p);
          if (v === "#" && !(neighbors === 2 || neighbors === 3)) v = ".";
          else if (v !== "#" && neighbors === 3) v = "#";
          if (v === "#") poke(r, p, v);
        }
      }
    }
  }

  return r;
}

function parse(lines: string[]): Grid {
  let grid: Grid = new Map();
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      poke(grid, [x, y, 0, 0], lines[y][x]);
    }
  }
  return grid;
}

function solvea(grid: Grid) {
  for (let i = 0; i < 6; i++) {
    console.log("***");
    // print(grid);
    console.log(count(grid));
    grid = next(grid);
  }

  console.log("***");
  // print(grid);
  console.log(count(grid));
}

export async function run() {
  var text: string = await slurp("data/day17a.txt");

  var grid = parse(text.split(/\n/));

  solvea(grid);
}
