import { slurp } from "./util";

type Grid = string[];

interface Point {
  x: number;
  y: number;
}

function height(grid: string[]) {
  return grid.length;
}

function width(grid: string[]) {
  return grid[0].length;
}

function peek(grid: string[], p: Point) {
  if (p.x < 0) return undefined;
  if (p.y < 0) return undefined;
  if (p.x >= width(grid)) return undefined;
  if (p.y >= height(grid)) return undefined;

  return grid[p.y][p.x % width(grid)];
}

let deltas: Point[] = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },

  { x: 0, y: -1 },
  { x: 0, y: 1 },

  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 }
];

function ng(grid: Grid): [Grid, boolean] {
  let stable = true;
  function xform(c: string, x: number, y: number) {
    let n = 0;

    for (let delta of deltas) {
      let cc = peek(grid, { x: delta.x + x, y: delta.y + y });

      if (cc === undefined) continue;

      if (cc === "#") n++;
    }
    if (c === "L" && n === 0) {
      stable = false;
      return "#";
    }

    if (c === "#" && n >= 4) {
      stable = false;
      return "L";
    }

    return c;
  }
  grid = grid.map((line: string, y: number) =>
    [...line].map((c, x) => xform(c, x, y)).join("")
  );
  return [grid, stable];
}

function solvea(grid: string[]) {
  let stable: boolean = false;
  while (true) {
    [grid, stable] = ng(grid);
    console.log(stable);
    if (stable) break;
  }

  let n = grid
    .map(l => [...l].filter(c => c === "#").length)
    .reduce((a: number, b: number) => a + b);

  console.log(n);
}

function solveb(grid: string[]) {}

export async function run() {
  var text: string = await slurp("data/day11a.txt");

  var grid = text.split(/\n/);

  solvea(grid);
}
