import { slurp } from "./util.ts";

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
  if (p.x < 0) throw "out of bounds";
  if (p.y < 0) throw "out of bounds";
  if (p.y >= height(grid)) throw "y out of bounds: " + p.y;

  return grid[p.y][p.x % width(grid)];
}

function solvea(grid: string[]) {
  let p = { x: 0, y: 0 };
  let count = 0;

  while (p.y < height(grid)) {
    count += peek(grid, p) === "#" ? 1 : 0;
    p.x += 3;
    p.y += 1;
  }
  console.log(count);
}

export async function run() {
  var text: string = await slurp("data/day03a.txt");

  var grid = text.split(/\n/);

  solvea(grid);
}
