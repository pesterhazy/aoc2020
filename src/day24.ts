import { slurp, mod } from "./util";
import { strict as assert } from "assert";
import { vec2, vec3, vec4 } from "gl-matrix";
import baretest from "baretest";
const test = baretest("aoc");

type Dir = "e" | "se" | "sw" | "w" | "nw" | "ne";

type Grid = Map<number, Map<number, boolean>>;

function peek(grid: Grid, p: vec2): boolean | undefined {
  let m: Map<number, any> = grid;
  if (!m.has(p[0])) return undefined;
  m = m.get(p[0]);
  return m.get(p[1]);
}

function poke(grid: Grid, p: vec2, v: boolean) {
  let m: Map<number, any> = grid;
  if (!m.has(p[0])) m.set(p[0], new Map());
  m = m.get(p[0]);
  m.set(p[1], v);
}

function count(grid: Grid): number {
  let r = 0;
  for (let a of grid.values()) {
    for (let v of a.values()) {
      if (v) r++;
    }
  }
  return r;
}

function bounds(grid: Grid): [vec2, vec2] {
  let r: [vec2, vec2] = [
    [Infinity, -Infinity],
    [Infinity, -Infinity]
  ];
  for (let [x, a] of grid)
    for (let [y, _] of a) {
      r[0][0] = Math.min(r[0][0], x);
      r[0][1] = Math.max(r[0][1], x);
      r[1][0] = Math.min(r[1][0], y);
      r[1][1] = Math.max(r[1][1], y);
    }

  return r;
}

const DELTAS: [number, number][] = [
  [-1, 0],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1]
];

function next(grid: Grid): Grid {
  let newGrid = new Map();
  let b = bounds(grid);

  for (let x = b[0][0] - 1; x <= b[0][1] + 1; x++)
    for (let y = b[1][0] - 1; y <= b[1][1] + 1; y++) {
      let neighbors = 0;

      for (let delta of DELTAS) {
        if (peek(grid, vec2.add(vec2.create(), [x, y], delta))) neighbors++;
      }
      let v: boolean = peek(grid, [x, y]) || false;
      if (v && (neighbors === 0 || neighbors > 2)) v = false;
      else if (!v && neighbors === 2) v = true;
      poke(newGrid, [x, y], v);
    }

  return newGrid;
}

function solve(tiles: Dir[][]) {
  let grid = new Map();

  for (let tile of tiles) {
    let x = 0,
      y = 0;

    for (let move of tile) {
      switch (move) {
        case "e":
          x++;
          break;
        case "se":
          y++;
          break;
        case "sw":
          x--;
          y++;
          break;
        case "w":
          x--;
          break;
        case "nw":
          y--;
          break;
        case "ne":
          x++;
          y--;
          break;
        default:
          throw "unknown";
      }
    }
    poke(grid, [x, y], !peek(grid, [x, y]));
  }
  console.log(count(grid));
}

function parse(s: string): Dir[][] {
  return s.split(/\n/).map(l => l.match(/e|se|sw|w|nw|ne/g) as Dir[]);
}

export async function run() {
  var text: string = await slurp("data/day24a.txt");
  let tiles = parse(text);

  solve(tiles);
}
