import { slurp } from "./util";

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

function trees(grid: string[], delta: Point): number {
  let p = { x: 0, y: 0 };
  let count = 0;

  while (p.y < height(grid)) {
    count += peek(grid, p) === "#" ? 1 : 0;
    p.x += delta.x;
    p.y += delta.y;
  }
  return count;
}

function solvea(grid: string[]) {
  console.log(trees(grid, { x: 3, y: 1 }));
}

function solveb(grid: string[]) {
  let deltas = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 }
  ];
  let count = 1;
  for (let delta of deltas) {
    count *= trees(grid, delta);
  }
  console.log(count);
}

export async function run() {
  var text: string = await slurp("data/day03a.txt");

  var grid = text.split(/\n/);

  solveb(grid);
}
