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
