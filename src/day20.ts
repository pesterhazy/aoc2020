import { slurp } from "./util";

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

function solve(world: World) {
  console.log(world);
}

export async function run() {
  var text: string = await slurp("data/day20.txt");

  var grid = parse(text);

  solve(grid);
}
